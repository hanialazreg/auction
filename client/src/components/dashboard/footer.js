import React, { Component } from "react";

export default class footer extends Component {
  render() {
    return (
      <footer class="main-footer">
        <strong>
          Copyright &copy; 2014-2019{" "}
          <a href="http://adminlte.io">Hania Lazreg</a>.
        </strong>
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.0.5
        </div>
      </footer>
    );
  }
}
