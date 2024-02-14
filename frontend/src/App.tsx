import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { checkAuthentication } from "./guard/Guard";
import { useEffect } from "react";

import Landing from "./pages/landing/Landing";
import SignIn from "./pages/sign-in/SignIn";
import Register from "./pages/register/Register";
import Map from "./pages/map/Map";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    checkAuthentication();
  }, []);
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" Component={Landing}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/sign-in" Component={SignIn}></Route>
          <Route path="/map" Component={Map}></Route>
          <Route path="*" Component={NotFound}></Route>
        </Routes>
      </Router>
    </main>
  )
}

export default App
