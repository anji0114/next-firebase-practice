import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "src/state/user";
import { auth } from "src/utils/firebase";

export const Header = () => {
  const user = useSelector(selectUser);
  const router = useRouter();

  const onClickSignOut = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <header className="py-2 px-10 bg-slate-100 flex items-center justify-between h-20">
      <h1 className="text-2xl  font-bold text-blue-600">
        <Link href={"/"}>Next.js × FireBase Practice App</Link>
      </h1>
      {user.uid && (
        <button className="r rounded-full overflow-hidden w-10" onClick={onClickSignOut}>
          <Image src={user.photoUrl} width={120} height={120} alt="アバター" />
        </button>
      )}
    </header>
  );
};
