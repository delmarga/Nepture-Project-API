const db = require("./index");

module.exports = {
  // List All Users
  getUsers() {
    return db.select().from("users").orderBy("id");
  },
  // Get User By Id
  getUser(id) {
    return db("users").where("id", id).first();
  },
  // Delete User by Id
  deleteUser(id) {
    return db("users").where("id", id).del();
  },
};
