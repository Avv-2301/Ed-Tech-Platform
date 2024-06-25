import { toast } from "react-hot-toast";
// import { setLoading, setUser } from "../../slices/profileSlice";
import axios from "axios";


export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading....");
  let result = [];
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await axios.get(
      "http://localhost:4000/api/v1/profile/getEnrolledCourses",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}
