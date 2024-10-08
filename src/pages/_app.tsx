import { store } from "@/src/store/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import ThemeProviderWrapper from "../components/ThemeProviderWrapper";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProviderWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProviderWrapper>
      </Provider>
    </SessionProvider>
  );
}
