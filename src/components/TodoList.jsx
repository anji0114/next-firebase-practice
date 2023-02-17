import { async } from "@firebase/util";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { db } from "src/utils/firebase";

export const TodoList = ({ todos, color }) => {
  const toggleIsDone = async (id) => {
    const todoDocumentRef = doc(db, "todos", id);
    await getDoc(todoDocumentRef).then((documentSnapshot) => {
      updateDoc(todoDocumentRef, {
        isDone: !documentSnapshot.data().isDone,
      });
    });
  };

  const deleteTodo = async (id) => {
    const todoDocumentRef = doc(db, "todos", id);
    await deleteDoc(todoDocumentRef);
  };

  return (
    <div className={`mt-6 bg-${color}-50 border-${color}-100 border-2 p-5`}>
      {todos.length > 0 ? (
        <ul className="space-y-5">
          {todos.map((todo) => (
            <li
              className={`border-b-2 border-${color}-200 pb-2 flex justify-between items-center`}
              key={todo.id}
            >
              <div className="">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => {
                      toggleIsDone(todo.id);
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-lg">{todo.todo}</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`${todo.id}`} className="bg-green-600 text-white py-1 px-3 text-sm">
                  編集する
                </Link>
                <button
                  className="bg-red-500 text-white py-1 px-3 text-sm"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  削除する
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm pt-1 font-medium">現在タスクはありません</p>
      )}
    </div>
  );
};
