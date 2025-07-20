import jwt from "jsonwebtoken";

export const generateToken = (user) => {    
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, message: error.message };
    }
};