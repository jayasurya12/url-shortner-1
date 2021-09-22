import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import * as authAuction from '../../../store/action/auth'
import style from './User.module.css'
import {Link} from 'react-router-dom'
import {Send,CheckCircleOutline} from '@material-ui/icons'
import { Avatar, Button, Container, Paper, Typography } from '@material-ui/core';
// import Table from '../components/Table/Table'
import axios from '../../../axios'
import * as urlValid from 'valid-url'
import {Alert, AlertTitle} from '@material-ui/lab'
import {useHistory,NavLink} from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'

const User=() =>{
  const token=localStorage.getItem("token")

  /////// shorted all url stored useState//////
  const [urlData,setUrlData]=useState()
  ///////////////// when the route go to user page  token and user email to send backend. Backend to check verify that data to response frontend////////////////////////////////
  const [istrue, setIsTrue]=useState(false)
  ////////////////////////url onChange ///////////////////////////////////////////////////
  const [input ,setInput]=useState("")
  ///////////////////backend error response store------//////////////
  const [urlErrorMsg, setUrlError]=useState("")
  ////////////
  const [shorted,setSortedUrl]=useState("")
  /////////////used Error/////////
  const [used,setUsed]=useState('')

  useEffect(async() => {
    const load={token:token}
    const {data}=await axios.post('/api/user/userPage',load,{
      headers:{
        contentType:'application/json'
      }
    })
      setUrlData(data.user)
      setIsTrue(data.status)
}, [])

  const handleChange=(event)=>{
    setInput(event.target.value)
    if(input.length >=0){
      setUrlError("")
    }
  }
  //////////////// url enter and send///////////////
  const handleClick=async()=>{
    
      if(!urlValid.isUri(input)){
        return setUrlError('is not a url put url must start http');
      }
      if(urlValid.isHttpUri(input) || urlValid.isHttpsUri(input)){
      setUrlError("")
      const URL={
        input:input,
        token:token
      }
        const {data}=await axios.post("/api/url/urlLink",URL,{
          headers:{
            contentType:"application/json"
          }
        })
        setSortedUrl(data.msg.shortedUrl)
        setUsed(data?.used)
      }else{
        return  setUrlError("it is not url")
      }
  }
  if(istrue){
    return (
      <div className={style.container}>
        <div className={style.body}>
        <Navbar/>
        <Container>
          <div className={style.searchBar}>
              <div className={style.search}>
                <Avatar src='https://e7.pngegg.com/pngimages/63/1016/png-clipart-google-logo-google-logo-g-suite-chrome-text-logo.png'/>
                <form onSubmit={(event)=>event.preventDefault()}>
                <input type='text' className={style.input} placeholder="enter your url" value={input} onChange={handleChange}/>
                <Button type='submit' onClick={handleClick}><Send/></Button>
                </form>
              </div>
              {urlErrorMsg.length >0?
              <Alert severity="error" className={style.error}>
                <AlertTitle>Error</AlertTitle>
                {urlErrorMsg}
              </Alert>: 
              shorted.length >0? <Alert className={style.success} 
                iconMapping={{ success: <CheckCircleOutline fontSize="inherit" /> }}>
                {<a href={shorted} target="__blank" className={style.link}>{shorted}</a>}
              </Alert>:null } 
          </div>
          {used?<h4 className={style.alreadyUsage}>{used}</h4>:null}
          
        </Container>
        </div>
      </div>
    );
    }
   
    return <h1>.......................</h1>
}

export default User;
