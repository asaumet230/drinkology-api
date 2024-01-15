import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


import { 
    Appetizer, 
    Cocktail, 
    Flavor, 
    Occasion, 
    Role, 
    Spirit, 
    User 
} from '../models';

import { sendError } from '../helpers';

import { 
    appetizersData, 
    cocktailsData, 
    flavorsData, 
    occasionsData, 
    rolesData, 
    spiritsData, 
    usersData 
} from '../utils';



export const seedData = async (req: Request, res: Response) => {

    try {

        await Occasion.deleteMany();
        await Appetizer.deleteMany();
        await Flavor.deleteMany();
        await Spirit.deleteMany();
        await Cocktail.deleteMany();
        // await User.deleteMany();
        // await Role.deleteMany();

        await Occasion.insertMany(occasionsData);
        await Appetizer.insertMany(appetizersData);
        await Flavor.insertMany(flavorsData);
        await Spirit.insertMany(spiritsData);
        await Cocktail.insertMany(cocktailsData);
        // await Role.insertMany(rolesData);

        // const usersWithHashPassword = usersData.map( user => {

        //         const salt = bcrypt.genSaltSync();
                
        //         return {
        //             ...user,
        //             password: bcrypt.hashSync(user.password, salt),
        //         }
        //     }
        // );

        // await User.insertMany(usersWithHashPassword);

        // const occasions = await Occasion.find();
        // const appetizers = await Appetizer.find();
        // const flavors = await Flavor.find();
        // const spirits = await Spirit.find();
        // const users = await User.find();
        // const roles = await Role.find();
        // const cocktails = await Cocktail.find();

        return res.status(200).json({
            ok: true,
            message: 'Seed data added correctly',
            // occasions,
            // appetizers,
            // flavors,
            // spirits,
            // users,
            // roles,
            // cocktails,
        });

    } catch (error) {
        sendError(res, error);
    }
}