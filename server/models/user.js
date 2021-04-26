import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: String,
  joinedCummunities: Array
})

const Users = mongoose.model('Users', userSchema, 'Users');
export default Users;