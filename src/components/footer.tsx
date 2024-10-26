const Header = () => {
  return (
    <footer className="mono mt-10 w-full text-center">
      <p className="fg-muted text-sm">
        © Joonas Rautiola {new Date().getFullYear()} •{' '}
        <a href="https://git.joinemm.dev/homepage" className="hover:fg-primary">
          <strong>Source</strong>
        </a>
      </p>
    </footer>
  );
};

export default Header;
