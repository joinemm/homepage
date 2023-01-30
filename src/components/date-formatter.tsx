import { parseISO, format } from 'date-fns';

type Props = {
  dateString: string;
  className?: string;
};

const DateFormatter = ({ dateString, className = '' }: Props) => {
  const date = parseISO(dateString);
  var formattedDate;
  try {
    formattedDate = format(date, 'LLL d, yyyy');
  } catch (err) {
    formattedDate = `${err}`;
  }
  return (
    <time className={className} dateTime={dateString}>
      {formattedDate}
    </time>
  );
};

export default DateFormatter;
