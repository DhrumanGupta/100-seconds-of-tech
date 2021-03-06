import "../styles/globals.css";
import "../styles/app.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "next-themes";
import { Theme } from "../types";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={Theme.Light}>
      <Navbar />
      <div className="mx-8 pb-12 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg md:mx-auto">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
