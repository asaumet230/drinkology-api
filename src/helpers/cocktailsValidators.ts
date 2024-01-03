import { Flavor, Occasion, Spirit } from '../models';

export const reviewValidator = async ( value: number ) => {

    if( value < 0 || value > 5 ) {
        throw new Error(`The review value range must be between 1 to 5`);   
    }
}

export const limitValidator = async (limit: string) => {

    if( Number(limit) < 1 || Number(limit) > 50 ) {
        throw new Error('The limit range must be between 1 to 50');
    }
}

export const pageValidator = async (page: string) => {

    if( Number(page) < 1 ) {
        throw new Error('Page must be greater or equal to 1');
    }
}

export const flavorValidator = async ( flavor: string ) => {

    const flavorDb = await Flavor.findOne({ name: flavor.trim().toLocaleLowerCase() });
    
    if(!flavorDb) {
        throw new Error(`Wrong flavor: ${flavor}`);   
    }
}

export const spiritsValidator = async ( spirits: string[] ) => {

    const spiritsDb = await Spirit.find({ active: true }); 

    const spiritsNames = spiritsDb.map( spirit => spirit.name );
    
    for (const spirit of spirits ) {

        if(!spiritsNames.includes(spirit.toLocaleLowerCase().trim())) {
            throw new Error(`Wrong spirit name: ${spirit}`);   
        }   
    }
}

export const occasionsValidator = async ( occasions: string[] ) => {

    const occasionsDb = await Occasion.find({ active: true }); 

    const occasionsNames = occasionsDb.map( occasion => occasion.name );
    
    for (const occasion of occasions ) {

        if(!occasionsNames.includes(occasion.toLocaleLowerCase())) {
            throw new Error(`Wrong occasion name: ${occasion}`);   
        }   
    }
}

