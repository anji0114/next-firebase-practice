import { Header } from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "src/state";
import "src/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <div className="max-w-4xl px-6 py-12 mx-auto">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
