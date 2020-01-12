import React from "react";
import MiniaturProduct from "./Product/MiniaturProduct";
import Product from "./Product/Product";
import AddProduct from "./Product/addProduct";
import productServices from "../services/productService";
import { Button, Form, Card, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    productServices.getAll().then(res => {
      this.setState({
        products: res.data
      });
    });
  }

  render() {
    return (
      <Container className="home">
        {this.state.products.map(product => {
          return (
            // <MiniaturProduct product={product} />
            <Link to={`/Product?id=${product._id}`}>
              {" "}
              <MiniaturProduct product={product} />{" "}
            </Link>
          );
        })}
        <AddProduct />
      </Container>
    );
  }
}

export default Home;
