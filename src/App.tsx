import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import UserProfile from "./components/UserProfile";
import UserFoodPreferences from "./components/UserFoodPreferences";

function App() {
  return (
    <div className="App">
      <Router basename="mf-user-profile">
          <Routes>
              <Route path="/profile" element={<UserProfile />}/>
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
