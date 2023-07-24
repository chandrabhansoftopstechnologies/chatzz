import "./Login.css";
import { Button, Form, Input } from "antd";
import LoginController from "./LoginController";
import { Link } from "react-router-dom";
import { withRouter } from "../../HOC";
export class Login extends LoginController {
  render() {
    return (
      <div>
        <div className="login-form-container">
          <h1 className="form-heading">Login</h1>

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
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Form.Item name="sign-in" wrapperCol={{ offset: 8, span: 16 }}>
                Don't have an account <Link to="/sign-up">Sign-up</Link>
              </Form.Item>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
