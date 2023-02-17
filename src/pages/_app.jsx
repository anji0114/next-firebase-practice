import { Header } from "@/components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="">
      <Header />
      <div className="max-w-4xl px-6 py-12 mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
