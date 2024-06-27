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


 export const editCourseDetails = async() =>{

 }


 export const addCourseDetails = async() =>{

 }