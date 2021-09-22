import React,{useEffect, useState} from "react";
import Navbar from '../../../components/Navbar/Navbar';
import axios from '../../../axios'
import {Button} from '@material-ui/core'
import {Lock} from '@material-ui/icons'
import {useDispatch} from 'react-redux'
import * as authAuction from '../../../store/action/auth'
import {useHistory} from 'react-router-dom'
import style from './Profile.module.css'

function Profile() {
  const dispatch = useDispatch()
  const [profile, setProfile] = useState('');
  const history=useHistory()

  useEffect(() => {
    const token={token:localStorage.getItem("token")}
     axios.post("/api/user/profile",token,{headers:{
      contentType:'application/json'
    }}) .then(({data})=>{
      setProfile(data.msg)
    })
    .catch((error)=>{
      return alert(error.response.data);
    })
  }, [])

  const handleClick=()=>{
    dispatch(authAuction.logout())
    history.push("/")
  }
  return (
    <>
     <Navbar/>
    <div className="page-heading">
      <h3 className={style.name}>{profile?.firstName +  " "+profile?.lastName}</h3>
      <div className={style.profile}>
        <h5 className={style.email}>{profile?.email}</h5>
        <div className={style.createDate}>
          <h5>Account Created Date :</h5>
        <h6>{new Date().toDateString(profile?.date)}</h6>
        </div>
        <div className={style.url}>
        <h5>URL Created Count : </h5>
        <p>{profile?.urlData?.length}</p>
        </div>
        <Button  type='submit'onClick={handleClick}>logout
          <Lock/>
        </Button> 
        </div>
    </div>
    </>
  );
}

export default Profile;
