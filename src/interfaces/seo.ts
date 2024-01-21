import { Types } from 'mongoose';

import { IRecord } from './';

export interface ISeo {
    title            : string,           // title | og:title | twitter:title
    active           : boolean,
    description      : string,           // description | og:description
    canonical        : string,           // canonical "URL"    
    robots           : boolean,          // fallow - no fallow
    tags?            : string[],         // article:tag cuerpo triángulo inverso famosas
    post?            : Types.ObjectId,
    appetizer?       : Types.ObjectId,
    flavor?          : Types.ObjectId,
    occasion?        : Types.ObjectId,
    cocktail?        : Types.ObjectId,
    recipe?          : Types.ObjectId,
    tag?             : Types.ObjectId,
    category?        : Types.ObjectId,
    user             : Types.ObjectId,
    socialMediaTags? : SocialMediaTags,
    record           : IRecord[] | [],
    createdAt?       : Date,             // article:published_times
    updatedAt?       : Date,             // article:modified_time
}

export interface SocialMediaTags {
    locale    : string,     // og:locale "es_ES"
    type      : string,     // og:type
    url       : string,     // og:url
    siteName  : string,     // og:site_name "CHILO | Tienda de ropa para mujer precios increíbles"
    publisher : string,     // article:publisher "https://www.facebook.com/chilostore/"
    image     : string,     // og:image | twitter:image
    author    : string,     // author "Andres Felipe Saumet"
    creator   : string,     // twitter:creator "@chilostore"
    site      : string,     // twitter:site "@chilostore"
    keywords  : string[],
}

export default ISeo;

// twitter:card summary_large_image 