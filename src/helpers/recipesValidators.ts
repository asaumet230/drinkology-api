import { Appetizer } from "../models"


export const isAppetizerValid = async (appetizer: string) => {

    const appetizersdb = await Appetizer.find({ active: true });

    const appetizersNames = appetizersdb.map( appetizer => appetizer.name );

    if(!appetizersNames.includes(appetizer.toLocaleLowerCase())) {
        throw new Error(`Appetizer: ${ appetizer }, doest no exist`);
    }
}