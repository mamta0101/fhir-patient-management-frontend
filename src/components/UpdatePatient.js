import React, { useEffect, useState } from 'react';
import { Button, Container, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { addPatient, getPatientById, updatePatient } from '../Services/patientapi';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';




const UpdatePatient = () => {
 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [patientId, setPatientId] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [identifier, setIdentifier] = useState('');

  const [patient, setPatient] = useState([]);
  const { Id } = useParams()

const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("refreshToken")){
      navigate("/")
    }
  }, [])

  useEffect(() => {
      const fetchPatient = async () => {
        try {
          const patientData = await getPatientById(Id);
          setPatient(patientData);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      };
  
      fetchPatient();
    }, [Id]);

    useEffect(() => {
        setFirstName(patient?.fhirResponse?.firstName)
        setLastName(patient?.lastName)
        setPatientId(patient?.fhirResponse?.id)
        setCity(patient?.fhirResponse?.address?.city)
        setState(patient?.fhirResponse?.address?.state)
        setIdentifier(patient?.fhirResponse?.identifier[0]?.value)
        setDob(patient?.fhirResponse?.birthDate)
      }, [patient])
 
    
      const handleSubmit = async (e) => {
        e.preventDefault();
  if(!gender || !firstName || !lastName ){
    toast.warning("please fill all Details", {
        position: "top-center",
        autoClose: 2000,
      });
  }else{
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
          const result = await updatePatient(payload, Id);
          console.log('Patient added:', result);
          toast.success("Patient Update success", {
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
    }

      };





  return (
    <>
    <Navbar/>
        <Container>
        <h2>Update Patient</h2>
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

export default UpdatePatient;











