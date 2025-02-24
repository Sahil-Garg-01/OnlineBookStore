const {User}=require("../models/user-model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


async function signup(req,res){
    try{
        const {username ,email, password} = req.body;

        const  auser= await User.findOne({ email : email })

        if (auser) {
            return res.render("layouts/login", { message : "User already exists"})
        }
        

        bcrypt.genSalt(7,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err){ res.send(err.message); }
                else {
                    const newuser= await User.create({
                        username,
                        email,
                        password : hash,
                        });
                    const token=jwt.sign( {email:newuser.email, id:newuser._id}, process.env.JWT_KEY)
                    res.cookie("token",token)
                    return res.status(201).redirect("login")
                    }
                })
            })  
        }   
    catch(err){
        res.send(err.message)
    }
}


async function login(req,res){
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.render('layouts/login', { error: 'Incorrect Email or Password' });
        }
        
        const token = jwt.sign({ email:user.email ,id: user._id }, process.env.JWT_KEY, {
          expiresIn: '24h'
        });
        
        res.cookie('token', token, {
          maxAge: 24 * 60 * 60 * 1000
        });
        
        res.redirect("/");
    } 
      catch (error) {
        res.render('layouts/login', { error: 'Login failed' });
      }
    };
    
      
  
async function logout(req,res){
      res.clearCookie('token');
      return res.redirect('/');
    }
  


module.exports={login,signup,logout}