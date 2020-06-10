import axios from "axios";

export default {
  updateAuction: (id, price, idUser, date) => {
    return axios
      .put("/api/updateAuction", {
        date: date,
        id: id,
        price: price,
        idUser: idUser,
      })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  getWinner: (idProduct) => {
    return axios
      .get("/api/getwinner", { params: { id: idProduct } })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  //nb of auction that a user participate
  getAuctionsByUser: (userid) => {
    return axios
      .get("/api/getauctionsByUser", { params: { id: userid } })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
};
