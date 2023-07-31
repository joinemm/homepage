import useSWR from 'swr';
import { AiOutlineEye } from 'react-icons/ai';
import { fetcher } from '../util/fetcher';

type Props = {
  slug: string;
};

const DisplayViews = ({ slug }: Props) => {
  const { data, error, isLoading } = useSWR(`/api/views/${slug}`, fetcher);
  const views = error || isLoading ? '??' : data.views;
  return (
    <div className="flex items-center gap-1">
      <AiOutlineEye size={18} className="mb-1" />
      {views} Views
    </div>
  );
};

export default DisplayViews;
