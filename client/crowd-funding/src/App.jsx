import AllCampaigns from "./pages/AllCampaigns";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaign from "./pages/Campaign";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/all-campaigns" element={<AllCampaigns />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campaign" element={<Campaign />} />
      </Routes>
    </Router>
  );
}

export default App;
