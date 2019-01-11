import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) =>{
    const bearerHeader = req.headers['token'];

    if(typeof bearerHeader !== 'undefined'){
        req.token = bearerHeader;

        jwt.verify(req.token, process.env.SECRET_KEY, (error, result) => {
            if (error) {
                res.status(401).send({
                    status: 401,
                    error: 'user unauthenticated'
                })
            } else {
                req.userData = result;
                next();
            }
        })
    } else {
        res.status(401).send({
            status: 401,
            error: 'token not provided'
        })
    }
}


