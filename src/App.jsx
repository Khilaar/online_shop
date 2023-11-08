import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*Routes import*/
import Home from './Routes/HomeRoute/Home'
import Login from './Routes/LoginRoute/Login';
import Overview from './Routes/OverviewRoute/Overview';
import ShoppingCart from './Routes/ShoppingCartRoute/ShoppingCart';
import NotFound from './Routes/NotFoundRoute/NotFound';
import Layout from './Routes/LayoutRoute/Layout';
import Account from './Routes/AccountRoute/Account';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/overview' element={<Overview/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/shoppingCart' element={<ShoppingCart/>} />
          <Route path='*' element={<NotFound/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
