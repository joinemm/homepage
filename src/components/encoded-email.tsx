import { useState, useEffect } from 'react';

type Props = {
  encoded: string;
};

const Email = ({ encoded }: Props) => {
  const realEmail = Buffer.from(encoded, 'base64').toString();
  const [emailName, emailDomain] = realEmail.split('@');
  const [randomized, setRandomized] = useState('');
  const [email, setEmail] = useState(randomized);
  const [mailto, setMailto] = useState('');

  const decryptOne = (progress) => {
    setTimeout(() => {
      setEmail(realEmail.slice(0, progress + 1) + randomized.slice(progress));
    }, 50 * progress);
  };

  const decrypt = () => {
    setMailto(`mailto:${realEmail}`);
    for (let progress = 0; progress < realEmail.length; ++progress) {
      decryptOne(progress);
    }
  };

  useEffect(() => {
    const random =
      Math.random()
        .toString(36)
        .slice(2, emailName.length + 2) +
      Math.random()
        .toString(36)
        .slice(2, emailDomain.length + 2);
    setRandomized(random);
    setEmail(random);
  }, [emailName, emailDomain]);

  return (
    <a
      className="text-blue-300 no-underline"
      onMouseOver={() => {
        email !== realEmail ? decrypt() : null;
      }}
      href={mailto}
    >
      {email}
    </a>
  );
};

export default Email;
