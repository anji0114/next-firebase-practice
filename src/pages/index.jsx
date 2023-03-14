import { Auth } from "@/components/Auth";
import { InputTodo } from "@/components/InputTodo";
import { Todo } from "@/components/Todo";
import { TodoDone } from "@/components/TodoDone";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "src/state/user";
import { auth } from "src/utils/firebase";

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            photoUrl: user.photoURL,
            displayName: user.displayName,
          })
        );
        setLoading(false);
      } else {
        dispatch(logout());
        setLoading(false);
      }
    });
    return () => unSub();
  }, [dispatch]);

  if (loading) return <p className="text-center ">ローディング...</p>;

  return (
    <>
      {user.uid ? (
        <div className="">
          {/* input */}
          <InputTodo />
          {/* todo */}
          <Todo title="未完了タスク" />
          {/* done todo */}
          <TodoDone title="完了タスク" />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}
