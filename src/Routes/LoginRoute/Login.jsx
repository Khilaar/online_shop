import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../App/api";
import "./Login.css"
import { loadUser, login } from "../../App/Store/Slices/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [validation, setValidation] = useState(false)
    const [notRegistered, setNotRegistered] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loc = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post("/auth/token/", {email, password})
            localStorage.setItem("accessToken", res.data.access)
            
            dispatch(login(res.data.access))
            dispatch(loadUser(res.data.user))

            setLoginError("")

            const target = loc.state?.origin || "/account"

            navigate(target)

        } catch (error) {
            if (error.response?.data?.detail) {
                setLoginError(error.response.data.detail)
                console.log(error.response.data.detail)
            } else {
                setLoginError("Login failed")
            }
            
        }
    }

    const handleRegistration = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post("/auth/registration/", {"email": email})
            console.log(res)
            setValidation(!validation)

        } catch (error) {
            console.log(error.response)
            setValidation(!validation)
        }
    }

    const handleValidation = async (e) => {
        e.preventDefault()
        console.log(e.target[0].value)
        try {
            const res = await api.patch("/auth/registration/validation/", 
            {"email": email,  
            "username": e.target[1].value, 
            "code": e.target[0].value, 
            "password": e.target[4].value, 
            "password_repeat": e.target[5].value, 
            "first_name": e.target[2].value, 
            "last_name": e.target[3].value
            })

            console.log(res)
            setValidation(!validation)
            console.log(res)

        } catch (error) {
            console.log(error.response)
            setValidation(!validation)
        }
    }

    const triggerNotRegistered = () => {
        setNotRegistered(!notRegistered)
    }

    if (!notRegistered) {
        return (
            <div>
                <h2>Login Page</h2>
                <div className="loginCard">
                    <form id="login" onSubmit={(e) => handleSubmit(e)}>
    
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="eMail" 
                        value={email}
                        required 
                        onChange={(e) => setEmail(e.target.value)} />
    
                        <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        value={password}
                        required  
                        onChange={(e) => setPassword(e.target.value)}/>
    
                        <button type="submit">Login</button>
                        <p className="error">{loginError}</p>
                    </form>
                    <h4>Still not registered?</h4>
                    <button onClick={triggerNotRegistered}>Create User</button>
                </div>
            </div>
        );
    } else if (notRegistered) {
        return (
            <div>
                <h2>Registration</h2>
                <div className="loginCard">
                    <form id="login" onSubmit={(e) => handleRegistration(e)}>
    
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="eMail" 
                        value={email}
                        required 
                        onChange={(e) => setEmail(e.target.value)} />
    
                        <button type="submit">Register</button>
                    </form>
                    {validation && (
                        <form id="validation" onSubmit={(e) => handleValidation(e)}>
                            <h4>Check your Mail for the validation code and tell us your account details</h4>
                            <input type="text" placeholder="validation code" autoComplete="off" />
                            <input  type="text" placeholder="username" autoComplete="off" />
                            <input  type="text" placeholder="first name" autoComplete="off" />
                            <input  type="text" placeholder="last name" autoComplete="off" />
                            <input  type="password" placeholder="password" autoComplete="new-password" />
                            <input  type="password" placeholder="repeat password" autoComplete="off" />
                            <button type="submit">validate</button>
                        </form>
                    )}
                    <h4>Already registered?</h4>
                    <button onClick={triggerNotRegistered}>Log In</button>
                </div>
            </div>
        );
    }
    
};

export default Login;