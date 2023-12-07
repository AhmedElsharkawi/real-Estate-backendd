import  jwt  from "jsonwebtoken"

export const verifyToken =  (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json("Access token missing in the request");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(401).json("Invalid or expired token");
        }
        

        req.user = user;
        next();
    });
};
