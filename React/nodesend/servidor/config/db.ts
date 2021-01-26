import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
    path: 'variables.env'
});

export const conectarDB = async () => {
    try {
        await connect( <string>process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log('Hubo un error', error);
        process.exit(500);
    }
};
