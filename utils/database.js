import mongoose from 'mongoose';

let isConnected = false;

export const connectToDb = () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Db is already connected')
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbNmae: '',
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        isConnected = true;
    } catch (error) {

        console.log(error)
    }
}
