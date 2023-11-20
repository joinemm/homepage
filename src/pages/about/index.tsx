import Head from 'next/head';
import Email from '../../components/encoded-email';
import MainContainer from '../../components/main-container';
import { MdEmail } from 'react-icons/md';
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
import { createElement } from 'react';

export default function About() {
  const emailEncoded = 'am9pbmVtbUBwbS5tZQ';
  const links = [
    {
      icon: BsGithub,
      label: 'Github',
      href: 'https://git.joinemm.dev',
      linkText: 'joinemm',
    },
    {
      icon: BsDiscord,
      label: 'Discord',
      href: 'https://discord.com/users/133311691852218378',
      linkText: 'joinemm',
    },
    {
      icon: BsTwitter,
      label: 'Twitter',
      href: 'https://twitter.com/joinemm',
      linkText: 'joinemm',
    },
    {
      icon: BsInstagram,
      label: 'Instagram',
      href: 'https://instagram.com/joinemm',
      linkText: 'joinemm',
    },
    {
      icon: BsSteam,
      label: 'Steam',
      href: 'https://steamcommunity.com/id/joinemm',
      linkText: 'joinemm',
    },
    {
      icon: FaLastfm,
      label: 'Last.fm',
      href: 'https://www.last.fm/user/joinemm',
      linkText: 'joinemm',
    },
    {
      icon: BsSpotify,
      label: 'Spotify',
      href: 'https://open.spotify.com/user/1140852238',
      linkText: 'joinemm',
    },
    {
      icon: SiLetterboxd,
      label: 'Letterboxd',
      href: 'https://letterboxd.com/joinemm',
      linkText: 'joinemm',
    },
    {
      icon: FaKey,
      label: 'GPG Key',
      href: '/gpg.txt',
      linkText: 'F0FE 53B9 4A92 DCAB',
    },
  ];
  return (
    <>
      <Head>
        <title>ABOUT | joinemm.dev</title>
      </Head>
      <MainContainer>
        <h1 className="serif mt-3 text-4xl">
          Hi, I&apos;m <span className="accent">Joonas</span>
        </h1>
        <p>
          I&apos;m a Software Engineer from Finland and very passionate about Linux,
          free open source software and privacy.
        </p>
        <p>Currently working as a DevOps engineer on an open source project!</p>
        <p>Favourite languages: Python, Bash, Rust and Typescript.</p>
        <p>Favourite Linux distributions: Arch Linux and NixOS.</p>
        <p>
          Aside from programming, I&apos;m an enjoyer of death metal, coffee, wine,
          photography, italian food and custom mechanical keyboards.
        </p>
        <h3>Links</h3>
        <ul className="flex-col">
          {links.map(({ icon, label, href, linkText }) => (
            <li className="my-1 flex" key={label}>
              <div className="mr-4 flex w-[8rem] items-center gap-2">
                {createElement(icon, { size: 22 })}
                {label}
              </div>
              <a href={href}>{linkText}</a>
            </li>
          ))}
          <li className="my-1 flex">
            <div className="mr-4 flex w-[8rem] items-center gap-2">
              <MdEmail size={22} />
              Email
            </div>
            <Email encoded={emailEncoded} />
          </li>
        </ul>

        <p className="fg-muted mt-8 text-sm">
          Yes I know, my username is awfully consistent.
        </p>
      </MainContainer>
    </>
  );
}
