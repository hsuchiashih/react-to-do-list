import { Outlet } from "react-router-dom";
import logo from '../../src/assets/logo.png';
import mainPageImg from '../../src/assets/mainPageImg.png';
import '../../src/css/Auth.css';

function Auth() {
  return (
    <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
            <div className="side">
                <a href="#"><img className="logoImg" src={logo} alt=""/></a>
                <img className="d-m-n" src={mainPageImg}  alt="workImg"/>
            </div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Auth