import { BrowserRouter, Link } from "react-router-dom";
import RoutesApp from '../src/routes';
import AuthProvider from "./contexts/auth";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000}/>
        <RoutesApp/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
