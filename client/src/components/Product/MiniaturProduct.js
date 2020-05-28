import React from "react";
import ReactDOM from "react-dom";

import { Card, Button, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown-now";

class MiniaturProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this.props.product.initil_date).getTime() +
      timer: new Date(this.props.product.end_date),
    };
  }

  // componentDidMount() {
  //   // console.log(new Date(this.props.product.initial_date).getTime())
  //   console.log(Date.now())
  //   console.log(new Date('2020-01-11T21:12:00.000+0000').getTime())
  // }
  render() {
    return (
      <div onClick={this.props.onClick}>
        <Card bg="light" className="mProduct">
          <Card.Img
            className="minImage"
            variant="top"
            src={this.props.product.image}
          />
          {/*dimension photo   288x176*/}
          <Card.Body>
            <Card.Title className="minTitle">
              {this.props.product.name}
            </Card.Title>
            <Card.Text className="cardTextM">
              {this.props.product.descreption}
            </Card.Text>
            <Row>
              <Col xs={12} md={7} className="timer">
                {" "}
                <Countdown date={this.state.timer} />
              </Col>
              {/* xs={6} */}
              <Col md={5} className="auctionPrice text-right">
                {this.props.product.last_auction_price}
              </Col>
            </Row>
            <Row>
              {/* md={{ span: 4, offset: 8 }} */}
              <Col className="price text-right">
                value:{this.props.product.value}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default MiniaturProduct;
