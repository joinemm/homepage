type PostData = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: [string];
  draft: boolean;
};

export default PostData;
