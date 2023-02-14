import { Header } from "@/components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="">
      <Header />
      <div className="max-w-5xl p-6 mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
