import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import  firebase  from '../firebaseConfig'
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(firebase);
const auth = getAuth(firebase);

export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = collection(db, 'user');
    const newUser = {
      uid: user.uid,
      email: user.email,
    };
    await addDoc(userRef, newUser);

    return user;
  } catch (error) {
    throw error;
  }
};


// connect a user
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// logout user
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// reset password 
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

