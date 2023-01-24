import { parseISO, format } from 'date-fns';

type Props = {
  dateString: string;
  className?: string;
};

const DateFormatter = ({ dateString, className = '' }: Props) => {
  const date = parseISO(dateString);
  return dateString ? (
    <time className={className} dateTime={dateString}>
      {format(date, 'LLL d, yyyy')}
    </time>
  ) : null;
};

export default DateFormatter;
