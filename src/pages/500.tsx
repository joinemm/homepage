import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="fg-muted flex h-screen w-screen flex-col items-center justify-center text-center">
      <h1 className="mono text-9xl">500</h1>
      <p className="max-w-xl">
        OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code
        monkeys at our headquarters are working VEWY HAWD to fix this!
      </p>
      <Link className="fg-primary" href="/">
        fuck
      </Link>
    </div>
  );
}
