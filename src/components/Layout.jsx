import { Header } from "@/components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "src/state/user";
import { auth } from "src/utils/firebase";

export const Layout = ({ children }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            photoUrl: user.photoURL,
            displayName: user.displayName,
            loaded: true,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => unSub();
  }, [dispatch]);

  return (
    <>
      <Header />

      <div className="max-w-4xl px-6 py-12 mx-auto">
        {!user.loaded ? (
          <p className="text-center text-lg text-blue-600">ローディング中...</p>
        ) : (
          <>{children}</>
        )}
      </div>
    </>
  );
};
