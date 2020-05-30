import React from "react";
import auctionServices from "../../services/auctionServices";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Accordion,
  Alert,
} from "react-bootstrap";
import Countdown from "react-countdown-now";
import openSocket from "socket.io-client";

class Auction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: { participants: [{ user: { name: "" }, date: "" }] },
      auctionPrice: 0,
      history: [{ user: { name: "" }, date: "" }],
      socket: openSocket("http://localhost:5000"),
      timer: true,
      alerShow: false,
    };
    this.state.socket.on("new-auc", (auc) => {
      if (auc._id === this.state.product._id) {
        this.setState({ product: auc, history: auc.participants });
      }
    });
  }

  componentWillReceiveProps(newProps) {
    //console.log(newProps)

    this.setState({
      product: newProps.product,

      history: newProps.product.participants || [],
      userInfo: newProps.userInfo,
      handleShow: newProps.handleShow,
    });
  }

  testLogIn() {
    if (!this.state.userInfo.id || !this.state.userInfo.id) {
      this.state.handleShow("Login");
      return false;
    }
    return true;
  }

  handleAuction(fastAuction) {
    if (this.testLogIn()) {
      var price =
        fastAuction + this.state.product.last_auction_price ||
        this.state.auctionPrice;
      this.setState({ auctionPrice: 0 });

      if (price > this.state.product.last_auction_price) {
        auctionServices
          .updateAuction(
            this.state.product._id,
            price,
            this.props.userInfo.id,
            Date.now()
          )
          .then((res) => {
            this.setState({
              product: res.data,
              history: res.data.participants,
              alerShow: false,
            });
            this.state.socket.emit("new-auc", res.data);
          });
      } else {
        this.setState({
          alerShow: true,
        });
      }
    }
  }

  handletimerComplete() {
    this.setState({
      timer: false,
    });
    if (this.state.product.participants.length > 0) {
      auctionServices.getWinner(this.state.product._id).then((res) => {
        this.setState({
          winer: `Winner :${res.data[0].participants[0].user.name}`,
        });
      });
    } else {
      this.setState({
        winer: "no winner",
      });
    }
  }
  render() {
    return (
      <div>
        <Alert variant="danger" show={this.state.alerShow}>
          Please bet higher than: {this.state.product.last_auction_price}
        </Alert>

        <Card bg="light" className="auction">
          <Card.Body>
            <Card.Title className="text-center">
              <Card.Text>Value {this.state.product.value} DT</Card.Text>
            </Card.Title>

            <Card.Header className="text-center timer">
              {(this.state.timer === true && (
                <Countdown
                  date={new Date(this.state.product.end_date)}
                  onComplete={() => {
                    this.handletimerComplete();
                  }}
                />
              )) || (
                <Card.Text className="text-center">
                  Auction closed{" "}
                  <Row>
                    <Col className="text-center winner">{this.state.winer}</Col>
                  </Row>
                </Card.Text>
              )}
            </Card.Header>
            <br />
            <Row>
              <Col className="text-left auctionPrice">
                <Card.Text>
                  {this.state.product.last_auction_price} DT
                </Card.Text>
              </Col>
              <Col className="text-right">
                {this.state.history[0] !== undefined && (
                  <Card.Text>{this.state.history[0].user.name} </Card.Text>
                )}
              </Col>
            </Row>

            <Row>
              <Col className="text-left">
                <Card.Text>
                  {" "}
                  <small className="text-muted"> Last bet </small>
                </Card.Text>
              </Col>
              <small className="text-muted">
                {this.state.history[0] !== undefined &&
                  new Date(this.state.history[0].date).getFullYear() +
                    "-" +
                    (new Date(this.state.history[0].date).getMonth() + 1) +
                    "-" +
                    new Date(this.state.history[0].date).getDate() +
                    " " +
                    new Date(this.state.history[0].date).getHours() +
                    ":" +
                    new Date(this.state.history[0].date).getMinutes() +
                    ":" +
                    new Date(this.state.history[0].date).getSeconds()}
              </small>
            </Row>

            <Row>
              <Col className="text-center">
                <Card.Text>
                  <small className="text-muted text-center">
                    {" "}
                    administrative fees 10 dt
                  </small>
                </Card.Text>
              </Col>
            </Row>

            <Row>
              <Col className="text-left">
                <Card.Text>Fast auction</Card.Text>
              </Col>
            </Row>

            <Row className="item-left">
              <Col md={2}>
                <Button
                  disabled={!this.state.timer}
                  onClick={() => {
                    this.handleAuction(1);
                  }}
                  variant="warning"
                >
                  <Card.Text>1dt</Card.Text>
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  onClick={() => {
                    this.handleAuction(10);
                  }}
                  variant="warning"
                  disabled={!this.state.timer}
                >
                  <Card.Text>10dt</Card.Text>
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  disabled={!this.state.timer}
                  onClick={() => {
                    this.handleAuction(50);
                  }}
                  variant="warning"
                >
                  <Card.Text>50dt</Card.Text>
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  disabled={!this.state.timer}
                  onClick={() => {
                    this.handleAuction(100);
                  }}
                  variant="warning"
                >
                  <Card.Text>100dt</Card.Text>
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={6}>
                <InputGroup>
                  <Form.Control
                    type="Number"
                    placeholder="0"
                    aria-describedby="dt"
                    min={this.state.product.last_auction_price}
                    value={this.state.auctionPrice}
                    onChange={(e) =>
                      this.setState({ auctionPrice: e.target.value })
                    }
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="dt">DT</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
              <Col>
                {" "}
                <Button
                  disabled={!this.state.timer}
                  onClick={() => this.handleAuction()}
                  variant="success"
                >
                  Auctioning
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Accordion defaultActiveKey="0" className="auctionHistory">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              History of Auctions
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {this.state.history.map((auction) => {
                  return (
                    <Row>
                      <Col className="historyPrice text-left">
                        {auction.price}
                      </Col>
                      <Col>
                        <Row className="text-right">{auction.user.name}</Row>
                        <small>
                          <Row>
                            {new Date(auction.date).getFullYear() +
                              "-" +
                              (new Date(auction.date).getMonth() + 1) +
                              "-" +
                              new Date(auction.date).getDate() +
                              " " +
                              new Date(auction.date).getHours() +
                              ":" +
                              new Date(auction.date).getMinutes() +
                              ":" +
                              new Date(auction.date).getSeconds()}
                          </Row>
                        </small>
                        <br />
                      </Col>
                    </Row>
                  );
                })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
export default Auction;
