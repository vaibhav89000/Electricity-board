import "./App.css";
import Header from "./components/Header/Header";
import Application from "./components/Application/Application";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ApplicantDetails from "./components/ApplicantDetails/ApplicantDetails";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Application />} />
          <Route path="/applicant-details/:id" element={<ApplicantDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
