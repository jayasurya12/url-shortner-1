import axios from '../../axios'

export const userData=(user)=>{
    return{
        type:"SET_USER",
        user:user
    }
}
export const login=(token)=>{
    return async(dispatch)=>{
        try {
            const {data}=await axios.get("/api/user/data",{
                headers:{
                    authorization:token
                }
            })
            dispatch(userData(await data))
        } catch (error) {
            alert(error.response.data)   
        }
    }
}
export const userLogout=()=>{
    return{
        type:"LOG_OUT"
    }
}
export const logout=()=>{
    return async(dispatch)=>{
        try {
            localStorage.removeItem("token")
            dispatch(userData())
        } catch (error) {
            alert(error.response.data);
        }
    }
}