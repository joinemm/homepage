---
title: 'Why you should let bayonetta step on you'
excerpt: 'An extensive analysis.'
image: '/assets/content/bayonetta.jpg'
date: '2022-12-20'
author: Joinemm
tags: ['bayonetta', 'gaming', 'shitpost']
---
um
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel `print("hello world"){:py}` eget. At<n>[1]</n> imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies.

[here](https://stackoverflow.com/questions/37742099/how-do-you-align-text-with-svg-elements)

<aside note=1>This is a cool sidenote that doesnt deserve a place in the main paragraph</aside>

Here is some code:

```js {10} showLineNumbers
export default function Post({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Header />
      {router.isFallback ? (
        <h1>Loading…</h1> // notice how this line is highlighted!!!
      ) : (
        <>
          <Head>
            <title>{post.title} | joinemm.dev</title>
            <meta property="og:image" content={post.image} />
          </Head>
          <article className={style.main}>
            <div className={style.postHeader}>
              <Link href="/blog">&lt;= All posts</Link>
              <DateFormatter dateString={post.date}></DateFormatter>
            </div>
            <BlogPost post={post}></BlogPost>
          </article>
        </>
      )}
    </>
  );
}
```

How the line numbers work tho?

```css
pre > code[data-line-numbers] > .line::before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  width: 2rem;
  margin-right: 0.5em;
  text-align: right;
  color: gray;
}
```

Venenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae. Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.

## Lorem Ipsum

Tristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.
