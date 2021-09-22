import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Route,Redirect} from 'react-router-dom'
import * as authAuction from '../../store/action/auth'
import {useDispatch} from 'react-redux'

const PrivateRoute = ({component:RouteComponent, ...rest}) => {
    const user= useSelector((state)=>state.auth.user)
    const userToken=localStorage.getItem("token")
    const [isToken,setToken]= useState(userToken?false:true);
    
    const dispatch=useDispatch()
    useEffect(() => {
        if(!user){
            if(userToken){
                dispatch(authAuction.login(userToken))
            }
            setTimeout(() => {
                setToken(true)
            }, 800);

        }
    }, [user]) 
    if(isToken){
        return (
            <Route {...rest} render={(routeProps)=>{
                return(
                    user?(<div>
                        <RouteComponent {...routeProps}/>
                        </div>):
                    (<Redirect to='/'/>)
                )
            }}/>    
    )}
    return <h1>Loading...</h1>
    
}
export default PrivateRoute;