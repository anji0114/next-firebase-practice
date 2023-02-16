import { async } from "@firebase/util";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "src/utils/firebase";

const UsersId = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  // ユーザーの取得
  useEffect(() => {
    if (!router.isReady) return;
    const userDocumentRef = doc(db, "users", router.query.id);
    getDoc(userDocumentRef).then((documentSnapshot) => {
      setUser(documentSnapshot.data());
    });
  }, [router.query.id]);

  const deleteUser = async () => {
    const userDocumentRef = doc(db, "users", router.query.id);
    await deleteDoc(userDocumentRef);
    router.push("/");
  };

  return (
    <div>
      <h2 className="text-xl text-blue-500 font-bold">記事詳細</h2>
      <div className="space-y-4 mt-4">
        <dl className="flex align-center gap-4">
          <dt>名前</dt>
          <dd>{user?.name}</dd>
        </dl>
        <dl className="flex align-center gap-4">
          <dt>email</dt>
          <dd>{user?.email}</dd>
        </dl>
        <dl className="flex align-center gap-4">
          <dt>管理者</dt>
          {user?.admin ? (
            <dd className="text-green-600">管理</dd>
          ) : (
            <dd className="text-blue-600">投稿者</dd>
          )}
        </dl>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          className="bg-red-500 px-6 py-1 text-white rounded-sm font-bold"
          onClick={deleteUser}
        >
          削除
        </button>
        <Link
          href={`${router.query.id}/edit`}
          className="bg-green-600 px-6 py-1 text-white rounded-sm font-bold"
        >
          編集
        </Link>
      </div>
    </div>
  );
};

export default UsersId;
