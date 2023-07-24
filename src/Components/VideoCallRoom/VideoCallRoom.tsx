import { withRouter } from "../../HOC";
import VideoCallRoomController from "./VideoCallRoomController";

export class VideoCallRoom extends VideoCallRoomController {
  render() {
    return <div ref={this.myMeeting}>zrxhjbknltrfghvjbknlm</div>;
  }
}

export default withRouter(VideoCallRoom);
