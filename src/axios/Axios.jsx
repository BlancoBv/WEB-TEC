import Axios from "axios";

export const urlMain = "http://localhost:3000";

export default Axios.create({
  headers: {
    "Content-Type": "application/json",
    /*  Authorization: token, */
  },
  baseURL: urlMain + "/api",
});
