import { MdEmail } from 'react-icons/md';
import Email from './encoded-email';
import SocialLink from './social-link';
import { BsDiscord, BsGithub, BsSteam, BsMastodon } from 'react-icons/bs';
import { FaLastfm, FaKey } from 'react-icons/fa';

type Social = {
  label: string;
  href: string;
  linkText: string;
};

// Because we can't use the icon objects in the mdx
const iconMap = {
  Github: BsGithub,
  Discord: BsDiscord,
  Mastodon: BsMastodon,
  Steam: BsSteam,
  'Last.fm': FaLastfm,
  'GPG Key': FaKey,
};

const emailEncoded = 'bWFpbEBqb2luZW1tLmRldg==';
const socials: Social[] = [
  {
    label: 'Github',
    href: 'https://git.joinemm.dev',
    linkText: 'joinemm',
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/133311691852218378',
    linkText: 'joinemm',
  },
  {
    label: 'Mastodon',
    href: 'https://ieji.de/@joinemm',
    linkText: 'joinemm',
  },
  {
    label: 'Steam',
    href: 'https://steamcommunity.com/id/joinemm',
    linkText: 'joinemm',
  },
  {
    label: 'Last.fm',
    href: 'https://www.last.fm/user/joinemm',
    linkText: 'joinemm',
  },
  {
    label: 'GPG Key',
    href: 'https://keyserver.ubuntu.com/pks/lookup?search=0x090EB48A4669AA54&fingerprint=on&hash=on&exact=on&op=vindex',
    linkText: '0x090EB48A4669AA54',
  },
];

const Socials = () => {
  return (
    <ul className="flex-col !p-0">
      {socials.map((row) => (
        <SocialLink
          label={row.label}
          linkText={row.linkText}
          href={row.href}
          icon={iconMap[row.label]}
          key={row.label}
        />
      ))}
      <li className="my-1 flex">
        <div className="mr-4 flex w-[8rem] items-center gap-2">
          <MdEmail size={22} />
          Email
        </div>
        <Email encoded={emailEncoded} />
      </li>
    </ul>
  );
};

export default Socials;
