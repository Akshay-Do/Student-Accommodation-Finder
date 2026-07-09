import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import FindHousing from './Pages/FindHousing/FindHousing';
import LandlordDashboard from './Pages/LandlordPortal/LandlordPortal';
import AddListing from './Pages/LandlordPortal/AddListing';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/findhousing" exact={true} element={<FindHousing />} />
        <Route path="/manageproperties" exact={true} element={<LandlordDashboard />} />
        <Route path="/dashboard" exact={true} element={<LandlordDashboard />} />
        <Route path="/add-listing" exact={true} element={<AddListing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
