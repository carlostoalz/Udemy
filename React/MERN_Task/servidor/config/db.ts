import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

export const conectarDB = async () => {

    try {
        
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        
        console.log('DB Conectada');

    } catch (error) {
        console.log(error);
        process.exit(1); //
    }

}


