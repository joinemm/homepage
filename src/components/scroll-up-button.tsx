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
      <p className="text-xl">{'</>'}</p>
    </button>
  );
};

export default ScrollUpButton;
