type Props = {
  tags: string[];
  activeTags: string[];
  tagSetter: Function;
};

const TagFilter = ({ tags, activeTags, tagSetter }: Props) => {
  return (
    <ul className="flex flex-wrap gap-x-2 pt-4">
      <p className="">Tags:</p>
      {tags.map((tag) => (
        <li key={tag}>
          <a
            className={
              'cursor-pointer select-none ' +
              (activeTags.includes(tag)
                ? 'accent underline underline-offset-4'
                : 'hover:accent fg-muted ')
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
  );
};

export default TagFilter;
