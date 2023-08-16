const credentials = require('../MODELS/credentials.js')

//New user signup api
const SignUp = async (req, res) => {
 try {
  console.log('--------------SIGNUP API ACCESSED--------------');
  const existingUser = await credentials.find({ email: req.body.email }).count();
  if (existingUser) {
   res.send({
    success: false,
    message: 'Existing user'
   })
   res.end();
   return;
  } else {
   const newUser = new credentials(req.body);
   await newUser.save();
   res.send({
    success: true,
    message: 'Signup successful',
   })
   res.end();
  }
 } catch (error) {
  console.log(error)
  res.send({
   success: false,
   message: 'Server Error'
  })
  res.end();
 }
}


//User login api
const Login = async (req, res) => {
 console.log('--------------LOGIN API ACCESSED--------------');
 try {
  const existingUser = await credentials.find({ email: req.body.email });
  if (existingUser.length) {
   if (existingUser[0].password === req.body.password) {
    const a = await credentials.updateOne({ email: req.body.email }, { loginStatus: 1 })
    console.log(a)
    res.send({
     success: true,
     message: `Login successful`,
     userData: existingUser
    })
    res.end();
   } else {
    res.send({
     success: false,
     message: `Oops! Wrong password`
    });
    res.end();
   }
  } else {
   res.send({
    success: false,
    message: `No user with email id ${req.body.email} found. Sign-up first`
   });
   res.end();
  }
 } catch (error) {
  console.log(error)
  res.send({
   success: false,
   message:'Server Error'
  })
  res.end();
 }
}

//Logout user

const Logout = async (req, res) => {
 console.log('--------------LOGOUT API ACCESSED--------------');
 try {
  const dbResponse = await credentials.updateOne({ _id: req.body.userId }, { loginStatus: 0 })
  if (dbResponse.modifiedCount) {
   res.send({
    success: true,
    message:'User logged out'
   })
   res.end();
  }
 } catch (error) {
  console.log(error)
  res.send({
   success: false,
   message: 'Server Error'
  })
  res.end();
 }
}


module.exports = {
 SignUp: SignUp,
 Login: Login,
 Logout: Logout
}