"use server"

import axios from 'axios'
import { IResponseAPI } from '@/interfaces/IResponseAPI';


const API_URL = process.env.NEXT_PUBLIC_RESUME_PARSER_URL || "https://resumeparser.app/resume/parse"
const API_KEY = process.env.NEXT_PUBLIC_RESUME_PARSER_API_KEY || "0b7429f7643b81677d30ecb65eefe8d1"
export const resumeparser = async (data:any): Promise<IResponseAPI> => {
    try {
        const response = await axios.post(
            `${API_URL}`,
            data,
            {
                headers: { 'Authorization': `Bearer ${API_KEY}` }
            }
        );
        return { success: true, data: response.data, messagge: "Resume parsed successfully" };
    }
    catch(error:any){
        return { success: false, error: error.response?.data?.message || error.message, messagge: "Error parsing resume" };
    }

}
