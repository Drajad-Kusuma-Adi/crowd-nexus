import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import SignIn from "./pages/sign-in/SignIn";
import Register from "./pages/register/Register";
import Map from "./pages/map/Map";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" Component={Landing}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/sign-in" Component={SignIn}></Route>
          <Route path="/map" Component={Map}></Route>
        </Routes>
      </Router>
    </main>
  )
}

export default App
