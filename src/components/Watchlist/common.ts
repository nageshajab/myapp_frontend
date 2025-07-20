export function getStatus(status:number){
    switch(status){
        case 0:
            return "NotStarted";
        case 1:
            return "InProgress";
        case 2:
            return "Completed";
        case 3:
            return "Cancelled";
        default:
            return "Unknown";
    }
}

export function getType(type:number){
    switch(type){
        case 0:
            return "Movie";
        case 1:
            return "WebSeries";
        case 2:
            return "Documentary";
        case 3:
            return "Other";
        default:
            return "Unknown";
    }
}

export function getLanguage(language:number){
    switch(language){
        case 0:
            return "English";
        case 1:
            return "Hindi";
        case 2:
            return "Tamil";
        case 3:
            return "Malyalam";
        case 4:
            return "Marathi";        
        case 5:
            return "Other";
        default:
            return "Unknown";
    }
}

export function getGenre(genre:number){
    switch(genre){
        case 0:
            return "Action";
        case 1:
            return "Comedy";
        case 2:
            return "Drama";
        case 3:
            return "Horror";
        case 4:
            return "Thriller";        
        case 5:
            return "Romance";
        case 6:
            return "SciFi";
        case 7:
            return "Documentary";
        default:
            return "Other";
    }
}
export function getRating(rating:number){
    switch(rating){
        case 0:
            return "*";
        case 1:
            return "**";
        case 2:
            return "***";
        case 3:
            return "****";
        case 4:
            return "*****";        
    }
}
export function getOtt(ott:number){
    switch(ott){
        case 0:
            return "Netflix";
        case 1:
            return "*Prime";
        case 2:
            return "Hotstar";
        case 3:
            return "SonyLiv";
        case 4:
            return "Zee5";        
        case 5:
            return "YouTube";
        case 6:
            return "Other";        
    }
}