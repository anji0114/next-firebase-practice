export const Header = () => {
  return (
    <header className="py-3 bg-slate-100">
      <h1 className="text-2xl text-center text-blue-600">Next.js × FireBase Practice App</h1>
      <nav className="mt-1">
        <ul className="flex justify-center gap-4 text-lg">
          <li>Top</li>
          <li>About</li>
          <li>Blogs</li>
        </ul>
      </nav>
    </header>
  );
};
