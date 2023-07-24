import { doc, onSnapshot } from "firebase/firestore";
import React, { Component } from "react";
import { db } from "../../Firebase_Setup/Firebase";

interface States {
  messages: any;
}
type Props = {
  router: any;
};
export class MessagesController extends Component<Props, States> {
  containerRef = React.createRef<HTMLDivElement>();
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount(): void {
    
    // let currentUser = this.props.router.context;
    const getMessages = () => {
      const unSub = onSnapshot(
        doc(db, "chats", this.props.router.User.chatId),
        (doc) => {
          doc.exists() &&
            this.setState({ messages: doc.data().messages }, () => {
              //  console.log("message is",this.state.messages);
            });
        }
      );
      return () => {
        unSub();
      };
    };

    this.props.router.User.chatId && getMessages();
  }
}

export default MessagesController;
