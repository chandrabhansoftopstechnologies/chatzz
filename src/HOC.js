import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "./Context/UserContext";
import { useContext } from "react";
import { ChatContext } from "./Context/ChatContext";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    let location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const { data } = useContext(ChatContext);
    const context = currentUser;
    const Dispatch = dispatch;
    const User = data;
    return (
      <Component
        router={{ location, navigate, params, context, Dispatch, User }}
        {...props}
      />
    );
  };

  return Wrapper;
};
