import React, { Component } from "react";

const withLayout = WrapComponents => {
  return class extends Component {
    render() {
      return <WrapComponents {...this.props} a={1} />;
    }
  };
};

export default withLayout;
