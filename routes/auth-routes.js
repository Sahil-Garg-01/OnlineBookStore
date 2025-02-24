const express=require("express")
const router = express.Router();
const {login,signup,logout}=require("../controllers/auth-controller")


router.get('/login',(req,res)=>{
    return res.render("layouts/login")
})
router.get('/signup',(req,res)=>{
    return res.render("layouts/signup")
})

router.post('/signup', signup);
router.post('/login', login);


router.get('/logout', logout);

module.exports=router;