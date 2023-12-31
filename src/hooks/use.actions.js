import axios from "axios"
import { useNavigate } from "react-router-dom"
import axiosService from "../helpers/axios"

function useUserActions() {
    const navigate = useNavigate()
    const baseURL = 'http://localhost:8000/api'

    return {
        login,
        register,
        logout,
        edit 
    }
    
    
    //login user  
    function login(data){
        return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
            //reg the acc and tokens in the store 
            setUserData(res.data)
            navigate('/')
        })
    }


    //logout the user 
    function logout(){
        localStorage.removeItem('auth')
        navigate('/login')
    }


    //register the user
    function register(data) {
        return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
            setUserData(res.data)
            navigate('/')
        })
    }


    //Edit the user
    function edit(data, userId) {
        return axiosService.patch(`${baseURL}/user/${userId}/`, data).then((res) => {
            //register the acc in the store 
            localStorage.setItem("auth", JSON.stringify({
                access: getAccessToken(),
                refresh: getRefreshToken(),
                user: res.data
            }))
        })
    }
}

//get the access token
function getUser(){
    const auth = JSON.parse(localStorage.getItem('auth')) || null 
    if(auth) {
        return auth.user
    } else {
        return null
    }
}


//get the refresh token
function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem('auth'))
    return auth.access
}


//get refresh token 
function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem('auth'))
    return auth.refresh
}

//set the access, token and user property 
function setUserData(data) {
    localStorage.setItem(
        "auth",
        JSON.stringify({
            access: data.access,
            refresh: data.refresh,
            user: data.user
        })
    )
}





export {useUserActions, getUser, getAccessToken, getRefreshToken}




