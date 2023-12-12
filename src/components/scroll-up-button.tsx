import Image from 'next/image';
import icon from '../../public/icon.svg';

const ScrollUpButton = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
      aria-label="scroll to top"
    >
      <Image src={icon} height={42} width={42} alt="Joinemm logo" />
    </button>
  );
};

export default ScrollUpButton;
