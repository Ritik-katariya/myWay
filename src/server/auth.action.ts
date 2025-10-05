"use server"

import axios from "axios"
import { IResponseAPI } from "@/interfaces/IResponseAPI"

import { IOTPVerification,ISignIn,ISignUp,IResend, type IResetPassword, type IForgotPassword } from "@/interfaces/IAuth"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://auth-t64k.onrender.com/api/auth"

export const signup = async (data:ISignUp): Promise<IResponseAPI> => {
    try{
        const response = await axios.post(`${API_URL}/register`, data);
        return { success: true, data: response.data, messagge: "User registered successfully" };
    }
    catch(error:any){
        return { success: false, error: error.response?.data?.message || error.message, messagge: "Error registering user" };
    }

}
export const signin = async (data:ISignIn): Promise<IResponseAPI> => {
    try{
        const response = await axios.post(`${API_URL}/login`, data);
        return { success: true, data: response.data, messagge: "User logged in successfully" };
    }
    catch(error:any){
        return { success: false, error: error.response?.data?.message || error.message, messagge: "Error logging in user" };
    }
}

export const verifyOtp = async (data:IOTPVerification): Promise<IResponseAPI> => {
    try{
        const response = await axios.post(`${API_URL}/verify-email`, data);
        return { success: true, data: response.data, messagge: "OTP verified successfully" };
    }
    catch(error:any){
        return { success: false, error: error.response?.data?.message || error.message, messagge: "Error verifying OTP" };
    }
}
export const resendOTP = async (data:IResend): Promise<IResponseAPI> => {
    try{
        const response = await axios.post(`${API_URL}/auth/generate-otp`, data);
        return { success: true, data: response.data, messagge: "OTP sent successfully" };
    }
    catch(error:any){
        return { success: false, error: error.response?.data?.message || error.message, messagge: "Error sending OTP" };
    }
}


export const forgotPassword = async (data:IForgotPassword): Promise<IResponseAPI> => {
    try{
        const response = await axios.post(`${API_URL}/auth/forgot-password`, data);    
        return { success: true, data: response.data, messagge: "Password reset OTP sent successfully" };
    }
    catch(error:any){
        return { success: false, error: error.response?.data?.message || error.message, messagge: "Error sending password reset OTP" };
    }
}

export const resetPassword = async (data:IResetPassword): Promise<IResponseAPI> => {
    try{
        const response = await axios.post(`${API_URL}/auth/reset-password`, data);    
        return { success: true, data: response.data, messagge: "Password reset successfully" };
    }
    catch(error:any){
        return { success: false, error: error.response?.data?.message || error.message, messagge: "Error resetting password" };
    }
}