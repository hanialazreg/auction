import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import productService from "../../services/productService.js";
import categoryService from "../../services/categoryService.js";
import AddCategory from "../category/AddCategory";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descreption: "",
      image: "",
      images: "",
      category: "",
      value: "",
      initial_date: "",
      end_date: "",
      itemsCategory: [],

      show: false,
      setImage: [],
      loading: false,
      setLoading: false,
    };

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.handleGetAllCategories();
  }

  handleGetAllCategories() {
    categoryService.getAllCategories().then((res) => {
      this.setState({
        itemsCategory: res.data,
      });
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    productService
      .add(this.state)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("myErr", err);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeEndDate(e) {
    this.setState({
      end_date: e.target.value,
      // duration:
      //   new Date(e.target.value).getTime() -
      //   new Date(this.state.initial_date).getTime()
    });
  }

  hundleChangeCategory(e) {
    e.preventDefault();
    this.setState({
      category: e.target.value,
    });
  }

  showModalCategory() {
    this.setState({
      show: true,
    });
  }
  onHideCategory() {
    this.setState({
      show: false,
    });
    this.handleGetAllCategories();
  }
  hundeluploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "load_test");
    this.setState({ setLoading: true });

    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dxgzln4cr/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("reeeeeeeeeeeeeees", file);
    this.setState({ setImage: file.secure_url, setLoading: false });
    console.log("imaaageurl", this.state.setImage);
  };
  render() {
    return (
      <div className="addProduct">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <AddCategory
            showModal={this.state.show}
            onHide={() => this.onHideCategory()}
          ></AddCategory>

          <Form.Group controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={this.state.name}
              onChange={(e) => {
                this.onChange(e);
              }}
              name="name"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="descreption"
              placeholder="Product Description"
              value={this.state.descreption}
              onChange={(e) => {
                this.onChange(e);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridPriceValue">
            <Form.Label>Price Value</Form.Label>
            <Form.Control
              placeholder="Product Price"
              name="value"
              type="number"
              value={this.state.value}
              onChange={(e) => {
                this.onChange(e);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridStartDate">
            <Form.Label>Start Date</Form.Label>
            {/* <DatePicker selected={new Date()}></DatePicker> */}
            <input
              type="datetime-local"
              name="initial_date"
              onChange={(e) => {
                this.onChange(e);
              }}
            />
            {/* <Form.Control name="initial_date" type="date" value={this.state.initial_date} onChange={(e) => { this.onChange(e) }} /> */}
          </Form.Group>
          <Form.Group controlId="formGridStartDate">
            <Form.Label>End Date</Form.Label>
            {/* <DatePicker selected={new Date()}></DatePicker> */}
            <input
              type="datetime-local"
              name="end_date"
              onChange={(e) => {
                this.onChangeEndDate(e);
              }}
            />
            {/* <Form.Control name="initial_date" type="date" value={this.state.initial_date} onChange={(e) => { this.onChange(e) }} /> */}
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              type="text"
              value={this.state.image}
              onChange={(e) => {
                this.onChange(e);
              }}
              placeholder="image"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlImages">
            <Form.Label>Images</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="images"
              placeholder="Other images"
              value={this.state.images}
              onChange={(e) => {
                this.onChange(e);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <InputGroup>
              <Form.Control
                aria-describedby="basic-addon1"
                as="select"
                onChange={(e) => {
                  this.hundleChangeCategory(e);
                }}
              >
                <option>Choose...</option>
                {this.state.itemsCategory.map((cat) => {
                  return <option value={cat._id}>{cat.name}</option>;
                })}
              </Form.Control>
              <InputGroup.Append>
                <Button
                  onClick={() => this.showModalCategory()}
                  variant="outline-secondary"
                >
                  Add Category
                </Button>
              </InputGroup.Append>
              {/* <Button variant="primary" onClick={() => this.showModalCategory()} >	Add Category		</Button> */}
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
        <input
          type="file"
          name="test cloudinary"
          onChange={(e) => {
            this.hundeluploadImage(e);
          }}
        />
      </div>
    );
  }
}

export default AddProduct;
