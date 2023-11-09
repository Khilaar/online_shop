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
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loc = useLocation()

    console.log(loc)

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
            </div>
        </div>
    );
};

export default Login;