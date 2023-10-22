import { Box, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deletePatient, getAllPatients } from '../Services/patientapi'
import DrawIcon from '@mui/icons-material/Draw';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [ patients, setPatients] = useState([])
    const navigate = useNavigate();


    const getData = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }

    useEffect(() => {
     getData();
    }, [getData]);


    useEffect(() => {
      if(!localStorage.getItem("refreshToken")){
        navigate("/")
      }
    }, [])


const handleDelete = async (patientId)=>{
  {
    return window.confirm("Are you sure you want to delete?");
  }

  try {
    const result = await deletePatient(patientId);
    console.log('Patient deleted successfully:', result);
    toast.success("Patient deleted successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  } catch (error) {
    console.error('Error deleting patient:', error);
    toast.error(error?.message, {
      position: "top-center",
      autoClose: 2000,
    });
  }

}




  return (
  <>
      <Navbar/>
    <Container>
   <h2>All Patients List</h2>
     
          <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell >PatientId</TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Action</TableCell>
                  
                
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  patients.map((data, index) => (
                    <TableRow >
                      <TableCell>{data?.fhirResponse?.id}</TableCell>
                      <TableCell>
                        <Link to={`/patient-details/${data?._id}`}>
                        {data?.fhirResponse?.firstName} {data?.lastName} 
                        </Link></TableCell>
                      <TableCell>{data?.gender}</TableCell>
                      <TableCell>{data?.fhirResponse?.birthDate}</TableCell>
                      <TableCell>
                        <IconButton color='primary' onClick={()=>navigate(`/update-patient/${data?._id}`)}>
                          <DrawIcon/>
                        </IconButton>
                        <IconButton color='error' onClick={()=>handleDelete(data?._id)}>
                          <DeleteIcon/>
                        </IconButton>
                      </TableCell>
                     
                    </TableRow>
                  )) }

              </TableBody>
            </Table>
          </TableContainer>
     
    </Container>
    </>
  )
}

export default Dashboard