import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import CampaignList from "./pages/campaignList/CampaignList";
import Campaign from "./pages/campaign/Campaign";
import NewCampaign from "./pages/newCampaign/NewCampaign";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Inaccessible from "./pages/login/Inaccessible";
import PendingList from "./pages/pendingList/PendingList";
import TransactionList from "./pages/transactionList/TransactionList";

function App() {
  const admin = useSelector((state) => state.user.currentUser);
  const isAdmin = () => {
    return !admin ? false : admin.isAdmin ? true : false;
  };
  console.log(!admin);
  return (
    <Router>
      {isAdmin() && <Topbar />}
      <div className="container">
        {isAdmin() && <Sidebar />}
        <Routes>
          <Route
            path="/"
            exact
            element={
              !admin ? (
                <Navigate to="/login" />
              ) : isAdmin() ? (
                <Home />
              ) : (
                <Navigate to="/inaccessible" />
              )
            }
          />
          <Route
            path="/login"
            exact
            element={
              !admin ? (
                <Login />
              ) : isAdmin() ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/inaccessible" />
              )
            }
          />
          <Route path="/inaccessible" exact element={<Inaccessible />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaign/:campaignId" element={<Campaign />} />
          <Route path="/newcampaign" element={<NewCampaign />} />
          <Route path="/pendings" element={<PendingList />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
