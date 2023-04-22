import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";
import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app";

export function initQuestionsDB() {
  initializeApp(firebaseConfig);
}

export function storeQuestion(item) {
  const db = getDatabase();
  const reference = ref(db, "questionsData/");
  push(reference, item);
}

export function reportQuestion(item) {
  const key = item.id;
  const db = getDatabase();
  const reference = ref(db, `questionsData/${key}`);
  set(reference, item);
}

export function setupQuestionsListener(updateFunc) {
    const db = getDatabase();
    const reference = ref(db,"questionsData/" )
    onValue(reference, (snapshot) => {
        if (snapshot?.val()) {
          const fbObject = snapshot.val();
          const newArr = [];
          Object.keys(fbObject).map((key, index) => {
            newArr.push({ ...fbObject[key], id: key });
          });
          updateFunc(newArr);
        } else {
          updateFunc([]);
        }
      });
}
