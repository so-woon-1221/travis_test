import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Menu from "../components/common/Menu";
/* eslint-disable-next-line import/extensions */
import Footer from "../components/common/footer";
import { wrapper } from "../store";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="flex md:flex-row flex-col">
          <div className="md:w-64 w-full md:pt-4 md:pl-4 bg-white md:z-10">
            <Menu />
          </div>
          <div className="md:width-screen-64 w-full md:z-0">
            <Component {...pageProps} />
          </div>
          <div id="modal-div" />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(App);
