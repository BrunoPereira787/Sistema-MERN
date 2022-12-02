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

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpet" element={<CreatePet />} />
            <Route path="/mypets" element={<MyPets />} />
            <Route path="/petdetails/:id" element={<PetDetails />} />
            <Route path="/pet/:id" element={<PetEdit />} />
            <Route path="/perfil" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
