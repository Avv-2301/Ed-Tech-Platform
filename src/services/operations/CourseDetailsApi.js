import axios from "axios";
import { toast } from "react-hot-toast";


export const fetchCourseCategories = async() =>{
    let result = []
    try{
        const response = await axios.get("http://localhost:4000/api/v1/course/showAllCategories");
        console.log("SHOW ALL CATEGORIES RESPONSE......",response);
        if(!response?.data?.data){
            throw new Error("Could not fetch course categories");
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}


 export const editCourseDetails = async(data,token) =>{
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await axios.post("http://loclahost:4000/api/v1/course/editCourse",data,
            {
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            }
        })
        console.log("EDIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Edited Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
 }


 export const addCourseDetails = async(data,token) =>{
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await axios.post("http://localhost:4000/api/v1/course/createCourse",data,
            {
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            }
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Add Course")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
 }


 export const updateSection = async() =>{

 }


 export const createSection = async() =>{
    
 }