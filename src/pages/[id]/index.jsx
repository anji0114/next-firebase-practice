const TodoId = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-600">タスクを編集する</h2>
      <div className="mt-4 space-y-5">
        <div>
          <input
            type="text"
            className="border border-gray-300 bg-gray-50 w-3/4 p-2"
            placeholder="タスクを入力する"
          />
        </div>
        <div className="px-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-lg text-blue-700">タスクの完了</span>
          </label>
        </div>
        <div>
          <button className="w-1/4 border bg-blue-400 text-white p-2 text-center">更新する</button>
        </div>
      </div>
    </div>
  );
};

export default TodoId;
