
export interface Question {
     id : number;
     headline: string;
     description: string;
     isSolved: boolean ;
     createdOn : Date;
     userId: string;
     categoryId: number;
}