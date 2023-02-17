import { PostTodo } from "@/components/PostTodo";
import { Todo } from "@/components/Todo";
import { TodoDone } from "@/components/TodoDone";

export default function Home() {
  return (
    <div className="">
      {/* input */}
      <PostTodo />

      {/* todo */}
      <Todo title="未完了タスク" />

      {/* done todo */}
      <TodoDone title="完了タスク" />
    </div>
  );
}
