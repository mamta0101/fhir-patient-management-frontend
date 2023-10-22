import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { VerifyOtp, signUp } from '../Services/userServices';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [token, setToken] = useState("");
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((show) => !show);

  const handleChange = (newValue) => {
    setOtp(newValue)
  }


 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    let user ={
        name:name,
      email: email,
      password:password,
      phone:`+91${phone}`
    }
if(name || email || password || phone){
    try {
        const result = await signUp(user);
        console.log('Otp send successful:', result);
        setLoading(false)
        toast.success("Otp send successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        setToken(result?.credentials?.token)
        setIsOtpSend(true);
        setEmail("");
        setPassword("");
        setPhone("");
        setName("");
      } catch (error) {
        console.error('otp failed:', error); 
        setLoading(false)
        toast.error(error?.message, {
          position: "top-center",
          autoClose: 2000,
        });  
      }
    }else{
        toast.warning("please fill all details", {
            position: "top-center",
            autoClose: 2000,
          });  
          setLoading(false)
    }
  
}
   

  const handleVerify = async (e) => {
    setLoading(true)
    e.preventDefault();
    let payload = {
      otp : otp,
      token:token
    }

    try {
        const result = await VerifyOtp(payload);
        console.log('User Created successfully:', result);
        setLoading(false)
        navigate("/")
        toast.success("User Created successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
      } catch (error) {
        console.error('signup failed:', error);
        setLoading(false)   
        toast.error(error?.message, {
            position: "top-center",
            autoClose: 2000,
          }); 
      }

  }




  return (
    <Container
    maxWidth
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#000',

      }}
    >
      <Card
        variant="outlined"
        sx={{ width: 350, maxWidth: '100%', padding: 2 }}
      >
        {!isOtpSend ?
        
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    }
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    }
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    }
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment
                        sx={{ cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </InputAdornment>
                    }
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{bgcolor:'black'}}
              >
                
                {loading ? <CircularProgress size={20}/> : "Sign Up"}
              </Button>
            </Box>
          </form>
          <Typography
                onClick={()=>navigate('/')}
                sx={{ cursor: "pointer", color: "#757575" , textAlign:'center', mt:2}}
              >
           
                Already have an account;
               
              </Typography>
        </CardContent>
        :
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Verify OTP
          </Typography>
          <form onSubmit={handleVerify}>
            <Grid container spacing={2}>      
              <Grid item xs={12}>
              <MuiOtpInput length={5}  value={otp} onChange={handleChange} />
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{bgcolor:'black'}}
              >                
                {loading ? <CircularProgress size={20}/> : "Verify Otp"}
              </Button>
            </Box>
          </form>

        
        </CardContent>
        }

      </Card>
    </Container>
  );
}

export default Signup;