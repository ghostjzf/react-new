import React, { Component } from "react";

const withLayout = WrapComponents => {
  return class extends Component {
    render() {
      return <WrapComponents {...this.props} a={2} />;
    }
  };
};

export default withLayout;
