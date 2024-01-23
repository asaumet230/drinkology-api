import { 
    Appetizer, 
    Category, 
    Cocktail, 
    Comment, 
    Flavor, 
    Occasion, 
    Post, 
    Recipe, 
    Role, 
    Seo, 
    Spirit, 
    Tag, 
    User 
} from '../models'


export const appetizerExist = async (id: string) => {

    const appetizer = await Appetizer.findById({ _id: id });

    if(!appetizer || !appetizer.active) {
        throw new Error(`The appetizer with id: ${id} doest not exist`);   
    }
}


export const roleExist = async (id: string) => {

    const role = await Role.findById({ _id: id });

    if(!role || !role.active) {
        throw new Error(`The role with id: ${id} doest not exist`);   
    }
}

export const userExist = async (id: string) => {

    const user = await User.findById({ _id: id });

    if(!user || !user.active) {
        throw new Error(`The user with id: ${id} doest not exist`);   
    }
}

export const spiritExist = async (id: string) => {

    const spirit = await Spirit.findById({ _id: id });

    if(!spirit || !spirit.active) {
        throw new Error(`The Spirit with id: ${id} doest not exist`);   
    }
}

export const flavorExist = async (id: string) => {

    const flavor = await Flavor.findById({ _id: id });

    if(!flavor || !flavor.active) {
        throw new Error(`The Flavor with id: ${id} doest not exist`);   
    }
}

export const occasionExist = async (id: string) => {

    const occasion = await Occasion.findById({ _id: id });

    if(!occasion || !occasion.active) {
        throw new Error(`The Occasion with id: ${id} doest not exist`);   
    }
}

export const cocktailExist = async (id: string) => {

    const cocktail = await Cocktail.findById({ _id: id });

    if(!cocktail || !cocktail.active) {
        throw new Error(`The Cocktail with id: ${id} doest not exist`);   
    }
}

export const commentExist = async (id: string) => {

    const comment = await Comment.findById({ _id: id });

    if(!comment) {
        throw new Error(`The Comment with id: ${id} doest not exist`);   
    }
}

export const recipeExist = async (id: string) => {

    const recipe = await Recipe.findById({ _id: id });

    if(!recipe || !recipe.active) {
        throw new Error(`The Recipe with id: ${id} doest not exist`);   
    }
}

export const seoExist = async (id: string) => {

    const seo = await Seo.findById({ _id: id });

    if(!seo || !seo.active) {
        throw new Error(`The Seo description with id: ${id} doest not exist`);   
    }
}

export const tagExist = async (id: string) => {

    const tag = await Tag.findById({ _id: id });

    if(!tag || !tag.active) {
        throw new Error(`The Tag with id: ${id} doest not exist`);   
    }
}

export const categoryExist = async (id: string) => {

    const category = await Category.findById({ _id: id });

    if(!category || !category.active) {
        throw new Error(`The category with id: ${id} doest not exist`);   
    }
}

export const postExist = async (id: string) => {

    const post = await Post.findById({ _id: id });

    if(!post || !post.active) {
        throw new Error(`The post with id: ${id} doest not exist`);   
    }
}

export const isRoleValid = async (role: string) => {

    const roleDb = await Role.findOne({ name: role.toLocaleLowerCase() });

    if(!roleDb || !roleDb.active ) {
        throw new Error(`The role: ${role} is not valid`);   
    }
}

export const isCanonicalValid = async (canonical: string) => {

    const seo = await Seo.findOne({ canonical, active: true });

    if(seo) {
        throw new Error(`The Seo description with canonical: ${canonical} already exist`);   
    }
}
export const isCategoryValid = async (category: string) => {

    const categorydb = await Category.findOne({ name: category, active: true });

    if(!categorydb) {
        throw new Error(`The Category: ${category}, doest not exist`);   
    }
}

export const tagsValidator = async ( tags: string[] ) => {

    const tagsDb = await Tag.find({ active: true }); 

    const tagsNames = tagsDb.map( tag => tag.name );
    
    for ( const tag of tags ) {

        if(!tagsNames.includes(tag.toLocaleLowerCase())) {
            throw new Error(`Wrong tag name: ${tag}`);   
        }   
    }
}

export const isPostValid = async (slug: string) => {

    const postdb = await Post.findOne({ slug, active: true });

    if(!postdb) {
        throw new Error(`The post with: ${slug}, doest not exist`);   
    }
}
