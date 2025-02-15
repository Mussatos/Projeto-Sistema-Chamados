import { Routes, Route } from 'react-router-dom';

import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Dashboard from '../pages/Dashboard';
import Costumers from '../pages/Costumers';
import Profile from '../pages/Profile';
import New from '../pages/New';
import Historico from '../pages/Historico';

import Private from './Private'; 



function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={  <SignIn/> }/>
            <Route path="/register" element={ <SignUp/> }/>
            
            <Route path='/dashboard' element={ <Private> <Dashboard/> </Private> }/>
            <Route path='/costumers' element={ <Private> <Costumers /> </Private> }/>
            <Route path='/profile' element={ <Private> <Profile /> </Private> }/>
            <Route path='/new' element={ <Private> <New /> </Private> }/>
            <Route path='new/:id' element={ <Private> <New /> </Private> }/>
            <Route path='/history' element={ <Private> <Historico /> </Private> }/>
        </Routes>
    )
}

export default RoutesApp;