const {getUser} = require("../services/auth");

async function restrictToLoggedInUserOnly(req,res,next){
             const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await getUser(userUid);
    if (!user) {
        return res.status(401).json({ message: "Invalid user" });
    }

    req.user = user;
    next();
}




module.exports = {
   restrictToLoggedInUserOnly,
};