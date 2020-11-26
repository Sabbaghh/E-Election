import firebase from 'firebase/app';

const app2 = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY_SECONDARY_ADMINS,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_SECONDARY_ADMINS,
    databaseURL: process.env.REACT_APP_DATABASE_URL_SECONDARY_ADMINS,
    projectId: process.env.REACT_APP_PROJECT_ID_SECONDARY_ADMINS,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_SECONDARY_ADMINS,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_SECONDARY_ADMINS,
    appId: process.env.REACT_APP_APP_ID_SECONDARY_ADMINS
}, 'Secondary');

export const SecondaryAdmins = app2.auth();
export default app2;