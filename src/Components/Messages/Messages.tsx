import "./Messages.css";
import Message from "./Message/Message";
import MessagesController from "./MessagesController";
import { withRouter } from "../../HOC";
export class Messages extends MessagesController {
  render() {
    return (
      <div>
        <div className="messages">
          {this.state.messages.map((message: any, index: number) => {
            return (
              <div key={index}>
                <Message
                  message={message}
                  key={message.id}
                  index={index}
                  lastIndex={this.state.messages.length - 1}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Messages);
