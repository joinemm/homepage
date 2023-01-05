import { parseISO, format } from 'date-fns';

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return dateString ? <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time> : null;
};

export default DateFormatter;
