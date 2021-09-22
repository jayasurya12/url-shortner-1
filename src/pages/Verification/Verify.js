import React,{useState,useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from '../../axios'
import style from './verify.module.css'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Button } from '@mui/material';
import {useHistory} from 'react-router-dom'
const Verify = () => {
    const [verify, setVerify]=useState()
    const {token}=useParams();
    const history=useHistory()
    useEffect(() => {
        axios.get('/api/user/verify',{
            headers:{
                authorization:token
            }
        }).then((res)=>
        setVerify(res.data.msg)
        ).catch((error)=>{
            setVerify(error.response.data.msg)
        })
    }, [token])
    const handleClick=()=>{
        history.push('/')
    }
    return (
        <div className={style.verify}>
            <div className={style.card}>
                <div className={style.success}>
                    <CheckCircleOutlineOutlinedIcon/>
                    <h4 style={{color:'white'}}>Success Full</h4>
                </div>
                <div className={style.body}>
                    {verify}
                    <br/>
                    <Button onClick={handleClick}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default Verify
