import express from 'express';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'; 
import jwt from 'jsonwebtoken';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuración de Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


app.use(express.json());
app.use('/api/login', authRoutes); 

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de mi aplicación!'); // Mensaje de bienvenida
});

// Ruta para obtener datos de Firestore
app.get('/data', async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'productos')); 
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(data); // Devuelve los datos en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

// Ruta protegida
app.get('/protected', (req, res) => {  
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {    
        if (err) return res.sendStatus(403); // Prohibido    
        res.json({ message: 'Acceso permitido', user });  
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server on port http://localhost:${port}`);
});