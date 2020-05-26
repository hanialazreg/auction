import React from "react";

import { Button, Form, Alert, Modal } from "react-bootstrap";
import productService from "../../services/productService";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import { FormControl } from "react-bootstrap";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      text: "",
    };
  }
  componentDidMount() {}

  onChange(e) {
    this.setState({
      text: e.target.value,
    });
  }
  // hundleGetAllCategories() {
  //     categoryService.getAllCategories().then(res => {
  //         this.setState({
  //             categoryList: res.data
  //         });
  //     });
  // }

  filterProduct(e) {
    e.preventDefault();
    if (this.state.text !== "") {
      productService.search(this.state.text).then((res) => {
        console.log(res.data);
        if (res.data.length !== 0) this.props.onClick(res.data);
      });
    }
  }

  render() {
    return (
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          required
          onChange={(e) => {
            this.onChange(e);
          }}
        />
        <Button
          className="btn_search"
          variant="outline-secondary"
          onClick={(e) => this.filterProduct(e)}
        >
          Search
        </Button>
      </Form>
    );
  }
}
export default Search;
