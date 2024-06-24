import { setLoading, setToken } from "../../slices/authSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setUser } from "../../slices/ProfileSlice";

//SEND OTP API CALL
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/sendotp",
        {
          email: email.toString(),
          checkUserPresent: true,
        }
      );

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

//SIGNUP API CALL
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

      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/signup",
        {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        }
      );
      console.log("SIGNUP RESPONSE.......", response)

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      toast.success("SignUp Successfull");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//LOGIN API CALL
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//FUNCTION FOR LOGOUT
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

//GET PASSWORD RESET TOKEN API CALL
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

      console.log("SENDING RESET-PASSWORD-TOKEN RESPONSE........", response);

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

// PASSWORD RESET API CALL
export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setLoading(dispatch(true));
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/reset-password",
        {
          password,
          confirmPassword,
          token,
        }
      );

      console.log("PRINTING RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Has Been Reset");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
