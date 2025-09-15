'use client';

import Giscus from '@giscus/react';

const Comments = ({ repo, repoId, category, categoryId }) => {
  return (
    <section>
      <div className="toc-tracker" data-id="comments">
        <Giscus
          repo={repo}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping="pathname"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme="transparent_dark"
          lang="en"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Comments;
