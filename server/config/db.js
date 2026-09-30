import mongoose from 'mongoose'

const ConnectDb = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_DB_URI)

    console.log(`MongoDB Connected: ${response.connection.host}`)
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`)
  }
}

export default ConnectDb