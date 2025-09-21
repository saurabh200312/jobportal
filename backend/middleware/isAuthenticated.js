import jwt from 'jsonwebtoken';
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied", success: false });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Token is not valid", success: false });
        }
        req.user = decoded.id;
        next();

    }catch (error) {
            res.status(500).json({ message: "invalid token", error });
        };
};


export default isAuthenticated;