import { TodoList } from "@/components/TodoList";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/state/user";
import { db } from "src/utils/firebase";

export const TodoDone = () => {
  const [todos, setTodos] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const todosCollectionRef = collection(db, "todos");
    const q = query(
      todosCollectionRef,
      where("isDone", "==", true),
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
      <h2 className="text-2xl font-bold text-slate-600">完了タスク</h2>
      <TodoList todos={todos} color={"gray"} />
    </div>
  );
};
