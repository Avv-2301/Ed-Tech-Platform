import axios from "axios";
import { toast } from "react-hot-toast";

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/course/showAllCategories"
    );
    console.log("SHOW ALL CATEGORIES RESPONSE......", response);
    if (!response?.data?.data) {
      throw new Error("Could not fetch course categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
    toast.error(error.message);
  }
  return result;
};

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/course/editCourse",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Details Edited Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/course/createCourse",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("CREATE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course");
    }
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("ADD COURSE DETAIL API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/course/updateSection",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("UPDATE SECTION API RESPONSE.....", response);
    if (!response.data.success) {
      throw new Error("Cannot update a section");
    }
    toast.success("Section updated successfully");
    result = response.data.data;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading....");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/course/addSection",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("CREATE SECTION API RESPONSE.....", response);
    if (!response?.data?.success) {
      throw new Error("Could not create section");
    }
    toast.success("Course section created");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("CREATE SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading....");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/course/deleteSection",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("DELETE SECTION RESPONSE.....", response);
    if (!response?.data?.success) {
      throw new Error("Cannot Delete section");
    }
    toast.success("Section Deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SECTION API ERROR......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading....");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/course/deleteSubSection",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("DELETE SUB SECTION API RESPONSE.....", response);
    if (!response?.data?.success) {
      throw new Error("Could Not delete Lecture");
    }
    toast.success("Lecture deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SUB SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading....");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/course/addSubSection",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("CREATE SUB SECTION API RESPONSE....", response);
    if (!response?.data?.success) {
      throw new Error("Could not create sub section");
    }
    toast.success("Sub section created successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE SUB SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading....");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/course/updateSubSection",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("UPDATE SUB SECTION API RESPONSE....", response);
    if (!response?.data?.success) {
      throw new Error("Could not update lecture");
    }
    toast.success("Lecture updated successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SUB SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
