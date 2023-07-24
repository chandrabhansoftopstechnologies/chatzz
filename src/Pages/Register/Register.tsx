import "./Register.css";
import RegisterController from "./RegisterController";
import { Button, Form, Input } from "antd";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { withRouter } from "../../HOC";
export class Register extends RegisterController {
  render() {
    return (
      <div>
        <div className="register-form-container">
          <h1 className="form-heading">Register</h1>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "75%" }}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input autoComplete="" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" autoComplete="" />
            </Form.Item>
            <Form.Item name="profileImg" label="Upload">
              <div>
                <div
                  className="upload-image-input-container"
                  onClick={() => {
                    if (this.upload.current) {
                      this.upload.current.click();
                    }
                  }}
                >
                  <VerticalAlignBottomOutlined style={{ fontSize: "17px" }} />
                  <span>Choose file</span>
                  <input
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="input"
                    style={{ display: "none" }}
                    ref={this.upload}
                    onChange={(e: any) => {
                      this.setState({ file: e.target.files[0] }, () => {
                        // console.log(this.state.file);
                      });
                    }}
                  />
                </div>
                <span>{this.state.file ? this.state.file.name : ""}</span>
              </div>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password autoComplete="" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <p style={{ color: "red" }}>{this.state.error}</p>
              Don't have an account <Link to="/sign-in">Sign-in</Link>
            </Form.Item>
          </Form>
          s
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
