import React from "react";

import { Button, Form, Alert, Modal } from "react-bootstrap";
import categoryService from "../../services/categoryService.js";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";

class NavCategory extends React.Component {
  constructor(props) {
    super(props);
    console.log("prooops", props);
    this.state = {
      categoryList: [],
      bool: false,
    };
  }
  componentDidMount() {
    this.hundleGetAllCategories();
  }
  hundleGetAllCategories() {
    categoryService.getAllCategories().then((res) => {
      this.setState({
        categoryList: res.data,
      });
    });
  }

  handleClickCategory(category) {
    categoryService.displayByCategory(category).then((res) => {
      console.log("res caaaaaaaaaat", res);
      this.props.onClick(res.data);
    });
  }

  render() {
    return (
      // <div className='navcategory'>
      //   <Nav >
      //     <Navbar.Brand>Categories</Navbar.Brand>
      //     {this.state.categoryList.map((cat) => {

      //       return (
      //         <Nav.Item>
      //           <Nav.Link to="/"
      //             onClick={e => {
      //               this.handleClickCategory(cat.name);
      //             }}>{cat.name}
      //           </Nav.Link>
      //         </Nav.Item>
      //       )
      //     })
      //     }
      //   </Nav>
      // </div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Categories</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {this.state.categoryList.map((cat) => {
              return (
                <Nav.Link>
                  <Link
                    className="text-decoration-none text-white"
                    to="/"
                    onClick={(e) => {
                      this.handleClickCategory(cat.name);
                    }}
                  >
                    {cat.name}
                  </Link>
                </Nav.Link>
              );
            })}
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
      </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>

      // <div className='navcategory'>
      //   {/* navbar category change the sticky top */}
      //   <Navbar sticky="top">
      //     <Navbar.Brand>Category</Navbar.Brand>
      //     <Nav className="mr-auto ">
      //       <div className='link' >
      //         {this.state.categoryList.map(cat => {
      //           return (
      //             <div >
      //               <Link className='link'
      //                 to="/"
      //                 onClick={e => {
      //                   this.handleClickCategory(cat.name);
      //                 }}
      //               >
      //                 {cat.name}
      //               </Link>
      //             </div>
      //           );
      //         })}</div>
      //     </Nav>
      //   </Navbar>
      // </div>
    );
  }
}

export default NavCategory;
//
