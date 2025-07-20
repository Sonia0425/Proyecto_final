import { config } from "dotenv";
config();

export const envs = {
    Database: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
 port:process.env.PORT || 5000,
 secrets:{
     jwt_secret:process.env.JWT_SECRET || "xssqakjdkjhdkjhd",
     session: process.env.SESION_KEY || "kjhskjhdskjh"
     }
};
