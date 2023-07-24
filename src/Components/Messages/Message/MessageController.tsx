import React, { createRef } from "react";

type Props = {
  message: any;
  index: any;
  lastIndex: any;
  router: any;
};
export class MessageController extends React.Component<Props, {}> {
  data = this.props.router.User;
  currentUser = this.props.router.context;
  index = this.props.index;
  lastIndex = this.props.lastIndex;
  message = this.props.message;
  ref = createRef<HTMLDivElement>();

  componentDidMount(): void {
    // console.log(this.message);

    this.scrollToLastMessage();
    this.ref.current?.scrollIntoView({ behavior: "smooth" });
  }
  scrollToLastMessage = () => {
    let lastMessage = document.getElementById("last-message");
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "auto" });
     
    }
  };
}

export default MessageController;
