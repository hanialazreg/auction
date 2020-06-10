import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import categoryService from "../../services/categoryService";
import auctionServices from "../../services/auctionServices";
class Users extends React.Component {
  constructor(props) {
    super(props);
    console.log("prrrrrop", props);
    this.state = {
      nbauction: 0,
    };
  }
  componentDidMount() {
    auctionServices.getAuctionsByUser(this.props.userInfo.id).then((res) => {
      this.setState({
        nbauction: res.data,
      });
      console.log("nbaaaaaauction", res.data);
    });
  }

  render() {
    return (
      <div>
        <InputGroup className="userInfo">
          <InputGroup>
            <InputGroup.Text> User Name </InputGroup.Text>
            <InputGroup>{this.props.userInfo.name}</InputGroup>
          </InputGroup>

          <InputGroup>
            <InputGroup.Text> Number of oction partitication </InputGroup.Text>
          </InputGroup>
          <InputGroup>
            <InputGroup.Text> winned Auctions </InputGroup.Text>
          </InputGroup>
        </InputGroup>
      </div>
    );
  }
}
export default Users;
