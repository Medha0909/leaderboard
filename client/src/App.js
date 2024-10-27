import React, { useState } from "react";
import Home from "./Components/home";
import Register from "./Components/register";
import Login from "./Components/login";
import Navbar from "./Components/navbar";
import Leaderboard from "./Components/leaderboard";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
