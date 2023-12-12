import { MdEmail } from 'react-icons/md';
import Email from './encoded-email';
import SocialLink from './social-link';
import {
  BsDiscord,
  BsGithub,
  BsSteam,
  BsSpotify,
  BsTwitter,
  BsInstagram,
} from 'react-icons/bs';
import { SiLetterboxd } from 'react-icons/si';
import { FaLastfm, FaKey } from 'react-icons/fa';

type Social = {
  label: string;
  href: string;
  linkText: string;
};

type Props = {
  emailEncoded: string;
  socials: Social[];
};

// Because we can't use the icon objects in the mdx
const iconMap = {
  Github: BsGithub,
  Discord: BsDiscord,
  Twitter: BsTwitter,
  Instagram: BsInstagram,
  Steam: BsSteam,
  'Last.fm': FaLastfm,
  Spotify: BsSpotify,
  Letterboxd: SiLetterboxd,
  'GPG Key': FaKey,
};

const Socials = ({ emailEncoded, socials }: Props) => {
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
