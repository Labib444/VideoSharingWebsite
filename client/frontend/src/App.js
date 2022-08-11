import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";


import Login from './LoginPage/Login';
import SignUp from './SignUpPage/SignUp';
import AddVideoPage from './AddVideoPage/AddVideoPage';
import ViewVideoPage from './ViewVideoPage/ViewVideoPage';
import Home from './Home';
import LogoutPage from './LogoutPage/LogoutPage';
import MyUploads from './DashBoardPage/MyUploads';
import ViewDetailsPage from './VideoDetailsPage/ViewDetailsPage';

import { useCookies } from 'react-cookie';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['TOKEN']);
  const [cookies2, setCookie2, removeCookie2] = useCookies(['USER_ID']);

    const logout = <a class="nav-link" href="/Logout">Logout</a>;
    const login = <a class="nav-link" href="/SignUp">Login</a>;

    const shareNewVideo = (
        <li class="nav-item">
            <a class="nav-link" href="/AddVideo">Share New Video</a>
        </li>
    );
    
    const uploadedVideo = (
        <li class="nav-item">
            <a class="nav-link" href={"/MyUploads/"+cookies2.USER_ID}>My Videos</a>
        </li>
    );

    return (
        <Router>
            <nav class="navbar navbar-expand-lg navigation">
                <div class="container">
                <a class="navbar-brand" href="/">VideoSharing</a>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        { cookies.TOKEN == null ? null : shareNewVideo }
                        { cookies.TOKEN == null ? null : uploadedVideo }
                    </ul>
                    <span class="navbar-text">
                        { cookies.TOKEN == null ? login : logout }
                    </span>
                </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/AddVideo" element={<AddVideoPage />} />
                <Route path="/ViewVideoPage/:id" element={<ViewVideoPage />} />
                <Route path="/MyUploads/:id" element={<MyUploads />} />
                <Route path="/ViewDetailsPage/:id" element={<ViewDetailsPage />} />
                <Route path="/Logout" element={<LogoutPage />} />
            </Routes>
        </Router>
    );
}

export default App;
