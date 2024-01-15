import { Appetizer } from "../models"


export const isAppetizerValid = async (appetizer: string) => {

    const appetizerdb = await Appetizer.findOne({ name: appetizer.toLocaleLowerCase().trim(),  active: true });

    if(!appetizerdb) {
        throw new Error(`Wrong appetizer: ${appetizer}`);   
    }
}