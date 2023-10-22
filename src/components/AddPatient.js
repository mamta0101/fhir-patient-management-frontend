import React, { useEffect, useState } from 'react';
import { Button, Container, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { addPatient } from '../Services/patientapi';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';



const AddPatient = () => {
 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [patientId, setPatientId] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [identifier, setIdentifier] = useState('');

const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("refreshToken")){
      navigate("/")
    }
  }, [])
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        let payload ={
          resourceType: "Patient",
         firstName:firstName,
          id: patientId,
          name: [
            {
              use: firstName,
              family: lastName,
              given: ["john"]
            }
          ],
          gender: gender,
          birthDate:dob,
          address: 
            {
              use: "home",
              line: ["123 Main St"],
              city: city,
              state: state,
              postalCode: "12345"
            },
        
          identifier: [
            {
              system: "http://example.org/patient-identifier",
              value: `PAT${identifier}`
            }
          ]
        }
    
        try {
          const result = await addPatient(payload);
          console.log('Patient added:', result);
          toast.success("Patient added", {
            position: "top-center",
            autoClose: 2000,
          });

        } catch (error) {
          console.error('Error adding patient:', error);
          toast.error(error?.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      };





  return (
    <>
    <Navbar/>
        <Container>
        <h2>Add New Patient</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} mt={5}>
            <Grid item md={6} xs={12}>
            <TextField
        
        label="Patient Id"
        name="Patient Id"
        value={patientId}
        onChange={(e)=>setPatientId(e.target.value)}
        required
        fullWidth
        mt={3}
      />
            </Grid>
          
            <Grid item md={6} xs={12}>
        <RadioGroup
        row
        name="gender"
        value={gender.toString()} onChange={(e)=>setGender(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
         </Grid>
      
          
            <Grid item md={6} xs={12}>
            <TextField
          label="First Name"
          name="name"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          required
          fullWidth
        />
        </Grid>
        <Grid item md={6} xs={12}>
            
        <TextField
          label="Last Name"
          name="name"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          required
          fullWidth
        />
         </Grid>
       
        <Grid item md={6} xs={12}>
        <TextField
          label=""
          name="birthDate"
          type="date"
          value={dob}
          onChange={(e)=>setDob(e.target.value)}
          required
          fullWidth
        />
         </Grid>
         <Grid item md={6} xs={12}>
        <TextField
          label="Identifier Id"
          name="Identifier"
          value={identifier}
          onChange={(e)=>setIdentifier(e.target.value)}
          fullWidth
        />
         </Grid>
        <Grid item md={6} xs={12}>
        <TextField
          label="city"
          name="city"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          fullWidth
        />
         </Grid>
        <Grid item md={6} xs={12}>
        <TextField
          label="State"
          name="State"
          value={state}
          onChange={(e)=>setState(e.target.value)}
          fullWidth
        />
         </Grid>
     
       
         

     

        
            <Grid item md={12} xs={12} flexGrow={1}>
            <Button type="submit" variant="contained" sx={{bgcolor:'#000'}}>
          Add Patient
        </Button>
            
            
            </Grid>
          </Grid>
          </form>
        </Container>
      
    </>
  );
};

export default AddPatient;











