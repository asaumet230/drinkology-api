import { IRecipe } from '../interfaces';

export const recipesData: IRecipe[] = [
    {
        title: "Crunchy Jalapeño Poppers with Creamy Cheese Filling",
        review: 4.8,
        reviewValues: [
            4.5,
            5,
            4.7,
            4.9,
        ],
        active: true,
        slug: "crunchy-jalapeno-poppers-creamy-cheese",
        description: "This Jalapeño Poppers recipe features fresh jalapeños filled with a smooth blend of cheeses and spices, breaded and fried to a golden, crunchy finish.",
        history: "Jalapeño Poppers are rooted in Tex-Mex cuisine, gaining popularity in the 1970s and 1980s in the Southwest United States. Their exact origin is unknown, but they epitomize the cultural and culinary fusion of the area.",
        tools: [
            {
                name: "Deep Fryer",
                brand: "T-fal",
                features: "Adjustable thermostat, oil filtration system",
                attributes: "16 x 13.5 x 11 inches; 8.6 pounds",
                link: "https://www.amazon.com/T-fal-Fryer-Cooker-Basket-Stainless/dp/B00NQ7QFGM"
            },
            {
                name: "Slotted Spoon",
                brand: "OXO Good Grips",
                features: "Perfect for removing poppers from hot oil, draining excess",
                attributes: "Ergonomic handle, heat-resistant, 14 inches in length",
                link: "https://www.amazon.com/OXO-Grips-Non-Stick-Slotted-Spoon/dp/B00PCI72IU"
            }
        ],
        ingredients: [
            "Fresh jalapeños",
            "Philadelphia Cream Cheese",
            "Kraft shredded cheddar cheese",
            "Panko breadcrumbs",
            "Organic free-range eggs",
            "Various spices (paprika, garlic powder, etc.)",
            "Local brand cooking oil with nutritional information"
        ],
        calories: "150 calories per popper",
        quantity: "500 grams",
        servings: "20 servings",
        servingSuggestions: [
            "Ritz soda crackers",
            "Ranch dressing",
            "Coleslaw",
            "Chilled craft beer"
        ],
        preparationTime: "20 minutes",
        cookingTime: "10 minutes",
        instructions: [
            "Slice and deseed jalapeños.",
            "Mix cheeses for filling.",
            "Prepare the breading by mixing breadcrumbs with spices.",
            "Dip stuffed jalapeños in beaten eggs, then coat with breading.",
            "Fry in preheated oil until golden brown."
        ],
        tips: [
            "Freeze the poppers before frying to keep the cheese from oozing out.",
            "Wear gloves when handling jalapeños to avoid skin irritation.",
            "Serve immediately after frying for best taste.",
            "For a healthier version, try baking instead of frying."
        ],
        images: [
            "https://res.cloudinary.com/du6kucdgb/image/upload/v1676759146/samples/nomad/no-photo_b4nvhq.jpg"
        ],
        recommendations: [
            {
                name: "Mini Chicken Tacos",
                description: "An easy-to-eat appetizer with shredded chicken and Mexican spices on mini corn tortillas.",
                link: "/"
            },
            {
                name: "Spinach and Artichoke Dip",
                description: "A creamy, rich dip perfect for spreading on toast or fresh veggies.",
                link: "/"
            }
        ],
        tags: [
            "Jalapeño Poppers",
            "Appetizers",
            "Easy Recipes",
            "TexMexCuisine",
            "Party Food",
            "Spicy"
        ],
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        appetizer: "Antipasto",
        occasions: [
            "Fourth of July",
            "Birthday",
        ],
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
        ],
    }
    
]