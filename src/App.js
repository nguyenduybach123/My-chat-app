import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabs, { TabPane } from "./components/Tabs";
import AppProvider from "./context/AppProvider";
import AuthProvider from "./context/AuthProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path="/" element={<Home></Home>}></Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  
  );
}

export default App;
