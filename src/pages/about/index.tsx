import Header from '../../components/header';
import Head from 'next/head';
import MdxRenderer from '../../components/mdx-renderer';
import { getMdxContent } from '../../util/mdx';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Email from '../../components/encoded-email';
import MainContainer from '../../components/main-container';
import Image from 'next/image';
import me from '/public/assets/me.jpg';

type Props = {
  mdxAbout: MDXRemoteSerializeResult;
};
const text = `
I'm just a guy from Tampere, Finland. 🇫🇮 Full Stack Developer, death metal enjoyer,
linux enthusiast, university dropout and a self-taught programmer. On my free time I
like to work on my little hobby projects (such as this website), build and mod
mechanical keyboards, tweak my arch linux configuration, cook great food and take
photos. I practice minimalism in both design and philosophy, as you might be able to
tell from the design of this page. Maintainer of multiple open source projects, my most
successful creation is [Miso Bot](https://misobot.xyz), a general purpose discord bot.
What started as a little python script I wrote after finishing Programming 101 in 2018
quickly grew in popularity and now has over 200 000 users in it's database.
`;
export default function About({ mdxAbout }: Props) {
  return (
    <>
      <Head>
        <title>ABOUT | joinemm.dev</title>
      </Head>
      <MainContainer>
        <div className="prose dark:prose-invert">
          <Image
            src={me}
            width={135}
            alt="me"
            className="float-left mr-4 mb-0 rounded-md"
          />
          <p>Hi, I&apos;m Joonas! Software Engineer from Finland 🇫🇮 </p>
          <p>
            I specialize in the backend and Linux side of things, but as an
            artist I also enjoy frontend design work. My favourite language is
            Python.
          </p>
          <p>
            I&apos;m an open source advocate and usually avoid proprietary or
            bloated software whenever possible. As a result of this I run Arch
            Linux (btw) on my computers. I feel right at home in front of a UNIX
            terminal and I actually try to avoid using graphical frontends if I
            can. Privacy and transparency are also very important to me, so I
            must disclose that this website has tracking, not provided by
            Google of course, but my self-hosted{' '}
            <a href="https://github.com/plausible/analytics">plausible</a>{' '}
            server.
          </p>
          <p>
            This website serves as my personal playground for anything I want to
            create, be it blog posts, digital art or movie reviews, without the
            pressure or algorithms of social media. It&apos;s created with
            Next.js leveraging the server side rendering capabilities to render
            all content in advance to achieve maximum responsiveness for the end
            user. The design of the site is very simple and minimal, with no
            unnecessary frills.
          </p>
          <p>
            Contact me: <Email encoded={'am9pbmVtbUBwbS5tZQ=='} />
          </p>
        </div>
      </MainContainer>
    </>
  );
}

export async function getStaticProps() {
  const mdx = await getMdxContent('about.mdx');
  return { props: { mdxAbout: mdx } };
}
