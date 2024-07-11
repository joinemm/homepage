import { parseJSON, format } from 'date-fns';

type Props = {
  dateString: string;
  className?: string;
  formatter?: string;
};

const DateFormatter = ({
  dateString,
  className = '',
  formatter = 'LLL d, yyyy',
}: Props) => {
  const date = parseJSON(dateString);
  var formattedDate: string;
  try {
    formattedDate = format(date, formatter);
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
