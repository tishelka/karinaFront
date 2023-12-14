import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const signInHandle = () => {
    axios
      .get("http://localhost:3000/users", {
        params: { email: email },
      })
      .then((response) => {
        if (response.data.length > 0) {
          alert("Этот емэйл уже зарегистрирован.");
          return;
        }
        axios
          .post("http://localhost:3000/users", {
            email: email,
            password,
          })
          .then(() => {
            alert("Регистрация прощла успешно!");
            nav("main");
          })
          .catch((error) => {
            console.error("Ошибка регистрации:", error);
          });
      })
      .catch((error) => {
        console.error("Ошибка проверки регистрации:", error);
      });
  };

  const logInHandle = () => {
    axios
      .get("http://localhost:3000/users", {
        params: { email: email, password },
      })
      .then((response) => {
        if (response.data.length === 0) {
          alert("Неправильный емэйл или пароль");
          return;
        }
        alert("Вход прошёл успешно!");
        nav("main");
      })
      .catch((error) => {
        console.error("Ошибкка входа:", error);
      });
  };

  return (
    <div className="wrapper">
      <h1>
        Добро пожаловать в <h1 className="headerTitle">Калорийк</h1>
      </h1>
      <div className="options">
        <div className="option">
          <h2>Электронная почта</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signUpInput"
          />
        </div>
        <div className="option">
          <h2>Пароль</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signUpInput"
          />
        </div>
      </div>
      <div className="signUpButtons">
        <button className="signUpButton" onClick={signInHandle}>
          Регистрация
        </button>
        <button className="signUpButton" onClick={logInHandle}>
          Вход
        </button>
      </div>
    </div>
  );
};
