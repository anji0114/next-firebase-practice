import { Auth } from "@/components/Auth";
import { InputTodo } from "@/components/InputTodo";
import { Todo } from "@/components/Todo";
import { TodoDone } from "@/components/TodoDone";

import { useSelector } from "react-redux";
import { selectUser } from "src/state/user";

export default function Home() {
  const user = useSelector(selectUser);

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
