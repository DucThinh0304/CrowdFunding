import AllCampaigns from "./pages/AllCampaigns";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaign from "./pages/Campaign";
import { useSelector } from "react-redux";

function App() {
  const CampaignPage = () => {
    let { id } = useParams();
  };
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/all-campaigns" element={<AllCampaigns />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/campaign/:id" element={<Campaign />} />
      </Routes>
    </Router>
  );
}

export default App;
