import Head from 'next/head';
import Email from '../../components/encoded-email';
import MainContainer from '../../components/main-container';
import Image from 'next/image';
import me from '/public/assets/me.jpg';

export default function About() {
  return (
    <>
      <Head>
        <title>ABOUT | joinemm.dev</title>
      </Head>
      <MainContainer classname="border-t-2">
        <div className="mt-3">
          <span className="float-right ml-2 w-32 overflow-hidden rounded-lg md:w-[10rem]">
            <Image src={me} alt="me" style={{ objectFit: 'cover' }} />
          </span>
          <h1 className="serif mt-0 text-4xl">Hello there,</h1>
          <p>I&apos;m Joonas! a Software Engineer from Finland.</p>
          <p>
            I specialize in the backend and Linux side of things, but as an artist I
            also enjoy frontend design work. My favourite language is Python.
          </p>
          <p>
            I&apos;m an open source advocate and usually avoid proprietary or bloated
            software whenever possible. As a result of this I run Arch Linux (btw) on my
            computers. I feel right at home in front of a UNIX terminal and I actually
            try to avoid using graphical frontends if I can. Privacy and transparency
            are also very important to me, so I must disclose that this website has
            tracking, not provided by Google of course, but my self-hosted{' '}
            <a href="https://github.com/plausible/analytics">plausible</a> server.
          </p>
          <p>
            This website serves as my personal playground for anything I want to create,
            be it blog posts, digital art or movie reviews, without the pressure or
            algorithms of social media. It&apos;s created with Next.js leveraging the
            server side rendering capabilities to render all content in advance to
            achieve maximum responsiveness for the end user. As a fan of minimalism, the
            design of the website reflects those ideals.
          </p>
          <p>
            Contact me: <Email encoded={'am9pbmVtbUBwbS5tZQ=='} />
          </p>
        </div>
      </MainContainer>
    </>
  );
}
