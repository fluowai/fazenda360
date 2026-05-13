import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// This file is populated after set_up_firebase tool is called with userConfirmedTermsAcceptedInUI: true
// For now, we export a function that will be used to initialize the services safely.
let firebaseApp: any;
let firestoreDb: any;
let firebaseAuth: any;
let firebaseStorage: any;

export async function getFirebase() {
  if (!firebaseApp) {
    try {
      // Use dynamic import with a template literal or string variable to prevent strict build-time resolution
      const configPath = './../firebase-applet-config.json';
      const config = await import(/* @vite-ignore */ configPath);
      
      firebaseApp = initializeApp(config.default);
      firestoreDb = getFirestore(firebaseApp, config.default.firestoreDatabaseId);
      firebaseAuth = getAuth(firebaseApp);
      firebaseStorage = getStorage(firebaseApp);
    } catch (e) {
      console.warn("Firebase config not found or invalid. Please follow the Firebase setup steps.");
      return null;
    }
  }
  return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth, storage: firebaseStorage };
}

