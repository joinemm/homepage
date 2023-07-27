import { PAGE_WIDTH } from '../util/constants';

const Header = () => {
  return (
    <footer className="m-4 mt-8 text-center mono" style={{ maxWidth: PAGE_WIDTH + "rem"}}>
      <p className="fg-muted text-sm">
        © Joinemm 2023 •{' '}
        <a href="https://git.joinemm.dev/homepage" className="hover:fg-primary">
          <strong>Source</strong>
        </a>
      </p>
    </footer>
  );
};

export default Header;
