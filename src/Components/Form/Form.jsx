import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaKey } from 'react-icons/fa';
import './Form.css'; // Add your CSS here for styling
import { loginUser, signupUser, verifyUser, forgotPassword, resetPasswordFun } from './../../Redux/slice/AuthSlice';
import { useDispatch } from 'react-redux';
import banner from './../../assets/banner.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthForm = () => { 
  const [formType, setFormType] = useState('login'); // login, forgotPassword, otp, signup
  const [otpVerified, setOtpVerified] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, isAuthenticated, user, email } = useSelector((state) => state.auth) || '';
  console.log('isAuth', isAuthenticated)
  console.log('user', user)
  console.log('email', email)
 
  

  const [loading, setLoading] = useState({ login: false, signup: false, sendOtp: false, verifyOtp: false, resetPassword: false });



  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    number: '',
    password: ''
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: ''
  });

  const [otpData, setOtpData] = useState({
    otp: ''
  });

  const [resetPassword, setResetPassword] = useState({
    newPassword: ''
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const resetPasswordChange = (e)=> {
     const {name, value} = e.target
     setResetPassword((prevData)=> ({
      ...prevData,
      [name]: value
     }))
  }

  // Login function with toast notification
  const loginFunction = () => {
    console.log('Login data:', loginData);
    setLoading((prev) => ({ ...prev, login: true }));

    if (loginData.email && loginData.password) {
      dispatch(loginUser(loginData))
      .then((response)=> {
        setLoading((prev) => ({ ...prev, login: false }));
        console.log('response in here', response)
        if(response.payload.token){
          toast.success("Logged in successfully!");
          setTimeout(()=> {
            navigate('/landing')
          }, 1000)
        
        }
        else{
          toast.error('Invalid credentials')
          setLoading((prev) => ({ ...prev, login: false }));
        }
      })
     
    } else {
      toast.error("Please fill in all login fields.");
      setLoading((prev) => ({ ...prev, login: false }));
    }
  };

  // Signup function with toast notification
  const signupFunction = () => {
    setLoading((prev) => ({ ...prev, signup: true }));
    console.log('Signup data:', signupData);
    if (signupData.name && signupData.email && signupData.number && signupData.password) {
      dispatch(signupUser(signupData)).then((response)=> {
        setLoading((prev) => ({ ...prev, signup: false }));
         if(response){
          console.log('res', response)
          toast.success("Signed up successfully!");
          setTimeout(()=> {
            setFormType('otp')
          }, 1000)
         }
         else{
          setLoading((prev) => ({ ...prev, signup: false }));
          toast.error("Invalid credentials.");
         }
      })
      // Add signup logic here
     
    } else {
      setLoading((prev) => ({ ...prev, signup: false }));
      toast.error("Please fill in all signup fields.");
    }
  };

  // Forgot password function with toast notifications
const sendOtpFunction = () => {
  setLoading((prev) => ({ ...prev, sendOtp: true }));
  console.log('Forgot password email:', forgotPasswordData.email);

  if (forgotPasswordData.email) {
    dispatch(forgotPassword(forgotPasswordData.email))
      .then((response) => {
        setLoading((prev) => ({ ...prev, sendOtp: false }));
        console.log('Response:', response);

        if (response.payload?.message) {
          toast.info("OTP sent to your email.");
          
          // Wait for a moment before showing the OTP form
          setTimeout(() => {
            setFormType('otp');
          }, 1000);
        } else {
          toast.error("Error: " + (response.payload?.error || "Failed to send OTP."));
        }
      })
      .catch((error) => {
        setLoading((prev) => ({ ...prev, sendOtp: false }));
        toast.error("Failed to send OTP. Please try again later.");
        console.error('OTP sending error:', error);
      });
  } else {
    setLoading((prev) => ({ ...prev, sendOtp: false }));
    toast.error("Please enter your email.");
  }
};


 // OTP verification function with toast notification
const verifyOtpFunction = () => {
  setLoading((prev) => ({ ...prev, verifyOtp: true }));
  console.log('OTP:', otpData.otp);
  const verifyOtp = {
    email: signupData.email || forgotPasswordData.email,
    otp: otpData.otp
  };

  console.log('verify data', verifyOtp);

  if (otpData.otp && (signupData.email || forgotPasswordData.email)) {
    // Replace with actual OTP logic
    dispatch(verifyUser(verifyOtp)).then((response) => {
      setLoading((prev) => ({ ...prev, verifyOtp: false }));
      console.log('response verify', response);
      if (response.payload.message) {
        toast.success("OTP verified successfully!");

        setTimeout(() => {
          setOtpVerified(true);

          // Check which email is being used to set the correct form type
          if (forgotPasswordData.email && forgotPasswordData.email.length !== 0) {
            setFormType('updatePassword');
          } else if (signupData.email && signupData.email.length !== 0) {
            setFormType('login');
          }
        }, 500); // Adding a delay for better UX (optional)
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    });
  } else {
    setLoading((prev) => ({ ...prev, verifyOtp: false }));
    toast.error("Invalid OTP. Please try again.");
  }
};

const resetPasswordFuntion = ()=> {
  setLoading((prev) => ({ ...prev, resetPassword: true }));
    console.log('newPassword', resetPassword)

    if(resetPassword.newPassword && forgotPasswordData.email && otpData.otp ){
      const resetPasswordData = {
        email: forgotPasswordData.email,
        otp: otpData.otp,
        newPassword: resetPassword.newPassword
      }
      dispatch(resetPasswordFun(resetPasswordData)).then((response)=> {
        setLoading((prev) => ({ ...prev, resetPassword: false }));
        console.log('response new password', response)
        if(response.payload.message){
          toast.success(response.payload.message);
          setTimeout(()=> {
            setFormType('login')
          }, 1000)
         
        }
        else{
          setLoading((prev) => ({ ...prev, resetPassword: false }));
        }
      })
    }
    else{
      setLoading((prev) => ({ ...prev, resetPassword: false }));
    }
}


  const handleToggleForm = (type) => {
    setFormType(type);
    setOtpVerified(false);
  };

  return (
    <div className="auth-form-section">
      <div className='formContainerMain'>
        <div className="auth-banner">
          <img src={banner} alt="Banner" />
        </div>

        {formType === 'login' && (
          <div className="auth-form">
            <h2>Login</h2>
            <div className="form-group">
              <FaEnvelope className="form-icon" />
              <input
                type="email"
                name="email"
               
                placeholder="Email"
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <FaLock className="form-icon" />
              <input
                type="password"
                name="password"
              
                placeholder="Password"
                onChange={handleLoginChange}
              />
            </div>
            <button className="auth-btn" onClick={loginFunction}>  {loading.login ? 'Logging in...' : 'Login'}</button>
            <p onClick={() => handleToggleForm('forgotPassword')}>Forgot Password?</p>
            <p onClick={() => handleToggleForm('signup')}>Don't have an account? Signup</p>
          </div>
        )}

        {formType === 'forgotPassword' && (
          <div className="auth-form">
            <h2>Forgot Password</h2>
            <div className="form-group">
              <FaEnvelope className="form-icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleForgotPasswordChange}
              />
            </div>
            <button className="auth-btn" onClick={sendOtpFunction}>{loading.sendOtp ? 'Sending OTP...' : 'Send OTP'}</button>
            <p onClick={() => handleToggleForm('login')}>Login now</p>
          </div>
        )}

        {formType === 'otp' && (
          <div className="auth-form">
            <h2>Enter OTP</h2>
            <div className="form-group">
              <FaKey className="form-icon" />
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleOtpChange}
              />
            </div>
            <button className="auth-btn" onClick={verifyOtpFunction}>
            {loading.verifyOtp ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
            <p onClick={() => handleToggleForm('login')}>Login now</p>
            {otpVerified && (
              <div>
                <h3>OTP Verified!</h3>
                <p onClick={() => handleToggleForm('updatePassword')}>Proceed to update password</p>
                <p onClick={() => handleToggleForm('login')}>Login now</p>
              </div>
            )}
          </div>
        )}

        {formType === 'updatePassword' && (
          <div className="auth-form">
            <h2>Update Password</h2>
            <div className="form-group">
              <FaLock className="form-icon" />
              <input type="password" placeholder="New Password" name='newPassword' onChange={resetPasswordChange} />
            </div>
            <button onClick={resetPasswordFuntion} className="auth-btn">{loading.resetPassword ? 'Updating...' : 'Update Password'}</button>
          </div>
        )}

        {formType === 'signup' && (
          <div className="auth-form">
            <h2>Signup</h2>
            <div className="form-group">
              <FaUser className="form-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleSignupChange}
              />
            </div>
            <div className="form-group">
              <FaEnvelope className="form-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleSignupChange}
              />
            </div>
            <div className="form-group">
              <FaPhone className="form-icon" />
              <input
                type="text"
                name="number"
                placeholder="Phone Number"
                onChange={handleSignupChange}
              />
            </div>
            <div className="form-group">
              <FaLock className="form-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleSignupChange}
              />
            </div>
            <button className="auth-btn" onClick={signupFunction}>{loading.signup ? 'Registering User...' : 'Signup'}</button>
            <p onClick={() => handleToggleForm('login')}>Already have an account? Login</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
