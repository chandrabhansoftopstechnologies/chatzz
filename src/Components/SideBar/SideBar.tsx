import React, { Component } from "react";
import "./SideBar.css";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import AllChats from "../AllChats/AllChats";
export class SideBar extends Component {
  render() {
    return (
      <div>
        <div className="sidebar">
          <Navbar />
          <Search />
          <AllChats />
        </div>
      </div>
    );
  }
}

export default SideBar;
