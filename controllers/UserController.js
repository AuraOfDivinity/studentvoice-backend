const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const User = require("../models/UserModel");

function UserData(data) {
  this.id = data._id;
  this.firstName = data.firstName;
  this.lastName = data.lastName;
  this.email = data.email;
}

exports.getUser = [
  auth,
  function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.successResponseWithData(res, "Operation success", {});
    }
    try {
      User.findOne({ _id: req.params.id }).then((user) => {
        if (user !== null) {
          let userData = new UserData(user);
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            userData
          );
        } else {
          return apiResponse.notFoundResponse(
            res,
            "No user was found with the given ID"
          );
        }
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
