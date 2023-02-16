import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "src/utils/firebase";

const UsersEdit = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);

  const updateData = async (e) => {
    e.preventDefault();
    const userDocumentRef = doc(db, "users", router.query.id);
    await updateDoc(userDocumentRef, {
      name: name,
      email: email,
      admin: admin,
      updateTime: serverTimestamp(),
    });

    router.push(`/${router.query.id}`);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const userDocumentRef = doc(db, "users", router.query.id);
    getDoc(userDocumentRef).then((documentSnapshot) => {
      setUser(documentSnapshot.data());
    });
  }, [router.query.id]);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setAdmin(user.admin);
  }, [user]);

  return (
    <div>
      <h2 className="text-xl text-blue-500 font-bold">ユーザー編集</h2>

      <div className="mt-4">
        <form onSubmit={updateData}>
          <div>
            <p className="text-lg">名前</p>
            <input
              name="name"
              type="text"
              placeholder="名前"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-gray-100 w-full py-2 px-4 mt-2"
            />
          </div>
          <div className="mt-2">
            <p className="">メールアドレス</p>
            <input
              name="email"
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-gray-100 w-full py-2 px-4 mt-2"
            />
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <p className="">管理者</p>
            <input
              name="admin"
              type="checkbox"
              onChange={() => {
                setAdmin((admin) => !admin);
              }}
              checked={admin}
              className="bg-gray-100 w-6 h-6"
            />
          </div>
          <div className="mt-4">
            <button className="bg-blue-400 rounded-sm text-white px-6 py-1">更新</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersEdit;
