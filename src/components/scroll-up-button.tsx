import { HiOutlineArrowNarrowUp } from 'react-icons/hi';

const ScrollUpButton = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <HiOutlineArrowNarrowUp className="m-auto" size={30} />
      <p className="fg-secondary pt-4 italic">go to top</p>
    </button>
  );
};

export default ScrollUpButton;
