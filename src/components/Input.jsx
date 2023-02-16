import { addDoc, collection, doc, namedQuery, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "src/utils/firebase";

export const Input = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) return;
    const userDocumentRef = doc(collection(db, "users"));
    await setDoc(userDocumentRef, {
      name: name,
      email: email,
      admin: admin,
      timestamp: serverTimestamp(),
    });yar
    setName("");
    setEmail("");
    setAdmin(false);
  };

  return (
    <div className="max-w-xl">
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
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
              checked={admin}
              onChange={() => {
                setAdmin((admin) => !admin);
              }}
              className="bg-gray-100 w-6 h-6"
            />
          </div>
          <div className="mt-2">
            <button className="bg-blue-400 rounded-sm text-white px-6 py-1">登録</button>
          </div>
        </form>
      </div>
    </div>
  );
};
