import "./Input.css";
import { FileImageOutlined, SendOutlined } from "@ant-design/icons";
import InputController from "./InputController";
import { withRouter } from "../../HOC";
import EmojiIcon from "../../Assets/icons8-grinning-face-with-big-eyes-96.png";
import Picker from "emoji-picker-react";
export class Input extends InputController {
  render() {
    return (
      <div className="input-parent-main">
        {this.state.image !== null ? (
          <div className="image-container">
            <img src={URL.createObjectURL(this.state.image)} alt="" />
          </div>
        ) : (
          ""
        )}
        {this.state.showEmojiPanel ? (
          <div>
            {/* @ts-ignore */}
            <Picker onEmojiClick={this.onEmojiClick} />
          </div>
        ) : (
          ""
        )}
        <div className="input-main">
          <input
            value={this.state.text}
            type="text"
            placeholder="Enter your message"
            onChange={(e) => this.setState({ text: e.target.value })}
          />
          <div className="input-icons-container">
            <div className="img-send-container">
              <img
                src={EmojiIcon}
                alt=""
                className="smile-icon"
                onClick={this.handleEmoji}
              />
              <FileImageOutlined
                onClick={this.handleImageClick}
                className="input-icons"
              />
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
                style={{ display: "none" }}
                ref={this.upload}
                onChange={this.handleImageOnchange}
                // @ts-ignore
                // onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
            </div>
            <SendOutlined
              className="input-icons send-icon"
              onClick={this.handleSendMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Input);
