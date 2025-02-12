import { env } from "process";

export async function getAllUser() {
  return await fetch("http://localhost:5185/api" + "/empleado")
    .then((response) => response.json())
    .then((data) => data);
    //.then((data) => console.log(data));
}
export async function getUserID(id){
  return await fetch("http://localhost:5185/api" + "/empleado/" + id)
    .then((response) => response.json())
    .then((data) => data);
} 