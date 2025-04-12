import React from "react";
import { useState } from "react";
import { Card, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {postUserCredentials} from "../api/userApi"


export const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validationError, setValidationEroor]=useState(false)
    const navigate = useNavigate()
 
    const handleSignUp= async()=>{
        if(!name || !email || !password){
            setValidationEroor(true)
        }
        else{
            setValidationEroor(false)

            const data=await postUserCredentials(
                {
                    name:name,
                    email:email,
                    password:password
                }
              )

              localStorage.setItem("token", data.token);
              navigate("/userlist")
        }
       
    }


    return (
        <div className="custom-panels">
            <Card
                title={<h3>Sign Up</h3>}
                style={{
                    width: 600,
                }}>
                <h4>Name</h4>
                <Input onChange={(e) => setName(e.target.value)} />
                {validationError && !name && <div style={{color:"red"}}>Please enter Name</div>}

                <h4>Email</h4>
                <Input onChange={(e) => setEmail(e.target.value)} />
                {validationError && !email && <div style={{color:"red"}}>Please enter email</div>}

                <h4>Password</h4>
                <Input onChange={(e) => setPassword(e.target.value)} />
                {validationError && !password && <div style={{color:"red"}}>Please enter password</div>}

                <div className="login-signup-btns">
                    <Button size="large" type="primary" onClick={handleSignUp}>Sign Up</Button>
                </div>

                <div className="login-text">
                    <div style={{ textAlign: "center", margin: "12px" }}>
                        Already have an Account?<span className="sign-up-text"><Button type="link" onClick={() => navigate("/")}>Login</Button></span>
                    </div>

                </div>
            </Card>

        </div>
    )
}