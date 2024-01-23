import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


import { 
    Appetizer, 
    Category, 
    Cocktail, 
    Flavor, 
    Occasion, 
    Post, 
    Recipe, 
    Role, 
    Spirit, 
    Tag, 
    User 
} from '../models';

import { sendError } from '../helpers';

import { 
    appetizersData, 
    categoriesData, 
    cocktailsData, 
    flavorsData, 
    occasionsData, 
    postsData, 
    recipesData, 
    rolesData, 
    spiritsData, 
    tagsData, 
    usersData 
} from '../utils';



export const seedData = async (req: Request, res: Response) => {

    try {

        await Occasion.deleteMany();
        await Appetizer.deleteMany();
        await Flavor.deleteMany();
        await Spirit.deleteMany();
        await Cocktail.deleteMany();
        await Recipe.deleteMany();
        await Role.deleteMany();
        await Tag.deleteMany();
        await Category.deleteMany();
        await Post.deleteMany();
        // await User.deleteMany();

        await Occasion.insertMany(occasionsData);
        await Appetizer.insertMany(appetizersData);
        await Flavor.insertMany(flavorsData);
        await Spirit.insertMany(spiritsData);
        await Cocktail.insertMany(cocktailsData);
        await Recipe.insertMany(recipesData);
        await Role.insertMany(rolesData);
        await Tag.insertMany(tagsData);
        await Category.insertMany(categoriesData);
        await Post.insertMany(postsData);

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
            // tags,
        });

    } catch (error) {
        sendError(res, error);
    }
}