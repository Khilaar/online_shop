import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*Routes import*/
import Home from "./HomeRoute/Home"
import Login from './LoginRoute/Login';
import Overview from './OverviewRoute/Overview';
import ShoppingCart from './ShoppingCartRoute/ShoppingCart';
import NotFound from './NotFoundRoute/NotFound';
import Layout from './LayoutRoute/Layout';
import Account from './AccountRoute/Account';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />} >
                        <Route path="/" element={<Home/>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/overview' element={<Overview/>} />
                        <Route element={<ProtectedRoute/>}>
                            <Route path='/account' element={<Account/>} />
                            <Route path='/shoppingCart' element={<ShoppingCart/>} />
                        </Route>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router;