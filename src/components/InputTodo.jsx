import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/state/user";
import { db } from "src/utils/firebase";

export const InputTodo = () => {
  const [todo, setTodo] = useState("");
  const user = useSelector(selectUser);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!todo) return;

    const todoDocumentRef = doc(collection(db, "todos"));
    await setDoc(todoDocumentRef, {
      todo: todo,
      isDone: false,
      userId: user.uid,
      updateTime: serverTimestamp(),
    });

    setTodo("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-600">タスク入力</h2>
      <div className="flex gap-1 mt-4">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="border border-gray-300 bg-gray-50 w-3/4 p-2"
          placeholder="タスクを入力する"
        />
        <button className="w-1/4 border bg-blue-400 text-white p-2 text-center" onClick={addTodo}>
          追加する
        </button>
      </div>
    </div>
  );
};
