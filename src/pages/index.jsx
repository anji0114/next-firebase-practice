import { Input } from "@/components/Input";
import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/utils/firebase";

// 次セクション リアルタイムで
export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, orderBy("timestamp", "desc"), limit(3));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    return unsub;
  }, []);

  // ユーザーの削除
  const deleteUser = async (name) => {
    const userCollectionRef = collection(db, "users");
    const q = query(userCollectionRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const userDocumentRef = doc(db, "users", document.id);
      await deleteDoc(userDocumentRef);
    });
  };

  // adminの更新
  const changeAdmin = async (id) => {
    const userDocumentRef = doc(db, "users", id);
    await updateDoc(userDocumentRef, {
      admin: true,

      updateTime: serverTimestamp(),
    });
  };

  const changeAdminBool = async (id) => {
    const userDocumentRef = doc(db, "users", id);
    await updateDoc(userDocumentRef, {
      admin: false,

      updateTime: serverTimestamp(),
    });
  };

  return (
    <div className="">
      <Input />
      <h2 className="text-xl font-bold mt-2">ユーザー一覧</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mt-3">
            <span className="text-lg">{user.name}</span>
            <button className="text-red-600 ml-3" onClick={() => deleteUser(user.name)}>
              削除
            </button>
            {!user.admin ? (
              <button
                className="text-blue-600 ml-3"
                onClick={() => {
                  changeAdmin(user.id);
                }}
              >
                管理者
              </button>
            ) : (
              <button
                className="text-green-600 ml-3"
                onClick={() => {
                  changeAdminBool(user.id);
                }}
              >
                投稿者
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
