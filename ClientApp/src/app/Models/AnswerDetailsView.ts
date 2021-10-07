export interface AnswerDetailsView{
    id : number
    questionId : number
    createdOn : Date
    description : string
    isBestSolution : boolean 
    likes : number
    dislikes : number
    userId  : string
    imageUrl  : string
    name  : string
    answerTime : string
}