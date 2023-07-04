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
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Success from "./pages/Success";
import MyAccount from "./pages/MyAccount";
import Address from "./components/setting/Address";
import Profile from "./pages/Profile";
import CreateCampaign from "./pages/CreateCampaign";
import PendingCampaign from "./pages/PendingCampaign";
import UpdatePending from "./pages/UpdatePending";
import Messenger from "./pages/Messenger";

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
        <Route path="/all-campaigns/:id" element={<AllCampaigns />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/campaign/:id" element={<Campaign />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/profile"
          element={!user ? <Navigate to="/login" /> : <Profile />}
        />
        <Route
          path="/donate/:id"
          element={!user ? <Navigate to="/login" /> : <Donate />}
        />
        <Route
          path="/success"
          element={!user ? <Navigate to="/login" /> : <Success />}
        />
        <Route
          path="/my-account/:id"
          element={!user ? <Navigate to="/login" /> : <MyAccount />}
        />
        <Route
          path="/my-account/address/:id"
          element={!user ? <Navigate to="/login" /> : <MyAccount />}
        />
        <Route
          path="/my-account/address/edit-address/:id"
          element={!user ? <Navigate to="/login" /> : <MyAccount />}
        />
        <Route
          path="/my-account/address/password/:id"
          element={!user ? <Navigate to="/login" /> : <MyAccount />}
        />
        <Route
          path="/create-campaign"
          element={!user ? <Navigate to="/login" /> : <CreateCampaign />}
        />
        <Route
          path="/pending-campaign/:id"
          element={!user ? <Navigate to="/login" /> : <PendingCampaign />}
        />
        <Route
          path="/update-pending/:id"
          element={!user ? <Navigate to="/login" /> : <UpdatePending />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/login" /> : <Messenger />}
        />
      </Routes>
    </Router>
  );
}

export default App;
