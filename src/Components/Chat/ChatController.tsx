import { Component } from "react";

interface States {
  openVideoCallModal: boolean;
  roomId: string;
}
type Props = {
  router: any;
};
export class ChatController extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openVideoCallModal: false,
      roomId: "",
    };
  }

  handleVideoCall = () => {
    this.setState({ openVideoCallModal: !this.state.openVideoCallModal });
  };
  handleCancel = () => {
    this.setState({ openVideoCallModal: !this.state.openVideoCallModal });
  };
  handleStartVideoCall = () => {
    this.props.router.navigate(
      `/startVideoCall/${this.props.router.User.user.displayName}`
    );
  };
}

export default ChatController;
