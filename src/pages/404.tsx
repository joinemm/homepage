import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="fg-muted flex h-screen w-screen flex-col items-center justify-center text-center">
      <h1 className="mono text-9xl">404</h1>
      <p className="max-w-xl">Your princess is in another castle</p>
      <Link className="fg-primary" href="/">
        fuck
      </Link>
    </div>
  );
}
