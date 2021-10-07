import { AnswerDetailsView } from "./AnswerDetailsView";
import { Category } from "./category";
import { UserDetailsView } from "./userDetailsView";

export interface QuestionProfile{
    id : number
    views : number
    createdOn : Date
    votes : number
    numberOfAnswers : number
    headline : string
    description : string
    user : UserDetailsView
    isSolved : boolean 
    category : Category 
    answers : Array<AnswerDetailsView> 
    questionTime : string;
    
}