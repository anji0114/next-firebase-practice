import { Auth } from "@/components/Auth";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/state/user";
import { db } from "src/utils/firebase";

const TodoId = () => {
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const [userId, setUserId] = useState("");
  const [isDone, setIsDone] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    const todoDocumentRef = doc(db, "todos", router.query.id);
    getDoc(todoDocumentRef).then((documentSnapshot) => {
      setTodo(documentSnapshot.data().todo);
      setIsDone(documentSnapshot.data().isDone);
      setUserId(documentSnapshot.data().userId);
    });
  }, []);

  const todoUpdate = async (e) => {
    e.preventDefault();
    if (!todo) return;
    const todoDocumentRef = doc(db, "todos", router.query.id);
    await updateDoc(todoDocumentRef, {
      todo: todo,
      isDone: isDone,
      updateTime: serverTimestamp(),
    });
    router.push("/");
  };

  return (
    <>
      {user.uid == userId ? (
        <>
          <h2 className="text-2xl font-bold text-slate-600">タスクを編集する</h2>
          <div className="mt-4 space-y-5">
            <div>
              <input
                type="text"
                className="border border-gray-300 bg-gray-50 w-3/4 p-2"
                placeholder="タスクを入力する"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            </div>
            <div className="px-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={isDone}
                  onChange={() =>
                    setIsDone((done) => {
                      return !done;
                    })
                  }
                />
                {isDone ? (
                  <span className="text-lg text-blue-700">タスクの完了</span>
                ) : (
                  <span className="text-lg text-gray-700">タスクの完了</span>
                )}
              </label>
            </div>
            <div>
              <button
                className="w-1/4 border bg-blue-400 text-white p-2 text-center"
                onClick={todoUpdate}
              >
                更新する
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">
          アクセスできません
          <Link href={"/"} className="text-blue-400">
            トップに戻る
          </Link>
        </p>
      )}
    </>
  );
};

export default TodoId;
