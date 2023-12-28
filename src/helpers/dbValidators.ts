import { Appetizer, Flavor, Role, Spirit, User } from '../models'


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

export const isRoleValid = async (role: string) => {

    const roleDb = await Role.findOne({ name: role.toLocaleLowerCase() });

    if(!roleDb || !roleDb.active ) {
        throw new Error(`The role: ${role} is not valid`);   
    }
}