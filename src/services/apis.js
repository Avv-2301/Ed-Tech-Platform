const BASE_URL = "http://localhost:4000/api/v1"

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}

export const authendpoints = {
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password-token",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
}