import React, { Component } from "react";
import "./Home.css";
import { Col, Row } from "antd";
import SideBar from "../../Components/SideBar/SideBar";
import Chat from "../../Components/Chat/Chat";
export class Home extends Component {
  render() {
    return (
      <div className="home-main">
        <Row>
          <Col lg={8} md={8} sm={8} xs={8}>
            <SideBar />
          </Col>
          <Col lg={16} md={16} sm={16} xs={16}>
            <div style={{ height: "100vh" }}>
              <Chat />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
