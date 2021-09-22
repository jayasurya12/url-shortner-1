import React,{useState,useEffect} from 'react'
import { Button, Input ,TextField,FormControl, styled} from '@material-ui/core'
import axios from '../../axios'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as emailValidate from 'email-validator'
import * as authAction from '../../store/action/auth'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import style from './Login.module.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import {toast} from 'react-toastify'

const Login = ({handleChange}) => {
    const history=useHistory()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email:"",
        password:""
    })
    const handleInput=(event)=>{
        const {name,value}=event.target;
        setInput((prevalue)=>{
            return{
                ...prevalue,
                [name]:value
            }
        })
    }
    const handleClick=async(event)=>{
        event.preventDefault();
        if(input.email.trim() ===''|| input.password.trim()===""){
            return toast.error("fill all details")
        }
        if(!emailValidate.validate(input.email)){
            return toast.error("email id Wrong pattern")
        }
        try {
            const {data}=await axios.post('/api/user/login',input,{
                headers:{
                    contentType:"application/json"
                }
            })
            console.log(data);
                if(data.token){
                    console.log(data);
                    dispatch(authAction.login(data.token))   
                    localStorage.setItem("token",data.token)
                    history.push("/user");
                }
        } catch (error) {
            toast.error(error.response.data)
        }  
    }
    return (
        <div className={style.loginImg}>
        <div className={style.loginForm}>

           <div className={style.login}>
                <div className={style.logo}></div>
                <div className={style.title}>URL shortner</div>
                <div className={style.subTitle}>Log in</div>
                <div className={style.fields}>
                    <div className={style.username}>
                        <MailOutlineIcon/>
                        <input type="username" 
                        value={input.email}
                        name='email'
                        onChange={handleInput}
                        className={style.userInput} 
                        autoComplete='off'
                        placeholder="enter email"/>
                    </div>
                    <div className={style.password}>
                       <LockIcon/>
                       <input type='password' 
                       className={style.pass} 
                       type='password'
                       value={input.password}
                       name='password'
                       autoComplete='off'
                       onChange={handleInput}
                       placeholder='password'/>
                    </div>
                </div>
                <button className={style.signin} onClick={handleClick}>Login</button>
                <div className={style.link}>
                    <Link to='/forget'>Forget password?</Link> <b>or</b> <Link to='/signup'>Sign up</Link>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Login
