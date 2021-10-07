export interface QuestionDetailsView{
    id : number,
    views : number,
    createdOn : Date
    votes : number
    numberOfAnswers : number
    headline : string
    description : string
    userId : string
    userImage : string
    userName : string
    isSolved : boolean
    categoryId : number
    categoryName : string
    categoryDescription : string;
    questionTime : string;
}