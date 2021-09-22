import React,{useState,useEffect} from 'react'
import {Button,TextField,} from '@material-ui/core'
import style from './Signup.module.css'
import axios from '../../axios'
import {Container} from '@material-ui/core'
import {useFormik} from 'formik'    
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'

const Signup = () => {
    const history=useHistory()
    const formik=useFormik({
        initialValues:{
            firstName:"",
            lastName:"",
            email:"",
            newPassword:"",
            confirmPassword:""
        },
        validationSchema:yup.object({
            firstName:yup.string()
            .strict().trim()
            .required("First Name is Required").min(3,"Name Must be minimum 3 characters"),
            lastName:yup.string().required("Last Name is Required").strict().trim(),
            email:yup.string().email().required("Email is required"),
            newPassword:yup.string().min(5,"Password must be 5 character")
            .strict().trim().required("new password is required"),
            confirmPassword:yup.string()
            .oneOf([yup.ref('newPassword'),null],"confirm password and new password must be same")
            .required("confirm password is required")
        }),
        onSubmit:(userInputData)=>{
            axios.post("/api/user/userSignup",userInputData,{
                headers:{
                    ContentType:"application/json"
                }
            }).then(({data})=>{
                if(!data){
                    return 
                }
                toast.success(data)
                setTimeout(()=>{
                    history.push('/')
                },2000)
                }).catch ((error)=> {
                    console.log(error.response.data);
                toast.error(error.response.data)
            })
        }
    })
    return (
        
        <div className={style.signupContainer}>
            <Container>
                <form className={style.form}>
                   <div className={style.userData}>
                    <TextField type="text"  name='firstName' id="outlined-basic"
                     label={formik.errors.firstName?formik.errors.firstName:'First Name'}
                    value={formik.values.firstName} onChange={formik.handleChange} 
                    error={formik.errors.firstName}/>
                    {/* {formik.errors.firstName?<p>{formik.errors.firstName}</p>:null} */}
                    <TextField type='text' name='lastName'id="outlined-basic"  
                    label={formik.errors.lastName?formik.errors.lastName:'Last Name'}
                    value={formik.values.lastName} onChange={formik.handleChange} 
                    error={formik.errors.lastName}/>
                    {/* {formik.errors.lastName?<p>{formik.errors.lastName}</p>:null} */}
                   
                    <TextField type="text" name='email' id="outlined-basic"  
                    label={formik.errors.email?formik.errors.email:'Email'}
                    value={formik.values.email} onChange={formik.handleChange} 
                    error={formik.errors.email}/>
                    {/* {formik.errors.email?<p>{formik.errors.email}</p>:null} */}
                    
                    <TextField type='password' name='newPassword' id="outlined-basic" 
                    label={formik.errors.newPassword?formik.errors.newPassword:'new password'}
                    value={formik.values.newPassword} onChange={formik.handleChange} 
                    error={formik.errors.newPassword}/>
                    {/* {formik.errors.newPassword?<p>{formik.errors.newPassword}</p>:null} */}
                    
                    <TextField type="text" name='confirmPassword' id="outlined-basic" 
                     label={formik.errors.confirmPassword?formik.errors.confirmPassword:'confirm password'}
                    value={formik.values.confirmPassword} onChange={formik.handleChange} 
                    error={formik.errors.confirmPassword}/>
                    {/* {formik.errors.confirmPassword?<p>{formik.errors.confirmPassword}</p>:null} */}
                    
                    </div>
                    <Button type='submit'className={style.btn} onClick={formik.handleSubmit}>submit</Button>
                    <Button className={style.login}><Link to='/' style={{textDecoration:'none'}}>Login</Link></Button>
                </form>
                </Container>
                </div>
    )
}
export default Signup
