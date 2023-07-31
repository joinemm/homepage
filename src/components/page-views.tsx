import useSWR from 'swr';
import { AiOutlineEye } from 'react-icons/ai';
import { ANALYTICS_DOMAIN, SITE_NAME } from '../util/constants';

type Props = {
  slug: string;
};

const DisplayViews = ({ slug }: Props) => {
  const { data, error, isLoading } = useSWR(slug, getPlausibleViews);
  const views = error || isLoading ? '??' : data.results.visitors.value;
  return (
    <div className="flex items-center gap-1">
      <AiOutlineEye size={18} className="mb-1" />
      {views} Views
    </div>
  );
};

export default DisplayViews;

async function getPlausibleViews(slug: string) {
  const now = new Date();
  const [nowDate] = now.toISOString().split('T');
  const url = `https://${ANALYTICS_DOMAIN}/api/v1/stats/aggregate?site_id=${SITE_NAME}&period=custom&date=2023-03-26,${nowDate}&filters=event:page==/blog/${slug}`;

  const headers = {
    Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
    Accept: 'application/json',
  };

  return await fetch(url, { headers })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
