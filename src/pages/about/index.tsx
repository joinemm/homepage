import Header from '../../components/header';
import Head from 'next/head';
import MdxRenderer from '../../components/mdx-renderer';
import { getMdxContent } from '../../util/mdx';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Email from '../../components/encoded-email';
import MainContainer from '../../components/main-container';
import Image from 'next/image';
import avatar from '/public/assets/avatar.jpg';

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
        <title>About | joinemm.dev</title>
      </Head>
      <MainContainer>
        <h1 className="pb-4 text-3xl font-bold">About.</h1>
        <div className="prose dark:prose-invert">
          <Image
            src={avatar}
            width={200}
            alt="me"
            className="float-left mr-4 mb-0"
          />
          <p>I&apos;m just a guy from Tampere, Finland. 🇫🇮 </p>
          <p>
            Full Stack Developer, death metal enjoyer, linux enthusiast,
            university dropout and a self-taught programmer. On my free time I
            like to work on my little hobby projects (such as this website),
            build and mod mechanical keyboards, tweak my arch linux
            configuration, cook great food and take photos. I practice
            minimalism in both design and philosophy, as you might be able to
            tell from the design of this page.
          </p>
          <p>
            Maintainer of multiple open source projects, my most successful
            creation is <a href="https://misobot.xyz">Miso Bot</a>, a general
            purpose discord bot. What started as a little python script I wrote
            after finishing Programming 101 in 2018 quickly grew in popularity
            and now has over 200 000 users in it&apos;s database.
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
