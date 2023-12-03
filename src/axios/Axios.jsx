import Axios from "axios";

export const urlMain = "http://192.168.100.4:3000";

export default Axios.create({
  headers: {
    "Content-Type": "application/json",
    /*  Authorization: token, */
  },
  baseURL: urlMain + "/api",
});
