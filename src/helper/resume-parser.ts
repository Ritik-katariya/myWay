
import FormData from 'form-data'
import { resumeparser } from '@/server/resume-parser-action';

export const parseResume = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file, file.name);
  const response = await resumeparser(formData);
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
}