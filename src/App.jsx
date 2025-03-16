import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import React from "react";
import "./App.css";
import { UserStorage } from "./UserContext";
import Workouts from "./Components/User/Workouts";
import Exercises from "./Components/User/Exercises";
import Statistics from "./Components/User/Statistics";
import Profile from "./Components/User/Profile";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="AppBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="workouts"
                element={
                  <ProtectedRoute>
                    <Workouts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="exercises"
                element={
                  <ProtectedRoute>
                    <Exercises />
                  </ProtectedRoute>
                }
              />
              <Route
                path="statistics"
                element={
                  <ProtectedRoute>
                    <Statistics />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
