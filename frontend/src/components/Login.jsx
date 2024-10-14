"use client";
import { useState } from "react";
import CustomCard from "./Card";
import { Button, Snackbar, Stack, TextField } from "@mui/material";
import axios from "axios";
import ResponsiveDrawer from "./mui/ResponsiveDrawer";

export default function Login({ children }) {
  const token = sessionStorage.getItem("jwt");
  const [user, setUser] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [isAuthenticated, setAuth] = useState(token && token !== "");
  const [error, setError] = useState(
    "Ocurrió un error al intentar iniciar sesión"
  );

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/login",
        {
          code: user.code,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          sessionStorage.setItem("roles", res.data[0]);
          sessionStorage.setItem("user", user.code);
          setUser({
            code: "",
            password: "",
          });
          setAuth(true);
        }
      })
      .catch((e) => {
        setError("Por favor, comprueba tus credenciales");
        setOpen(true);
      });
  };

  const handleRegister = () => {
    if (user.password !== user.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setOpen(true);
      return;
    }
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/register",
        {
          code: user.code,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setMode("login")
      })
      .catch((e) => {
        console.log(e.response.data);
        setError(e.response.data);
        setOpen(true);
      });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("user");
    setAuth(false);
  };

  if (isAuthenticated) {
    return (
      <ResponsiveDrawer handleLogout={handleLogout}>
        {children}
      </ResponsiveDrawer>
    );
  }

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <CustomCard className="px-5 py-10 my-3 w-80">
        <h2 className="mt-0">
          {mode === "login" ? "Iniciar sesión" : "Registrarse"}
        </h2>
        <Stack spacing={2}>
          <TextField
            name="code"
            label="Código de estudiante"
            variant="outlined"
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            label="Contraseña"
            variant="outlined"
            value={user.password}
            onChange={handleChange}
          />
          {mode === "register" && (
            <TextField
              name="confirmPassword"
              type="password"
              label="Confirmar contraseña"
              variant="outlined"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          )}

          {mode === "login" ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              className="py-2 rounded-full"
            >
              Login
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              className="py-2 rounded-full"
            >
              Registrarse
            </Button>
          )}
          <Button
            variant="text"
            onClick={() => {
              setUser({
                code: "",
                password: "",
                confirmPassword: "",
              });
              setMode("register");
            }}
            className="capitalize"
          >
            Si no tienes una cuenta, regístrate
          </Button>
        </Stack>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message={error}
        />
      </CustomCard>
    </main>
  );
}
