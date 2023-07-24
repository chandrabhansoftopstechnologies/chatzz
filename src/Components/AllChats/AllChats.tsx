import "./AllChats.css";
import AllChatsController from "./AllChatsController";
import { withRouter } from "../../HOC";
export class AllChats extends AllChatsController {
  render() {
    return (
      <div>
        <div className="all-chats">
          {Object.entries(this.state.chats)
            ?.sort((a: any, b: any) => b[1].date - a[1].date)
            .map((chat: any, index: number) => {
              return (
                <div
                  className="user-chat"
                  key={index}
                  onClick={() => this.handleSelect(chat[1].userInfo)}
                >
                  <img src={chat[1]?.userInfo?.photoURL} alt="" />
                  <div className="all-user-chat-info">
                    <span>{chat[1]?.userInfo?.displayName}</span>
                    <div className="lastMsg-time-container">
                      <p>{chat[1].lastMessage?.message}</p>
                      <p>{this.convertTime(chat[1].date)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default withRouter(AllChats);
