import React, { useState } from "react";
import Axios from "../../axios/Axios";

function Login() {
  const [data, setData] = useState({ usuario: "", password: "" });
  const handle = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const req = await Axios.post("/auth/login", data);
      localStorage.setItem("user", JSON.stringify(req.data.response));
      //navigate("/panel");
      window.location.href = "/panel";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "var(--blue-color)",
      }}
    >
      <form
        className="d-flex flex-column shadow rounded p-2 w-25 bg-white"
        onSubmit={login}
      >
        <h3 className="fw-bold">Iniciar sesión</h3>
        <div className="d-flex flex-column w-100 mb-3">
          <input
            type="text"
            placeholder="Usuario"
            onChange={handle}
            name="usuario"
            required
          />
        </div>
        <div className="d-flex flex-column w-100 mb-3">
          <div className="d-flex w-100">
            <input
              type="password"
              className="flex-grow-1"
              placeholder="Contraseña"
              onChange={handle}
              name="password"
              required
            />
            <button>
              <i className="fa-solid fa-eye" />
            </button>
          </div>
        </div>
        <button>Acceder</button>
      </form>
    </div>
  );
}

export default Login;
