import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Component, createRef } from "react";
import { db, storage } from "../../Firebase_Setup/Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { EmojiClickData } from "emoji-picker-react";

interface States {
  text: any;
  image: any;
  status: boolean;
  showEmojiPanel: boolean;
  chosenEmoji: any;
}
type Props = {
  router: any;
};
export class InputController extends Component<Props, States> {
  upload = createRef<HTMLInputElement>();
  constructor(props: Props) {
    super(props);
    this.state = {
      text: "",
      image: null,
      status: false,
      showEmojiPanel: false,
      chosenEmoji: null,
    };
  }
  handleEmoji = () => {
    this.setState({ showEmojiPanel: !this.state.showEmojiPanel });
  };
  onEmojiClick = (emojiObject: EmojiClickData) => {
    const { emoji } = emojiObject;
    this.setState({ chosenEmoji: emoji });
    this.setState((prevState) => ({
      text: prevState.text + emoji,
    }));
  };

  getSearchStatus = (status: any) => {
    this.setState({ status: status });
  };

  handleImageClick = () => {
    if (this.upload.current) {
      this.upload.current.click();
    } else {
    }
  };

  handleImageOnchange = (e: any) => {
    // console.log(e.target.files?.[0]);
    this.setState({ image: e.target.files[0] }, () => {
      console.log("@@imag", this.state.image);
    });
  };
  handleSendMessage = async () => {
    const currentUser = this.props.router.context;
    const data = this.props.router.User;
    const message = this.state.text;
    const image = this.state.image;

    if (this.state.image !== null && this.state.text !== "") {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                message: message,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
      // this.setState({ text: "", image: null });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          message: message,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        message: message,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        message: message,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    this.setState({ text: "", image: null });
  };
}

export default InputController;
