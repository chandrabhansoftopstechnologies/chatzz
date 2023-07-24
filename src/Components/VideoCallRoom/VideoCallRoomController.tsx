import { Component } from "react";
import { ZegoUIKitPrebuilt, ZegoUser } from "@zegocloud/zego-uikit-prebuilt";
interface States {}
type Props = { router: any };
export class VideoCallRoomController extends Component<Props, States> {
  myMeeting = async (element: any) => {
    console.log(this.props.router.params.roomId);
    let appID: any = 1197868175;
    let serverSecret: any = "b8a8173e0d0e90ad47a2178e2c68c873";
    let kitToken: any = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      this.props.router.params.roomId,
      Date.now().toString(),
      "Chandrabhan"
    );
    let zp: any = ZegoUIKitPrebuilt.create(kitToken);

    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:3000/startVideoCall/${this.props.router.params.roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showRoomTimer: true,
      onLeaveRoom: (users: ZegoUser[]) => this.props.router.navigate("/"),
    });
  };
}

export default VideoCallRoomController;
