import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { checkAuthentication } from "./guard/Guard";
import { useEffect, useState } from "react";

import Landing from "./pages/landing/Landing";
import SignIn from "./pages/sign-in/SignIn";
import Register from "./pages/register/Register";
import Map from "./pages/map/Map";
import Profile from "./pages/profile/Profile";
import EventCreator from "./pages/event-creator/EventCreator";
import EventDetails from "./pages/event-details/EventDetails";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
      const authenticate = async () => {
          await checkAuthentication();
          setAuth(true);
      };
      authenticate();
  }, []);
  if (auth === true) {
    return (
      <Router>
        <main>
          <Routes>
            <Route path="/" Component={Landing}></Route>
            <Route path="/register" Component={Register}></Route>
            <Route path="/sign-in" Component={SignIn}></Route>
            <Route path="/map" Component={Map}></Route>
            <Route path='/profile' Component={Profile}></Route>
            <Route path='/event-creator' Component={EventCreator}></Route>
            <Route path='/event-details' Component={EventDetails}></Route>
            <Route path="*" Component={NotFound}></Route>
          </Routes>
        </main>
      </Router>
    )
  } else {
    return (
      <Loading />
    )
  }
}

export default App
