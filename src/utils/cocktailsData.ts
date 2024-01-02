import { ICocktail } from "../interfaces";


export const cocktailsData: ICocktail[] = [
    {
        title: "Paradise made with Gin",
        review: 0,
        slug: "paradise-made-with-gin",
        history: "This exquisite cocktail, known as 'Paradise,' first came to life in the 1930s. It was crafted by the renowned bartender Harry Craddock at the famous Savoy Hotel in London. The exact date of its creation is November 29, 1933. Craddock was a visionary mixologist who left a lasting mark on the cocktail scene. The 'Paradise' originated as an elegant variation of the classic 'Bronx' cocktail, highlighting artistic creation at the heart of mixology.",
        tools: [
            {
                name: "Citrus Juicer",
                brand: "Cucisina",
                features: "Efficiently extracts citrus juice.",
                attributes: "Ergonomic handle, pulp filter, easy to clean.",
                link : "/"
            },
            {
                name: "Boston Shaker",
                brand: "Barfly",
                features: "Uniformly mixes ingredients.",
                attributes: "Stainless steel, tight-fitting lid, elegant design.",
                link : "/"
            },
            {
                name: "Hawthorne Strainer",
                brand: "OXO",
                features: "Strains ice and pulp when serving the cocktail.",
                attributes: "Tight spring, versatile design.",
                link : "/"
            }
        ],
        ingredients: [
            "2 oz premium gin (Beefeater or Tanqueray)",
            "1 oz orange liqueur (Cointreau)",
            "3/4 oz dry vermouth (Noilly Prat)",
            "Orange peel for garnish"
        ],
        instructions: [
            "In the shaker, combine gin, orange liqueur, and dry vermouth.",
            "Add ice and shake vigorously for 15 seconds.",
            "Strain the mixture into a pre-chilled martini glass.",
            "Garnish with a thin strip of orange peel, expressing oils over the cocktail."
        ],
        recommendations: [
            {
                name: "Twisted Citrus",
                description: "A refreshing variation of 'Paradise' with an additional citrusy twist, using lemon instead of orange.",
                link : "/"
            },
            {
                name: "Berry Bliss",
                description: "Experiment with a fruity version by adding a few fresh blueberries to the mix.",
                link : "/"
            }
        ],
        images: [
            "https://res.cloudinary.com/du6kucdgb/image/upload/v1676759146/samples/nomad/no-photo_b4nvhq.jpg"
        ],
        tags: [
            "Paradise",
            "gin",
            "classic cocktail",
            "Harry Craddock",
            "Savoy Hotel",
            "mixology"
        ],
        video:"",
        flavor: "Sweet",
        spirits: [
            "Gin"
        ],
        occasions: [
            "New Year's Eve",
            "Valentine's Day",
            "Summer Night",
            "Aperitif"
        ],
        seo: {
            title: "Discover the Timeless Charm of Paradise: Gin Cocktail",
            description: "Embark on a flavor journey with Paradise, a classic cocktail created by Harry Craddock. Learn how to make it with our step-by-step guide. Immerse yourself in the magic of mixology!",
            author: "Andres Saumet",
            keywords: [
                "Paradise",
                "Gin Cocktail",
                "Harry Craddock",
                "Mixology",
                "Classic Cocktail"
            ]
        },
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            }
        ],
    }
    
];