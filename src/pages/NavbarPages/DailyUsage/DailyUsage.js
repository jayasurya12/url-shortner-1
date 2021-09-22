import React,{useState,useEffect} from "react";
import Navbar from '../../../components/Navbar/Navbar';
import axios from '../../../axios'
import {Line,Bar} from 'react-chartjs-2'
import { date } from "yup/lib/locale";
import style from './Usage.module.css'

function DailyUsage() {
  const [chart, setChart] = useState([])
  const [daily ,setDaily]=useState([])
  const [month ,setMonth]=useState([])
  const [isTrue, setIsTrue]= useState(false)

  useEffect(async() => {
    const token={
      token:localStorage.getItem('token')
    }
    const  {data}=await axios.post("/api/url/dashboard",token,{
      headers:{
        contentType:'application/json'
      }
    })

    setChart(data)
    const dailyDate=data.urlData.filter((element)=>{
      return new Date().getDate(element.date) === new Date().getDate()
    })
    const monthData= data.urlData.filter((element)=>{
      return new Date().getMonth(element.date) === new Date().getMonth()
    })
    setDaily(dailyDate);
    setMonth(monthData);
  }, [])

  return (
    <>
    <Navbar/>
    <h4 className={style.usageName}>Daily Usage</h4>
    <div className={style.usage}>
      <Bar data={{
        labels:['Todaya URL', 'Monthly URLs'],
        datasets:[{
          label:new Date().toDateString(),
          backgroundColor:['green','blue'],
          data:[daily.length,month.length],
          fontColor:'red'
        }]
      }}/>

    

    </div>
    </>
  );
}

export default DailyUsage;
