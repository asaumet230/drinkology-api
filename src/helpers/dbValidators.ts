import { 
    Appetizer, 
    Cocktail, 
    Comment, 
    Flavor, 
    Occasion, 
    Recipe, 
    Role, 
    Spirit, 
    User 
} from '../models'


export const appetizerExist = async (id: string) => {

    const appetizer = await Appetizer.findById({ _id: id });

    if(!appetizer || !appetizer.active) {
        throw new Error(`The appetizer with id: ${id} don't exist`);   
    }
}


export const roleExist = async (id: string) => {

    const role = await Role.findById({ _id: id });

    if(!role || !role.active) {
        throw new Error(`The role with id: ${id} don't exist`);   
    }
}

export const userExist = async (id: string) => {

    const user = await User.findById({ _id: id });

    if(!user || !user.active) {
        throw new Error(`The user with id: ${id} don't exist`);   
    }
}

export const spiritExist = async (id: string) => {

    const spirit = await Spirit.findById({ _id: id });

    if(!spirit || !spirit.active) {
        throw new Error(`The Spirit with id: ${id} don't exist`);   
    }
}

export const flavorExist = async (id: string) => {

    const flavor = await Flavor.findById({ _id: id });

    if(!flavor || !flavor.active) {
        throw new Error(`The Flavor with id: ${id} don't exist`);   
    }
}

export const occasionExist = async (id: string) => {

    const occasion = await Occasion.findById({ _id: id });

    if(!occasion || !occasion.active) {
        throw new Error(`The Occasion with id: ${id} don't exist`);   
    }
}

export const cocktailExist = async (id: string) => {

    const cocktail = await Cocktail.findById({ _id: id });

    if(!cocktail || !cocktail.active) {
        throw new Error(`The Cocktail with id: ${id} don't exist`);   
    }
}

export const commentExist = async (id: string) => {

    const comment = await Comment.findById({ _id: id });

    if(!comment || !comment.active) {
        throw new Error(`The Comment with id: ${id} don't exist`);   
    }
}

export const recipeExist = async (id: string) => {

    const recipe = await Recipe.findById({ _id: id });

    if(!recipe || !recipe.active) {
        throw new Error(`The Recipe with id: ${id} don't exist`);   
    }
}

export const isRoleValid = async (role: string) => {

    const roleDb = await Role.findOne({ name: role.toLocaleLowerCase() });

    if(!roleDb || !roleDb.active ) {
        throw new Error(`The role: ${role} is not valid`);   
    }
}
