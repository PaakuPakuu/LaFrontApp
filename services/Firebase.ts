import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCYz5p0fCc7pdkPR4dZmBcS1DjVEvlIA54",
    projectId: "lafrontapp",
    appId: "1:541725162213:ios:47d2f783544be5a9ac320c",
}

const Firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(Firebase);

export {firestore}