import { signInWithEmailAndPassword } from "firebase/auth";
import { Component } from "react";
import { auth } from "../../Firebase_Setup/Firebase";

interface States {}
type Props = {
  router: any;
};
export class LoginController extends Component<Props, States> {
  onFinish = async (values: any) => {
    const email = values.email;
    const password = values.password;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.props.router.navigate("/");
    } catch (error: any) {
      this.setState({
        error: error,
      });
    }
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
}

export default LoginController;
