import React from 'react'
import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_API_KEY

const axiosInstance = axios.create({
    baseURL :baseURL,
    headers : {
        "Content-Type" :'aplication/json',
    }
})


//Request Interceptor//

axiosInstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    function(error){
         return Promise.reject(error);
    }
)

//Response Interceptor //
axiosInstance.interceptors.response.use(
    function(response){
        return response
    },
     async function  (error){
        const originalrequest = error.config

        if(error.response.status == 401 && !originalrequest.retry){
            originalrequest.retry = true;
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await axiosInstance.post('/token/refresh/',{refresh:refreshToken})
                localStorage.setItem('accessToken',response.data.access)
                originalrequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalrequest)


            }catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }
        }
    }
)



export default axiosInstance;