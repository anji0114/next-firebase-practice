import { TodoList } from "@/components/TodoList";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/state/user";
import { db } from "src/utils/firebase";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const todosCollectionRef = collection(db, "todos");
    where("userId", "==", user.uid);
    const q = query(
      todosCollectionRef,
      where("isDone", "==", false),
      where("userId", "==", user.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  return (
    <div className="mt-14">
      <h2 className="text-2xl font-bold text-slate-600">未完了タスク</h2>
      <TodoList todos={todos} color={"blue"} />
    </div>
  );
};
