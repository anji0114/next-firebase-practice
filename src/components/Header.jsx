import Link from "next/link";

export const Header = () => {
  return (
    <header className="py-4 bg-slate-100">
      <h1 className="text-2xl text-center font-bold text-blue-600">
        <Link href={"/"}>Next.js × FireBase Practice App</Link>
      </h1>
    </header>
  );
};
