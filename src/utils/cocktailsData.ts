import { ICocktail } from "../interfaces";


export const cocktailsData: ICocktail[] = [
    {
        title: "paradise made with gin",
        review: 3.67,
        reviewValues: [
            4.5,
            3.5,
            3
        ],
        active: true,
        slug: "paradise-made-with-gin",
        history: "the paradise cocktail has its origins in the early years of cocktail crafting, emerging around the 1920s in new york city. it is believed to have been created during prohibition to mask the taste of bootleg gin.",
        tools: [
            {
                name: "shaker",
                brand: "boston shaker",
                features: "known for its secure seal and durability.",
                attributes: "sturdy construction with a classic design.",
                link: "/",
            },
            {
                name: "jigger",
                brand: "oxo steel angled measuring jigger",
                features: "precision and ease of reading.",
                attributes: "ergonomic design with clear measurement markings.",
                link: "/",
            },
            {
                name: "mixing spoon",
                brand: "hiware telescopic spoon",
                features: "adjustable length and ergonomic handling.",
                attributes: "stainless steel with an elegant twist handle.",
                link: "/",
            }
        ],
        ingredients: [
            "gin (such as tanqueray or beefeater, 40-47% alcohol content)",
            "apricot juice (natural and organic brands preferred)",
            "orange juice (freshly squeezed)",
            "ice"
        ],
        calories: "150 calories",
        quantity: "120 ml",
        glass: "cocktail or martini glass",
        instructions: [
            "chill the cocktail glass in the freezer.",
            "pour gin, apricot juice, and orange juice into the shaker.",
            "add ice and shake vigorously until cold to the touch.",
            "strain into the chilled glass and garnish with a slice of orange or apricot."
        ],
        recommendations: [
            {
                name: "french 75",
                description: "a refreshing cocktail combining gin with champagne, lemon, and simple syrup.",
                link: "/",
            },
            {
                name: "clover club",
                description: "an elegant cocktail with gin, dry vermouth, lemon juice, and raspberry.",
                link: "/",
            }
        ],
        images: [
            "https://res.cloudinary.com/du6kucdgb/image/upload/v1676759146/samples/nomad/no-photo_b4nvhq.jpg"
        ],
        tags: [
            "#paradisecocktail",
            "#gincocktails",
            "#classicmixology",
            "#cocktailrecipes",
            "#homebartending",
            "y"
        ],
        video: "",
        flavor: "sweet",
        spirits: [
            "gin"
        ],
        occasions: [
            "brunch",
            "aperitif and digestif",
            "spring",
            "summer"
        ],
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
        ],
    }

];