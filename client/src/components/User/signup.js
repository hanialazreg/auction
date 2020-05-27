import React from "react";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import signUpService from "../../services/signUpService.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      alert: { state: false, text: "", variant: "" },
      showModal: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    signUpService.getAll(this.state).then((res) => {
      if (res.status === 404) {
        this.setState({
          alert: {
            state: true,
            text: res.data._message || res.data,
            variant: "danger",
          },
        });
      }
      if (res.status === 200) {
        this.setState({
          alert: {
            state: true,
            variant: "success",
            text: "Sign up Successful wait to be reddirected ",
          },
        });
        // this.props.changeUserName(res.data.user._id, res.data.user.name); // res.data is  json ??? problem in the back end i guess

        this.props.handleShow("SignUp");
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      alert: { ...this.state.alert, state: false },
    });
  }

  handleClose() {
    this.setState({ showModal: false });
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
          <div id="dataError"></div>
          <Form.Group controlId="name">
            <Form.Label className="lablsF">Name</Form.Label>
            <Form.Control
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label className="lablsF">Email </Form.Label>
            <Form.Control
              name="email"
              value={this.state.value}
              onChange={this.handleChange}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="lablsF">Password</Form.Label>
            <Form.Control
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            SignUp
          </Button>
        </Form>
      </Modal>
      // </div>
    );
  }
}

export default SignUp;
