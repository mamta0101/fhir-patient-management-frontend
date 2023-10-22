import { httpAxios } from "./httpHelper/httpHelper";

const refreshToken = localStorage.getItem("refreshToken");

export async function addPatient(item) {
  const result = await httpAxios
    .post("/add_patient", item, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    .then((response) => response.data);
  return result;
}


export async function updatePatient(payload, Id) {
  const result = await httpAxios
    .put(`/update_patient/${Id}`, payload, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    .then((response) => response.data);
  return result;
}

export async function getAllPatients() {
  const result = await httpAxios
    .get("/all_patients")
    .then((response) => response.data);
  return result;
}




export async function getPatientById(PatientId) {
  const result = await httpAxios
    .get(`patient/${PatientId}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    .then((response) => response.data);
  return result;
}



export async function deletePatient(PatientId) {
  const result = await httpAxios
    .delete(`del_patient/${PatientId}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    .then((response) => response.data);
  return result;
}
