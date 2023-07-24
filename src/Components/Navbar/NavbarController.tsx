import { Component } from "react";

interface States {
  user: any;
}
type Props = {
  router: any;
};
export class NavbarController extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: "",
    };
  }
  async componentDidMount() {
    this.setState({ user: this.props.router.context }, () => {
      // console.log(this.state.user.photoURL);
    });
  }
}

export default NavbarController;
