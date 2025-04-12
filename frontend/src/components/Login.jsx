import React, { useState } from "react";
import { Card, Input, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUserCredentials } from "../api/userApi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setValidationError(true);
    } else {
      const token = await loginUserCredentials({
        email: email,
        password: password,
      });
      localStorage.setItem("token", token.token);
      setValidationError(false);
      navigate("/userlist")
    }
  };

  return (
    <div className="custom-panels">
      <Card
        title={<h3>User Login</h3>}
        style={{
          width: 600,
        }}
      >
        <h4>Email</h4>
        <Input onChange={(e) => setEmail(e.target.value)} />
        {validationError && !email && (
          <div style={{ color: "red" }}>Please enter email</div>
        )}

        <h4>Password</h4>
        <Input onChange={(e) => setPassword(e.target.value)} />
        {validationError && !password && (
          <div style={{ color: "red" }}>Please enter Password</div>
        )}

        <div style={{ textAlign: "end", marginTop: "10px" }}>
          Forget Password?
        </div>
        <div className="login-signup-btns">
          <Button size="large" type="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>

        <div style={{ textAlign: "center", margin: "12px" }}>
          Create an Account?
          <span className="sign-up-text">
            <Button type="link" onClick={() => navigate("/signup")}>
              {" "}
              Sign up
            </Button>
          </span>
        </div>
      </Card>
    </div>
  );
};
