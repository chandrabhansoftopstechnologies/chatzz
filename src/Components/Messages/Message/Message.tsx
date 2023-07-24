import "./Message.css";
import { withRouter } from "../../../HOC";
import MessageController from "./MessageController";

export class Message extends MessageController {
  render() {
    // console.log("props");

    return (
      <div>
        <div
          className={
            this.message.senderId === this.currentUser.uid
              ? " owner-message"
              : "message"
          }
          id={this.index === this.lastIndex ? "last-message" : ""}
        >
          <div className="message-info">
            <img
              src={
                this.message.senderId === this.currentUser.uid
                  ? this.currentUser.photoURL
                  : this.data.user.photoURL
              }
              alt=""
            />
            <span>Just now</span>
          </div>

          {this.message.message !== "" && this.message.image !== null ? (
            <div className="message-content owner-message-content message-content-with-imgText">
              {this.message.image && (
                <img
                  className="image-with-imgText"
                  src={this.message.image}
                  alt=""
                />
              )}
              {this.message.message === "" ? (
                ""
              ) : (
                <p className="para1 para-owner para-with-imgText">
                  {this.message.message}
                </p>
              )}
            </div>
          ) : (
            <div className="message-content owner-message-content">
              {this.message.message === "" ? (
                ""
              ) : (
                <p className="para1 para-owner ">{this.message.message}</p>
              )}

              {this.message.image && <img src={this.message.image} alt="" />}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Message);
