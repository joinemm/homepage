type Props = {
  tags: string[];
  activeTags: string[];
  tagSetter: Function;
};

const TagFilter = ({ tags, activeTags, tagSetter }: Props) => {
  return (
    <div className="accent-border top-8 xl:fixed xl:left-[calc(50%+384px)] xl:max-w-xs xl:border-l-4 xl:p-4">
      <p className="xl:pb-4">Filter by tags:</p>
      <ul className="fg-secondary flex flex-wrap gap-x-2 xl:flex-col">
        {tags.map((tag) => (
          <li key={tag}>
            <a
              className={
                'cursor-pointer select-none ' +
                (activeTags.includes(tag) ? 'accent underline underline-offset-4' : 'hover:accent')
              }
              onClick={() => {
                if (activeTags.includes(tag)) {
                  tagSetter(activeTags.filter((t) => t != tag));
                } else {
                  tagSetter(activeTags.concat(tag));
                }
              }}
            >
              #{tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagFilter;
