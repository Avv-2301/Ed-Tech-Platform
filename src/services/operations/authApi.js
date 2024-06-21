import { setLoading } from "../../slices/authSlice";
import { authendpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import axios from "axios";

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
    //   const response = await apiConnector("POST", authendpoints.SENDOTP_API, {
    //     email,
    //     checkUserPresent: true,
    //   });
    const response = await axios.post("http://localhost:4000/api/v1/auth/sendotp",
        {
            email,
            checkUserPresent:true
        }
    )
    
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", authendpoints.SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("SignUp Successfull");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/reset-password-token",
        {
          email,
        }
      );

      //   const response = await apiConnector(
      //     "POST",
      //     authendpoints.RESETPASSWORD_API,
      //     { email }
      //   );

      console.log("SENDING RESET-PASSWORD-TOKEN RESPONSE........",response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset password Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR", error);
      toast.error("Failed to send email for reset password");
    }
    dispatch(setLoading(false));
  };
}


export function resetPassword(password, confirmPassword, token){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        setLoading(dispatch(true))
        try{
            const response = await axios.post("http://localhost:4000/api/v1/auth/reset-password",{
                password,
                confirmPassword,
                token
            })

            console.log("PRINTING RESPONSE", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password Has Been Reset")
        }
        catch(error){
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false))
    }
}
