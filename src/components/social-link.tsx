import { createElement } from 'react';
import { IconType } from 'react-icons';

type Props = {
  label: string;
  linkText: string;
  href: string;
  icon: IconType;
};

const SocialLink = ({ label, linkText, href, icon }: Props) => {
  return (
    <li className="my-1 flex" key={label}>
      <div className="mr-4 flex w-[8rem] items-center gap-2">
        {createElement(icon, { size: 22 })}
        {label}
      </div>
      <a href={href}>{linkText}</a>
    </li>
  );
};

export default SocialLink;
