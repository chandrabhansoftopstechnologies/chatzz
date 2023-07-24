import { Component, createRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { auth, storage, db } from "../../Firebase_Setup/Firebase";
interface States {
  error: string;
  file: any;
}
type Props = {
  router: any;
};
export class RegisterController extends Component<Props, States> {
  upload = createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      error: "",
      file: "",
    };
  }
  handleImageChoose = () => {};

  onFinish = async (values: any) => {
    const displayName = values.name;
    const email = values.email;
    const password = values.password;
    const file = this.state.file;

    try {
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Create a unique image name
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // /////
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
          // this.setState({ error: error });
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Add a new document in collection "cities"
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            this.props.router.navigate("/");
          });
        }
      );
      // /////
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

export default RegisterController;
