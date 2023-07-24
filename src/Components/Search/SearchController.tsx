import { Component } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase_Setup/Firebase";

interface States {
  username: string;
  actualUser: any;
  error: boolean;
  showSearch: boolean;
}
type Props = {
  router: any;
};
export class SearchController extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      actualUser: null,
      error: false,
      showSearch: false,
    };
  }
  handleSearchUser = async (e: any) => {
    await this.setState({ username: e.target.value }, async () => {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("displayName", "==", this.state.username)
      );
      const querySnapshot = await getDocs(q);
      try {
        querySnapshot.forEach(async (doc) => {
          let userData = await doc.data();

          this.setState({ actualUser: userData }, () => {
            // console.log(this.state.actualUser);
          });
        });
      } catch (error: any) {
        this.setState({ error: true });
      }
    });
  };
  // handleSelectUser = async () => {
  //   // create user chat
  //   try {
  //     const combinedId =
  //       this.props.router.context.uid > this.state.actualUser?.uid
  //         ? this.props.router.context.uid + this.state.actualUser?.uid
  //         : this.state.actualUser?.uid + this.props.router.context.uid;

  //     const res = await getDoc(doc(db, "chats", combinedId));

  //     if (!res.exists()) {
  //       // create new chat
  //       await setDoc(doc(db, "chats", combinedId), { message: [] });

  //       // create use chat
  //       await updateDoc(doc(db, "userChats", this.props.router.context.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: this.state.actualUser?.uid,
  //           displayName: this.state.actualUser?.displayName,
  //           photoURL: this.state.actualUser?.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //       await updateDoc(doc(db, "userChats", this.state.actualUser?.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: this.props.router.context?.uid,
  //           displayName: this.props.router.context.displayName,
  //           photoURL: this.props.router.context.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
  //     console.log("done");
  //     this.setState({ showSearch: false, username: "" });
  //   } catch (error) {
  //     // handle error
  //   }
  // };

  handleSelect = async () => {
    let currentUser = this.props.router.context;
    const combinedId =
      currentUser.uid > this.state.actualUser.uid
        ? currentUser.uid + this.state.actualUser.uid
        : this.state.actualUser.uid + currentUser.uid;
    // console.log("@@@@@combineId",combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: this.state.actualUser.uid,
            displayName: this.state.actualUser.displayName,
            photoURL: this.state.actualUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", this.state.actualUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      this.setState({ actualUser: null, username: "" });
    }

    };
}

export default SearchController;
