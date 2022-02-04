import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainScreen from "../pages/MainScreen";
import Professional from "../pages/Professional";
import ProfessionalType from "../pages/ProfessionalType";

const RoutesApp: React.FC = () => (


    <Routes>
        <Route path="/" element={<MainScreen />} />




        <Route path="/professional" element={<Professional />} />


        <Route path="/professional-type" element={<ProfessionalType />} />
    </Routes>

)


export default RoutesApp;