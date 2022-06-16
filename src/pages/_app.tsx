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
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
