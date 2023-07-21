import mongoose from 'mongoose' // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  type_id: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
  },
  special_price: {
    price: String,
    price_from: String,
    price_to: String,
  },
  images: [
    {
      url: String,
    },
  ],
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  ratings: [
    {
      star: Number,
      comment: String,
    },
  ],
  brand: {
    type: String,
    required: true,
  },
  categories: [
    {
      id: String,
      is_active: Boolean,
      name: String,
      path: String,
      level: String,
      parent_id: String,
    },
  ],
})

//Export the model
module.exports = mongoose.model('User', userSchema)
