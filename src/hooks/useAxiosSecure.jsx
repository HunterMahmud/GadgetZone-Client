import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useAuthProvider from './useAuthProvider';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: '',
})

const useAxiosSecure = () => {
    
    return axiosSecure;
};

export default useAxiosSecure;