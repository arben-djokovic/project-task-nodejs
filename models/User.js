const db = require('../data/database');
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

class User {
  constructor(username, password, id) {
    this.password = password;
    this.username = username;
    this.id = id;
  }

  static async login(username, password){
    const user = await db
      .getDb()
      .collection("users")
      .findOne({ username: username})
            
    if(user){
        const isPasswordGood = await bcrypt.compare(password, user.password)
        if(!isPasswordGood){
            return {error: [{message: "Incorrect password!"}]}
        }
        const token = await jwt.sign({ username: username }, process.env.secret_key)
        return {token: token}
    }else{
        return {error: [{message: "User not found!"}]}
    }
  }

  static async signup(username, password) {
    const existed = await this.getUserByUsername(username)
    if (existed) {
      return { error: [{ msg: "User with that name exist in out database" }] };
    }
    const hashedPassword = bcrypt.hashSync(password, 12)
    await db.getDb().collection("users").insertOne({
      username: username,
      password: hashedPassword,
    });
    const token = await jwt.sign({ username: username }, process.env.secret_key)
    return {token: token}
  }

  static async getUserByUsername(username){
    const user = await db
      .getDb()
      .collection("users")
      .findOne({ username: username})
    return user
  }
}

module.exports = User;