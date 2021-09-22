import React,{useState} from 'react'
import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'
import style from './Home.module.css'
const Home = () => {
    const [login ,setLogin]=useState(true)
    return (
        <div className={style.home}>
           {
               login?
                <Login handleChange={()=> setLogin(false)}/>
               :
                <Signup handleChange={()=> setLogin(true)}/>
           }
           
        </div>
    )
}

export default Home
