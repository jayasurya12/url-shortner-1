import React,{useState,useEffect} from "react"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Navbar from '../../../components/Navbar/Navbar'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../../axios'
import style  from "./Dashboard.module.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const state = useSelector(state => state.auth.user)
  const [urlData, setUrlData] = useState()
  const [isTrue, setIsTrue] = useState(false)

  useEffect(async() => {
    const load={
      token:localStorage.getItem("token")
    }
    const {data}=await axios.post('/api/url/dashboard',load,{
      headers:{
        contentType:'application/json'
      }
    })
      setUrlData(data.urlData)
      setIsTrue(data.status) 
}, [])
  return (
    <>
    <Navbar/>
    {!isTrue ?<h1>Loading</h1>:
    <TableContainer component={Paper} className={style.tableContainer}>
      <Table aria-lable='simple table' className={style.tableData}>
      <TableHead>
        <TableRow className={style.tableRow}>
          <TableCell variant='h4'>NO</TableCell>
          <TableCell align='center'style={{width:'50px'}} variant='h4'>CREATED DATE</TableCell>
          <TableCell align='center' variant='h2'>CLICKED</TableCell>
          <TableCell align='center' variant='h4'>SHORTED URL</TableCell>
          <TableCell align='center' variant='h4'>FULL URL</TableCell>
          </TableRow>
          </TableHead>
      <TableBody>
        {urlData?.map((element,index)=>{
            return<TableRow key={index}>
              <TableCell  align='center' component='th' scope='row'>{index}</TableCell>
              <TableCell align='center' >{new Date().toDateString(element?.date)}</TableCell>
              <TableCell align='center'>{element?.clicked}</TableCell>
              <TableCell align='center' className={style.shorted}><a href={element?.shortedUrl} target='__blank'> {element?.shortedUrl}</a></TableCell>
              <TableCell align='center' className={style.longUrl} ><a href={element?.originalUrl} target='__blank' >{element?.originalUrl}</a></TableCell>
              </TableRow>
        })}
      </TableBody>
    </Table>
  </TableContainer>
  }
  </>
  );
}

