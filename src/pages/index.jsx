import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/utils/firebase";

// 次セクション リアルタイムで
export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    return unsub;
  }, []);

  useEffect(() => {
    const userDocumentRef = doc(db, "users", "s9nqbJItrc4evhC2UVGi");
    const unsub = onSnapshot(userDocumentRef, (documentSnapshot) => {
      console.log(documentSnapshot.data());
    });
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-bold">User List</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
