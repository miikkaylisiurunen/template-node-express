import mongoose from 'mongoose';

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => {
      console.log('MongoDB connection successful');
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  console.log('No MongoDB uri provided');
}
