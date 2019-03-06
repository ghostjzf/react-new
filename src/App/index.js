import React, { Component } from "react";
import { Button } from "antd";
import "./style.scss";

class App extends Component {
  render() {
    return (
      <div className="app">
        Welcome To React
        <img
          src="https://webpack.js.org/bf176a25b4f8227fea804854c98dc5e2.png"
          alt="logo"
        />
        <Button type="primary">antd Button</Button>
      </div>
    );
  }
}

export default App;
