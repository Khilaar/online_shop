import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../App/api";
import { loadUser } from "../../App/Store/Slices/userSlice";

const Account = () => {

    const details = useSelector(state => state.user.details)
    const accessToken = useSelector(state => state.user.accessToken)
    const dispatch = useDispatch()

    const fetchUser = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
            const res = await api.get("/users/me/", config)
            dispatch(loadUser(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!details) {
        return <>Loading...</>
    } else {
        return (
            <div>
                <h2>{details.first_name} {details.last_name}</h2>
                <h3>{details.username}</h3>
                <h4>{details.email}</h4>
            </div>
        );
    }


    
};

export default Account;