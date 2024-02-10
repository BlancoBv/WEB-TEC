import Axios from "axios";

//export const urlMain = "http://localhost:3000";
export const urlMain = "https://api.jlcabreara.a2hosted.com";
export const multipartHeader = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};
const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : null;

export default Axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  baseURL: urlMain + "/api",
  validateStatus: function (status) {
    if (status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return status >= 200 && status < 300; // default
  },
});
