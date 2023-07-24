import "./Chat.css";
import ChatController from "./ChatController";
import {
  MoreOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import { withRouter } from "../../HOC";
import { Modal } from "antd";
export class Chat extends ChatController {
  renderVideoCallModal = () => {
    return (
      <div>
        <div className="videoCallModal-main">
          <Modal
            open={this.state.openVideoCallModal}
            footer={false}
            className="videoCallModal"
            onCancel={this.handleCancel}
            width={900}
          >
            <div className="videoCallModal-main-container">
              <h1>Start Video Call</h1>
              <input
                type="text"
                value={this.props.router.User.user.displayName}
                readOnly
              />
              <button
                className="videoCallModal-join-btn"
                onClick={this.handleStartVideoCall}
              >
                Start
              </button>
            </div>
            {/* <div ref={this.myMeeting}></div> */}
          </Modal>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="chat">
          {this.props.router.User.user.photoURL !== undefined ? (
            <div>
              <div className="chat-info">
                <div className="chat-user-details">
                  <img src={this.props.router.User.user.photoURL} alt="" />
                  <span className="chat-username">
                    {this.props.router.User.user.displayName}
                  </span>
                </div>

                <div className="chat-icons">
                  <VideoCameraOutlined
                    className="chat-icon"
                    onClick={() => {
                      this.setState({ openVideoCallModal: true });
                    }}
                  />
                  {this.renderVideoCallModal()}
                  <UserAddOutlined className="chat-icon" />
                  <MoreOutlined className="chat-icon" />
                </div>
              </div>
              <Messages />
              <Input />
            </div>
          ) : (
            <div className="empty-box">
              <WechatOutlined className="empty-chat-icon" />
              <h1>Chatzz</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Chat);
