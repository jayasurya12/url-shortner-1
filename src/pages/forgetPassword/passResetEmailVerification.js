import React,{useState,useEffect} from 'react'
import {Button, Paper, TextField} from '@material-ui/core'
import style from './forgetPassword.module.css'
import axios from '../../axios'
import EmailValidator from 'email-validator'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'

const ForgetPassword = () => {
    const [forget,setForget]=useState('')
    const history=useHistory()
    const handleChange=(event)=>{
        setForget(event.target.value)  
    }
    const handleClick=async(event)=>{
        event.preventDefault()
        if(forget.length ==''){
            return toast.warning('please enter email')
        }
        if(!EmailValidator.validate(forget)){
            return toast.warn('It is not Email id')
        }
        const forgetPass='/api/forget/userPassVerify/'
        try {
            const email={
                email:forget
            }
            const {data}=await axios.post(forgetPass,email,{
                headers:{contentType:"application/json"}
            })
            toast.success(data)
        } catch (error) {
            toast.error(error.response.data)
        }
    }
    return (
        <div className={style.forgetContainer}>
            <Paper className={style.paper}>
                <form onSubmit={(event)=>event.preventDefault()}>
                    <TextField variant="outlined" name='email'
                    onChange={handleChange} value={forget.email} label='email'/>
                    <br/>
                    <Button className={style.btn}onClick={handleClick}>SEND</Button>
                </form>
                <Button className={style.goBack} onClick={()=>history.push("/")}>Go Back</Button>
            </Paper>
        </div>
    )
}

export default ForgetPassword
