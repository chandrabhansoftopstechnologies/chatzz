import { Component } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase_Setup/Firebase";
interface States {
  chats: any;
}
type Props = {
  router: any;
};
export class AllChatsController extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chats: [],
    };
  }
  componentDidMount(): void {
    let currentUser = this.props.router.context;
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        let newData = doc.data();

        this.setState({ chats: newData }, () => {
          // console.log("@@@ all chats", Object.entries(this.state.chats));
        });
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }
  handleSelect = (user: any) => {
    const dispatch = this.props.router.Dispatch;
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  convertTime = (time: any) => {
    let timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(time?.seconds * 1000);

    let timeString1 = date.toLocaleString("en-US", timeOptions);
    return timeString1;
  };
}

export default AllChatsController;
