import { Flavor, Occasion, Spirit } from '../models';

export const reviewValidator = async ( value: number ) => {

    if(value < 0) {
        throw new Error(`the value: ${value} must be greater or equal to zero`);   
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

