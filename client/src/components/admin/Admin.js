import React from "react";
import {
  Button,
  Form,
  Card,
  Table,
  Row,
  Col,
  Accordion,
} from "react-bootstrap";
import AddProduct from "../Product/addProduct.js";
import serviceProduct from "../../services/productService.js";
import adminServices from "./../../services/adminServices.js";
import AllWinner from "./allwinner";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      render: <h1> you really shouldn't be here </h1>,
    };
  }
  checkauth(id) {
    //call function from the admin service to check if can enter this page
    adminServices
      .checkIfAdmin(id)
      .then((res) => {
        console.log("aaaddddddd", res);
        if (res === true) {
          this.setState({
            render: (
              <div>
                <Row>
                  <Col>
                    <div id="addProduct">
                      <AddProduct />
                    </div>
                  </Col>

                  <Col>
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey="0"
                          >
                            <center>
                              <h1>Closed Auctions</h1>
                            </center>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <AllWinner></AllWinner>
                        </Accordion.Collapse>
                      </Card>

                      <Card>
                        <Card.Header>
                          <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey="1"
                          >
                            <center>
                              <h1>Current Auctions</h1>
                            </center>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                          <div id="productTable">
                            <center>
                              <h1>Current Auctions </h1>
                            </center>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Name</th>
                                  <th>Initial Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.products.map((product) => {
                                  return (
                                    <tr>
                                      <td>{product._id}</td>
                                      <td>{product.name}</td>
                                      <td>{product.initial_date}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </Col>
                </Row>
              </div>
            ),
          });
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.checkauth(this.props.userInfo.id);
    serviceProduct
      .getAll()
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return <React.Fragment>{this.state.render}</React.Fragment>;
  }
}
export default Admin;
