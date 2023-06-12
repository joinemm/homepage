import Head from "next/head";
import { MediaContextProvider } from "../util/media-context";
import Link from "next/link";
import NavMenu from "../components/nav-menu";

export default function Home() {
  return (
    <>
      <MediaContextProvider disableDynamicMediaQueries>
        <div className="flex h-screen w-screen flex-col items-center justify-center text-center">
          <p className="pb-8">joinemm.dev</p>
          <NavMenu className="flex-col" showHome={false}/>
        </div>
      </MediaContextProvider>
    </>
  );
}
