import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const uri = process.env.MONGO_URL

const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    return data
  } catch (err) {
    // console.log('e', err)
    return err
  }
}

export default connectDatabase
