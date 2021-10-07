import { AnswerDetailsView } from "./AnswerDetailsView";
import { Like } from "./like";
import { QuestionDetailsView } from "./questionDetailsView";
import { Report } from "./report";
import { Vote } from "./vote";

export interface UserProfile{
    id : string          
    name : string
    designation : string 
    imageUrl : string 
    questionsAsked : number 
    questionsAnswered: number
    questionsSolved : number
    likes : number
    dislikes : number
    answeredQuestions : Array<QuestionDetailsView> 
    questions : Array<QuestionDetailsView>
    answersLiked  : Array<Like>
    questionsReported  : Array<Report>
    questionsVoted  : Array<Vote>
}