import { exception } from "console";

export class CouldNotFindMovieError extends Error{
    
    constructor(message?: string){
        super(message);
    }


}
