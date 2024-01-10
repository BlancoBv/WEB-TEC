import Axios from "axios";

export const urlMain = "http://192.168.100.4:3000";
export const multipartHeader = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};
const token = JSON.parse(localStorage.getItem("token"));
console.log({ token });

export default Axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  baseURL: urlMain + "/api",
});
