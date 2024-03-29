import React, { useState } from "react";
import Axios from "../../axios/Axios";
import Button from "../../components/Button";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [truePassword, setTruePassword] = useState(false);
  const [data, setData] = useState({ usuario: "", password: "" });
  const [isPending, setIsPending] = useState(false);
  const handle = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const login = async (e) => {
    setIsPending(true);
    e.preventDefault();
    try {
      const req = await Axios.post("/auth/login", data);
      setTruePassword(true);
      localStorage.setItem("user", JSON.stringify(req.data.response));
      window.location.href = "/panel";
    } catch (error) {
      setBadPassword(true);
    }
    setIsPending(false);
  };

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center login-background">
      <div className="login-container shadow">
        <img src="/img/login_background.jpg" loading="lazy" />
        <form onSubmit={login} onFocus={() => setBadPassword(false)}>
          <h3 className="fw-bold">Panel de administración</h3>
          <span>Bienvenido</span>
          <div className="d-flex flex-column w-100 mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Usuario"
              onChange={handle}
              name="usuario"
              required
            />
          </div>
          <div className="d-flex flex-column w-100 mb-3">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Contraseña"
                onChange={handle}
                name="password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i className="fa-solid fa-eye" />
              </button>
            </div>
          </div>
          {badPassword && (
            <span className="text-danger fw-bold">
              Usuario o contraseña incorrectos.
            </span>
          )}
          {truePassword && (
            <span className="text-success fw-bold">
              Autenticado, redirigiendo...
            </span>
          )}
          <Button type="submit" text="Acceder" pending={isPending} />
        </form>
      </div>
    </div>
  );
}

export default Login;
