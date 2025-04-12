import { Button, Card, Input } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import{createUser} from "../api/userApi"

export const AddUser = () => {
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [email,setEmail]=useState('')
    const [profile, setProfile] = useState('')
    const [address, setAddress] = useState('')
    const [validationError,setValidationError]=useState(false)
    const navigate = useNavigate()

    const handleSubmit=async()=>{
        if(!address || !profile || !email || !role || !name){
            setValidationError(true)
        }
        else{
            await createUser(
                {
                    name:name,
                    email:email,
                    role:role,
                    address:address,
                    profile:profile,
                }
            )
           navigate("/userlist")
        }
    }

    return (
        <div className="custom-panels">
            <Card
                title={<h3>Add User</h3>}
                style={{
                    width: 600,
                }}
            >
                <h4>Name</h4>
                <Input onChange={(e) => setName(e.target.value)} />
                {validationError && !name && <div style={{color:"red"}}>Please enter Name</div>}

                <h4>Email</h4>
                <Input onChange={(e) => setEmail(e.target.value)} />
                {validationError && !email && <div style={{color:"red"}}>Please enter email</div>}

                <h4>Profile Image</h4>
                <Input onChange={(e) => setProfile(e.target.value)} />
                {validationError && !profile && <div style={{color:"red"}}>Please enter profile</div>}

                <h4>Position</h4>
                <Input onChange={(e) => setRole(e.target.value)} />
                {validationError && !role && <div style={{color:"red"}}>Please enter role</div>}

                <h4>Location</h4>
                <Input onChange={(e) => setAddress(e.target.value)} />
                {validationError && !address && <div style={{color:"red"}}>Please enter address</div>}
                
                <div style={{ textAlign: "center", margin: "10px" }}>
                    <Button type="primary" block onClick={handleSubmit}>
                        Add
                    </Button>
                </div>
                <div style={{ textAlign: "center", margin: "10px" }}>

                    <Button block onClick={() => navigate("/userlist")}>
                        cancel
                    </Button>
                </div>

            </Card>
        </div>
    )
}