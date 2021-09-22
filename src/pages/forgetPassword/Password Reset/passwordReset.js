import React,{useState,useEffect} from 'react'
import {TextField,Button,Paper,Grid,Container} from '@material-ui/core'
import axios from '../../../axios'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import style from './passwordReset.module.css'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom' 

const PasswordReset = () => {
    const [passStatus,setStatus]=useState(false)
    const {token}=useParams();
    const history=useHistory()
    useEffect(async() => {
        if(token){
            try {
                const {data}=await axios.get("/api/forget/td",{
                    headers:{
                        authorization:token
                    }
                })
                setStatus(data.token)
                console.log(data);
            } catch (error) {
               toast.error(error.response.data)
            }
        }
    }, [token])

    const formik=useFormik({
        initialValues:{
            newPassword:"",
            confirmPassword:""
        },
        validationSchema:yup.object({
            newPassword:yup.string()
            .strict().trim()
            .required("enter new password")
            .min(5,'password must be 5 character'),
            confirmPassword:yup.string()
            .oneOf([yup.ref('newPassword'),null],'confirm password and new password must be same')
            .required('confirm password is required')
        }),
        onSubmit:(userInput)=>{
            const passData={
                token:token,
                password:userInput
            }
             axios.post('/api/forget/passwordSet',passData,{
                headers:{
                    contentType:'application/json'
                }
            }).then(({data})=>{
                if(!data){
                    return
                }
                toast.success(data)
                setTimeout(() => {
                    history.push('/')
                }, 2500);
            }).catch((error)=>{
                toast.error(error.response.data)
            })   
        }
    })
    if(passStatus){
        return (
        <div className={style.pass}>
            <Container>
                <Paper className={style.passPaper}>
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <TextField name='newPassword' className={style.input} 
                        label={formik.values.newPassword?formik.errors.newPassword:"new password"} onChange={"handleChange"}
                        value={formik.values.newPassword} onChange={formik.handleChange} 
                        error={formik.errors.newPassword}/>

                        <TextField className={style.input} name='confirmPassword' 
                        label={formik.values.confirmPassword?formik.errors.confirmPassword:"new password"}
                        onChange={"handleChange"}
                        value={formik.values.confirmPassword} onChange={formik.handleChange} 
                        error={formik.errors.confirmPassword}/>
                        <Button className={style.btn} type='submit' onClick={formik.handleSubmit}>Create</Button>
                       <Button className={style.linkBtn}><Link to='/' style={{textDecorationLine:'none'}}>Login</Link></Button>
                    </form>
                </Paper>
        </Container>
    </div>
    )}
return <h3>email verification must</h3>
}

export default PasswordReset
