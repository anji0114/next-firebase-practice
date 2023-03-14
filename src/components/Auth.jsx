import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "src/utils/firebase";

export const Auth = () => {
  const googleProvider = new GoogleAuthProvider();
  const signInGoogle = async () => {
    await signInWithPopup(auth, googleProvider).catch((err) => console.log(err.message));
  };
  return (
    <div className="text-center py-16">
      <button
        className="flex items-center gap-6 mx-auto py-4 pl-12 pr-16 bg-slate-100 border border-slate-200 "
        onClick={signInGoogle}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-xl">Googleでログインする</span>
      </button>
    </div>
  );
};
