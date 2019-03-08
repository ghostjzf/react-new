import React, { Component } from "react";
import { Button } from "antd";
import withLayout from "../utils/withLayout";
import Title from "components/Title";
import "./style.scss";

@withLayout
class App extends Component {
  render() {
    return (
      <div className="app">
        Welcome To Use React!
        <img
          src="https://webpack.js.org/bf176a25b4f8227fea804854c98dc5e2.png"
          alt="logo"
        />
        <Title />
        <h3>{this.props.a}</h3>
        <Button type="primary">antd Button</Button>
      </div>
    );
  }
}

export default App;
