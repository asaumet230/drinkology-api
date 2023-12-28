import mongoose from 'mongoose';


interface Props {
    socketTimeoutMS    : number;
}

const dataBaseOptions: Props = {
    socketTimeoutMS   : 3000,
}

export const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_CNN || '', dataBaseOptions );
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


export default dbConnection;