import React, { Component } from "react";
import Charts from "./charts";
import Menu from "./menu";
import Header from "./header";
import Footer from "./footer";

export default class Collect extends Component {
  render() {
    return (
      <div>
        <div class="wrapper">
          <Header />
          <Charts />
          <Menu />
          <Footer />
        </div>
      </div>
    );
  }
}
