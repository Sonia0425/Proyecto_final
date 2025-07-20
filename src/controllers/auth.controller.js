import { generateToken } from "../utils/jwt.js";

const default_user = {
    id: 1,
    email: "admin@admin.com",
    password: "password123",
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (email === default_user.email && password === default_user.password) {
        const token = generateToken(default_user);
        res.json({ token });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

export default { login };