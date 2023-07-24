import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { getMessaging, getToken } from "firebase/messaging";
import { withRouter } from "./HOC";
import { AuthContext } from "./Context/UserContext";
import VideoCallRoom from "./Components/VideoCallRoom/VideoCallRoom";
import { ToastContainer, toast } from "react-toastify";
import {
  Timestamp,
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, onMessageListener } from "./Firebase_Setup/Firebase";
import { uuid } from "uuidv4";

function App(props: any) {
  const { currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  // console.log(show);

  const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    // console.log("gfhjkhgfd");

    if (!currentUser) {
      console.log("asdfasdf");

      return <Navigate to="/sign-in" />;
    } else {
      return <>{children}</>; // Wrap children with fragment or a container element
    }
  };
  const messaging = getMessaging();

  useEffect(() => {
    RequestPermission();
    Listener();
  }, []);
  const RequestPermission = async () => {
    await Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        alert("Notification permission granted.");
        getToken(messaging, {
          vapidKey:
            "BAJlr105fHZlRShGHNmoaBA47PB1XQgJW0tCtX688eQRhOaj9q58LPbjag5NN1HVCRvKEAJt1YCMDCQ65QlPe10",
        })
          .then(async (currentToken: any) => {
            console.log(currentToken);
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...

              await setDoc(doc(db, "users", props.router.User.chatId), {
                token: currentToken,
              });
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
              // ...
            }
          })
          .catch((err: any) => {
            console.log(
              "An error occurred while retrieving token. ",
              err.message
            );
            // ...
          });
      } else if (permission === "denied") {
        console.log("Notification permission denied");
      }
    });
  };
  const Listener = () => {
    onMessageListener()
      .then((payload) => {
        setShow(true);
        let ms: any = {
          title: payload.notification.title,
          body: payload.notification.body,
        };

        toast.success(ms);
        console.log(payload);
      })
      .catch((err) => console.log("failed: ", err));
  };
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/startVideoCall/:roomId" element={<VideoCallRoom />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </div>
  );
}

export default withRouter(App);
