import type { NextApiRequest, NextApiResponse } from 'next';
import { ANALYTICS_DOMAIN, ANALYTICS_SITE_ID } from '../../../util/constants';

const startAt = Date.UTC(2025, 9, 1);
const endpoint = 'https://' + ANALYTICS_DOMAIN + '/api';

// Umami stats start from zero, add them to the latest plausible stats before pulling the plug
// This is the easiest way of migrating from one analytics provider to another
const plausibleViews = {
  'yubikey-nixos-guide': 4233,
  'development-environments-with-nix': 1067,
  'csgo-linux-setup': 799,
  'prometheus-ssh-proxy-nixos': 714,
  'nixos-hetzner-cloud': 594,
  'anti-aliasing': 278,
  'minecraft-server-centos': 277,
  'grafana-github-login': 107,
  'advent-of-code-2023-day-6': 99,
  'next-gen-discord-bot-idea': 85,
  'advent-of-code-2023-day-1': 84,
  'choosing-a-mastodon-instance': 52,
  'recipe-italian-tomato-sauce': 41,
};

type Data = {
  date?: string;
  views?: number;
  err?: unknown;
};

const viewsHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({ err: 'Not Found' });
  }
  try {
    const oldViews = plausibleViews[String(slug)] || 0;
    const views = await getStats(String(slug));
    return res.status(200).json({
      date: Date.now().toString(),
      views: oldViews + views,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
};

async function getToken() {
  const res = await fetch(endpoint + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: 'admin',
      password: process.env.UMAMI_ADMIN_PASSWORD,
    }),
  });
  const data = await res.json();
  return data.token;
}

async function getStats(slug: string) {
  const now = Date.now();
  const token = await getToken();

  const res = await fetch(
    endpoint +
      `/websites/${ANALYTICS_SITE_ID}/stats?startAt=${startAt}&endAt=${now}&url=/blog/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  return data?.pageviews?.value;
}

export default viewsHandler;
