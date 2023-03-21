import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStorage } from "./UserContext";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Header from "./Components/Header";
import CreatePet from "./Components/Pets/CreatePet";
import MyPets from "./Components/Pets/MyPets";
import PetEdit from "./Components/Pets/PetEdit";
import PetDetails from "./Components/Pets/PetDetails";
import User from "./Components/User/User";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import ProtectdRouteLogin from "./Components/Helper/ProtectdRouteLogin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
              <Home />
              }
            />
            <Route
              path="/createpet"
              element={
                <ProtectedRoute>
                  <CreatePet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mypets"
              element={
                <ProtectedRoute>
                  <MyPets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/petdetails/:id"
              element={
                <ProtectedRoute>
                  <PetDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pet/:id"
              element={
                <ProtectedRoute>
                  <PetEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectdRouteLogin>
                  <Login />
                </ProtectdRouteLogin>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectdRouteLogin>
                  <Register />
                </ProtectdRouteLogin>
              }
            />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
