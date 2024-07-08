import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();

  //definimos el estado edl componente
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const { email, password } = usuario;

  const Onchange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.getElementById("email").focus();
  }, []);

  const IniciarSesion = async () => {
    if (password.length < 10) {
      const msg = "el password debe tener minimo 10 caracteres";
      swal({
        title: "error",
        text: msg,
        icon: "error",
        button: {
          confirm: {
            text: "ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    } else {
      const data = {
        email: usuario.email,
        password: usuario.password,
      };
      const response = await APIInvoke.invokePOST("/api/auth", data);
      const mensaje = response.msg;

      if (
        mensaje === "El usuario no Existe" ||
        mensaje === "contraseña incorrecta"
      ) {
        const msg = "No es posible iniciar sesion valide sus datos";
        swal({
          title: "error",
          text: msg,
          icon: "error",
          button: {
            confirm: {
              text: "ok",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true
            },
          },
        });
      } else {
        //aca vamos a obtener el token de acceso
        const jwt = response.token;

        //guardar el token en el localStorage
        localStorage.setItem("token", jwt);

        //nos logue
        navigate("/home");
      }
    }
  };

  const Onsubmit = (e) => {
    e.preventDefault();
    IniciarSesion();
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>
            <b>Iniciar Sesion</b>
          </Link>
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Ingresar los datos para loguearge</p>

            <form onSubmit={Onsubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={Onchange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={Onchange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="social-auth-links text-center mb-3"><button type="submit" className="btn btn-block btn-primary">Ingresar</button>
              <Link to={"/registro"} className="btn btn-block btn-danger">Regristrarse</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
