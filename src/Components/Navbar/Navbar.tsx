import "./Navbar.css";
// import UserImg from "../../Assets/user.jpg";
import { auth } from "../../Firebase_Setup/Firebase";
import { signOut } from "firebase/auth";
import NavbarController from "./NavbarController";
import { withRouter } from "../../HOC";
import { PoweroffOutlined } from "@ant-design/icons";
export class Navbar extends NavbarController {
  render() {
    return (
      <div>
        <div className="navbar">
          <span className="logo"> Chatzz</span>
          <div className="user">
            <img src={this.state.user?.photoURL} alt="" />
            <span>{this.state.user.displayName}</span>
            <span className="logout-btn" onClick={() => signOut(auth)}>
              <PoweroffOutlined />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
