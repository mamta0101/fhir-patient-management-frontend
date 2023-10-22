import AddPatient from "./components/AddPatient";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientDetails from "./components/PatientDetails";
import UpdatePatient from "./components/UpdatePatient";


function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/update-patient/:Id" element={<UpdatePatient />} />
          <Route path="/patient-details/:Id" element={<PatientDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
