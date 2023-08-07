import Head from 'next/head';
import Email from '../../components/encoded-email';
import MainContainer from '../../components/main-container';

export default function About() {
  return (
    <>
      <Head>
        <title>ABOUT | joinemm.dev</title>
      </Head>
      <MainContainer classname="border-t-2">
        <div className="mt-3">
          <h1 className="serif mt-0 text-4xl">Hello there,</h1>
          <p>I&apos;m Joonas! a DevOps / Software Engineer from Finland.</p>
          <p>
            I specialize in the backend and Linux side of things, but as an artist I
            also enjoy frontend design work. My favourite languages are Python, Rust and
            Typescript.
          </p>
          <p>
            I&apos;m an open source advocate and usually avoid proprietary or bloated
            software whenever possible. As a result of this I run Arch Linux (btw) on my
            computers. I feel right at home in front of a UNIX terminal and I actually
            try to avoid using graphical frontends if I can. Privacy and transparency
            are also very important to me.
          </p>
          <p>
            This website serves as my personal playground for anything I want to create,
            be it blog posts, digital art or movie reviews, without the pressure or
            algorithms of social media. It&apos;s created with Next.js leveraging the
            server side rendering capabilities to render all content in advance to
            achieve maximum responsiveness for the end user. As I am a minimalist, the
            design of the website is also simple and clean.
          </p>
          <p>
            Contact me: <Email encoded={'am9pbmVtbUBwbS5tZQ=='} />
          </p>
        </div>
      </MainContainer>
    </>
  );
}
