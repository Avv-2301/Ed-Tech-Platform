import { setLoading } from '../../slices/authSlice';
import {authendpoints} from '../apis';
import { apiConnector } from '../apiconnector';
import {toast } from 'react-hot-toast';




export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", authendpoints.SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("SignUp Successfull")
            navigate('/login')
        }
        catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        setLoading(false)
        toast.dismiss(toastId)
    }
}



export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try{
            const response  = await apiConnector("POST", authendpoints.RESETPASSWORD_API, {email})

            console.log(response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
             toast.success("Reset Email Sent")
             setEmailSent(true);
        }
        catch(error){
            console.log("RESET PASSWORD TOKEN ERROR")
        }
        dispatch(setLoading(false))
    }
}