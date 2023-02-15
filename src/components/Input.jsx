import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "src/utils/firebase";

export const Input = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = e.target.elements;

    if (!name.value || !email.value) return;
    const userDocumentRef = doc(collection(db, "users"));
    await setDoc(userDocumentRef, {
      name: name.value,
      email: email.value,
      timestamp: serverTimestamp(),
    });
    console.log(userDocumentRef.id);
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
              className="bg-gray-100 w-full py-2 px-4 mt-2"
            />
          </div>
          <div className="mt-2">
            <p className="">メールアドレス</p>
            <input
              name="email"
              type="email"
              placeholder="メールアドレス"
              className="bg-gray-100 w-full py-2 px-4 mt-2"
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
