import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPatientById } from '../Services/patientapi';
import Navbar from './Navbar';

const PatientDetails = () => {
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


  return (
    <>
     <Navbar/>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4">
          Patient Details
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

        <List>
          <ListItem>
            <ListItemText primary="First Name" secondary={patient?.fhirResponse?.firstName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={patient?.lastName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Date of Birth" secondary={patient?.fhirResponse?.birthDate} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Gender" secondary={patient?.gender} />
          </ListItem>
          <ListItem>
          </ListItem>
          <ListItem>
            <ListItemText primary="City" secondary={patient?.fhirResponse?.address?.city} />
          </ListItem>
          <ListItem>
            <ListItemText primary="State" secondary={patient?.fhirResponse?.address?.state} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Postal Code" secondary={patient?.fhirResponse?.address?.postalCode} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Patient Identifier" secondary={patient?.fhirResponse?.identifier[0]?.value} />
          </ListItem>
        </List>
      </Paper>
    </Container>
    </>
  );
};

export default PatientDetails;