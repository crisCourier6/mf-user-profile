import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import UserProfile from "./components/UserProfile";
import UserFoodPreferences from "./components/UserFoodPreferences";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/profile" element={<UserProfile />}/>
              <Route path="/prefs" element={<UserFoodPreferences />}/>
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
