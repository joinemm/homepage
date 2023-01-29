import { useState, useEffect } from 'react';

type Props = {
  encoded: string;
};

const Email = ({ encoded }: Props) => {
  const [realEmail, setRealEmail] = useState<string | null>(null);

  useEffect(() => {
    setRealEmail(Buffer.from(encoded, 'base64').toString());
  }, [encoded]);

  return realEmail ? (
    <a className="accent hover:fg-primary" href={`mailto:${realEmail}`}>
      {realEmail}
    </a>
  ) : (
    <a>[@]</a>
  );
};

export default Email;
