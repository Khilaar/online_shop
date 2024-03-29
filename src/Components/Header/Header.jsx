import { useDispatch, useSelector } from "react-redux"
import "./Header.css"
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../../App/Store/Slices/userSlice"
import useLightMode from "../../Hooks/useLightMode"

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state.user.accessToken)
    const [lightMode, setLightMode] = useLightMode()

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("accessToken")
        navigate("/login")
    }


    return (
        <header>
            <h1>Shop</h1>
            <button onClick={setLightMode}>{lightMode ? "Dark Mode" : "Light Mode"}</button>
            <div className="headerNavigation">
            <NavLink to="/overview">Overview</NavLink>
                {/* Depending if logged in, the user need to see different links */}
                {isLoggedIn? (
                    <>
                        
                        <NavLink to="/account">Account</NavLink>
                        <NavLink to="/shoppingCart">Shopping-Cart</NavLink>
                        <a className="logout" onClick={handleLogout}>Logout</a>
                    </>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}

            </div>
        </header>
    )
}

export default Header