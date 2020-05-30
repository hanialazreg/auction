import React from "react";

import productServices from "../../services/productService";
import queryString from "query-string";
import { Row, Col, Carousel, Container, Card } from "react-bootstrap";

import Auction from "./Auction";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    const { id } = queryString.parse(window.location.search);
    productServices.getOne(id).then((res) => {
      this.setState({
        product: res.data,
      });
      console.log("product", res.data);
    });
  }

  render() {
    return (
      <div>
        <Row className="containerProduct">
          <Col>
            <div className="slides">
              <Carousel>
                {this.state.product.images !== undefined &&
                  this.state.product.images.map((image) => (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={image}
                        alt="First slide"
                      />
                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            <Row>
              <Card.Text className="productTitle px-5">
                {this.state.product.descreption}
              </Card.Text>
            </Row>
          </Col>
          <Auction
            userInfo={this.props.userInfo}
            product={this.state.product}
            handleShow={this.props.handleShow}
          ></Auction>
        </Row>
      </div>
    );
  }
}
export default Product;
