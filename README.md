# React + Vite

3. .env file:
   env
   Copy
   Edit
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password_or_app_password
   CLIENT_URL=http://localhost:3000

4. server.js
   javascript
   Copy
   Edit
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('MongoDB connected');
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch((err) => console.log(err)); 5. models/User.js
javascript
Copy
Edit
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true },
password: String,
otp: String,
otpExpires: Date,
isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema); 6. utils/sendEmail.js
javascript
Copy
Edit
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
const transporter = nodemailer.createTransport({
service: 'Gmail',
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
});

await transporter.sendMail({
from: process.env.EMAIL_USER,
to: email,
subject: subject,
text: text,
});
};

module.exports = sendEmail;

7. controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateOTP = () => Math.floor(100000 + Math.random() \* 900000).toString();

exports.register = async (req, res) => {
const { name, email, password } = req.body;

try {
const userExists = await User.findOne({ email });
if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 60 * 1000); // 1 minute

    const user = await User.create({ name, email, password: hashedPassword, otp, otpExpires });

    await sendEmail(email, 'Verify your Email', `Your OTP is: ${otp}`);

    res.status(201).json({ message: 'Registered successfully. Please verify OTP.' });

} catch (error) {
console.log(error);
res.status(500).json({ message: 'Something went wrong' });
}
};

exports.verifyOTP = async (req, res) => {
const { email, otp } = req.body;

try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.isVerified) return res.status(400).json({ message: 'Already verified' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully. Please login.' });

} catch (error) {
console.log(error);
res.status(500).json({ message: 'Something went wrong' });
}
};

exports.resendOTP = async (req, res) => {
const { email } = req.body;

try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'User not found' });

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 60 * 1000); // 1 min

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendEmail(email, 'Resend OTP', `Your new OTP is: ${otp}`);

    res.status(200).json({ message: 'New OTP sent to your email' });

} catch (error) {
console.log(error);
res.status(500).json({ message: 'Something went wrong' });
}
}; 8. routes/authRoutes.js
javascript
Copy
Edit
const express = require('express');
const { register, verifyOTP, resendOTP } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

module.exports = router;
🔥 Flow Explanation:
/register → Name, Email, Password भेजो → hashed password save होगा + OTP send होगा + OTP 1 min के लिए valid होगा।

/verify-otp → Email और OTP भेजो → अगर OTP सही और time के अंदर है तो user verify हो जाएगा।

/resend-otp → Email भेजो → नया OTP generate और भेज दिया जाएगा।

✅ अगर verify हो गया तो front-end पर redirect करो login page पर।

अगर तुम चाहो तो मैं Frontend (ReactJS वाला) code भी बना सकता हूँ जिसमें timer भी चलेगा और resend OTP बटन भी रहेगा।
बताओ क्या Frontend भी चाहिए? 🎯

likh kar aaya ✅


🔍 Important Concepts:
Topic	Description
Formik	Form state, validation, submission sab handle karta hai
initialValues	Form ke starting values define karta hai
validationSchema	Yup schema se validation rules batata hai
handleChange, handleBlur	Form input pe changes aur focus handle karte hain
errors, touched	Error messages dikhane ke liye use hote hain
Yup	JavaScript object schema validation library hai, Formik ke sath best kaam karta hai

