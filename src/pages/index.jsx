import { Input } from "@/components/Input";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "src/utils/firebase";

// 次セクション リアルタイムで
export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    return unsub;
  }, []);

  // adminの更新
  const changeAdmin = async (id) => {
    const userDocumentRef = doc(db, "users", id);
    await updateDoc(userDocumentRef, {
      admin: true,

      updateTime: serverTimestamp(),
    });
  };

  return (
    <div className="">
      <Input />
      <h2 className="text-xl font-bold mt-9">ユーザー一覧</h2>
      <ul className="mt-4 border-t-2">
        {users.map((user) => (
          <li key={user.id} className="border-b-2 py-3 px-4">
            <Link href={`/${user.id}`} className="text-lg">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
