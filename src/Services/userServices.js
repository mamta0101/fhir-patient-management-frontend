import { httpAxios } from "./httpHelper/httpHelper";

export async function signUp(user) {
  const result = await httpAxios
    .post("/signup", user)
    .then((response) => response.data);

  return result;
}
export async function VerifyOtp(payload,) {
  const result = await httpAxios
    .post("/verify_registration", payload,)
    .then((response) => response.data);

  return result;
}

export async function login(loginData) {
  const result = await httpAxios
    .post("/login", loginData)
    .then((response) => response.data);
  return result;





}
export async function currentUser() {
  const result = await httpAxios
    .get("/api/current")
    .then((response) => response.data);
  return result;
}

export async function logout() {
  const result = await httpAxios
    .post("/api/logout")
    .then((response) => response.data);
  return result;
}
