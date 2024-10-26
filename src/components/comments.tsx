'use client';

import Giscus from '@giscus/react';

const Comments = ({ repo, repoId, category, categoryId }) => {
  return (
    <Giscus
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="transparent_dark"
      lang="en"
      loading="lazy"
    />
  );
};

export default Comments;
