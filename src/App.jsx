import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import api from './App/api';
import Router from './Routes/Router';
import { useEffect, } from 'react';
import { login, logout } from './App/Store/Slices/userSlice';



function App() {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.user.accessToken)

  useEffect(()=>{
    const localToken =localStorage.getItem("accessToken")

    if (localToken) {
      api.post("/auth/token/verify/", {token:localToken})
        .then(() => dispatch(login(localToken)))
        .catch(() => {
          localStorage.removeItem("accessToken")
          dispatch(logout())
        })
    } else {
      dispatch(logout())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (accessToken === undefined) {
    return <>Loading...</>
  } else {
    return <Router/>
  }

  
  
}

export default App
