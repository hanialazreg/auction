import React from "react";
import logInServices from "../../services/logInservice.js";
import { Button, Form, Modal, Alert } from "react-bootstrap";
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alert: { state: false, text: "", variant: "" },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logIn() {
    logInServices
      .checkForLogIn(this.state)
      .then((res) => {
        // send the user the res.data
        if (res.status === 404) {
          this.setState({
            alert: { state: true, text: res.data, variant: "danger" },
          });
        }
        if (res.status === 200) {
          this.props.changeUserName(res.data.user._id, res.data.user.name);
          window.localStorage.setItem("token", res.data.token);
          this.props.handleShow("Login");
        }
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(e) {
    this.logIn();
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      alert: { ...this.state.alert, state: false },
    });
  }

  render() {
    return (
      <Modal
        className="signup"
        show={this.props.showModal}
        onHide={() => {
          this.props.onHide();
        }}
      >
        <Form onSubmit={this.handleSubmit}>
          <Alert
            variant={this.state.alert.variant}
            show={this.state.alert.state}
          >
            {this.state.alert.text}
          </Alert>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="lablsF">Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="lablsF">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="secondary" type="submit">
              Login
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    );
  }
}
export default LogIn;
