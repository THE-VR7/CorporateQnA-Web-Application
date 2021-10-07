import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../Models/question';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryProfile } from '../Models/categoryProfile';
import { Category } from '../Models/category';
import { QuestionDetailsView } from '../Models/questionDetailsView';
import { QuestionProfile } from '../Models/questionProfile';
import { Answer } from '../Models/Answer';
import { UserDetailsView } from '../Models/userDetailsView';
import { View } from '../Models/View';
import { UserProfile } from '../Models/userProfile';
import { Like } from '../Models/like';
import { Vote } from '../Models/vote';
import { Report } from '../Models/report';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  route: string = 'http://localhost:5000/api';

  constructor(private httpService: HttpClient) { }

  private messageSource = new BehaviorSubject<number>(-1);
  questionId = this.messageSource.asObservable();

  refreshQuestion(questionId : number)
  {
    this.messageSource.next(questionId);
  }

  // Question Method
  addQuestion(question : Question):Observable<boolean>{
		return this.httpService.post<boolean>(this.route+'/question/addQuestion', question);
  }

  addView(view : View)
  {
    return this.httpService.post<boolean>(this.route+'/question/addView', view);
  }

  addVote(vote : Vote)
  {
    return this.httpService.post<QuestionDetailsView>(this.route+'/question/addVote',vote);
  }

  reportQuestion(report : Report)
  {
    return this.httpService.post<QuestionDetailsView>(this.route+'/question/reportQuestion',report);
  }

  getQuestions() : Observable<QuestionDetailsView[]>
  {
    return this.httpService.get<QuestionDetailsView[]>(this.route+'/question/getQuestions');
  }

  questionWithAnswersById(questionId : any) : Observable<QuestionProfile>
  {
    return this.httpService.get<QuestionProfile>(this.route+'/question/'+parseInt(questionId));
  }

  questionSolved(question : Question)
  {
    return this.httpService.post<boolean>(this.route+'/question/questionStatus',question);
  } 
  
  // Categories methods
  getCategories(): Observable<Category[]> {
		return this.httpService.get<Category[]>(this.route + '/category/GetCategories');
	}
  
  getCategoriesDetail(): Observable<CategoryProfile[]> {
		return this.httpService.get<CategoryProfile[]>(this.route + '/category/GetCategoriesDetails');
	}

	addCategory(category:Category):Observable<number>{
		return this.httpService.post<number>(this.route+'/category/addCategory',category);
	}

  // Answers Method
  addAnswer(answer : Answer) : Observable<boolean>
  {
    return this.httpService.post<boolean>(this.route+'/answer/add',answer);
  }

  likeAnswer(like : Like) : Observable<boolean>
  {
    return this.httpService.post<boolean>(this.route+'/answer/like',like);
  }
  
  dislikeAnswer(dislike : Like) : Observable<boolean>
  {
    return this.httpService.post<boolean>(this.route+'/answer/dislike',dislike);
  }

  markBestSolution(answerId : number) : Observable<Boolean>
  {
    return this.httpService.post<boolean>(this.route+'/answer/bestSolution',answerId);
  }

  // Users Method 
  getUserViewById(id : string) : Observable<UserDetailsView>
  {
    return this.httpService.get<UserDetailsView>(this.route+'/user/userView/'+id);
  }

  getUserProfileById(id : string) : Observable<UserProfile>
  {
    return this.httpService.get<UserProfile>(this.route+'/user/userProfile/'+id);
  }

  getUsersDetails() : Observable<UserDetailsView[]>
  {
    return this.httpService.get<UserDetailsView[]>(this.route+'/user/all/');
  }
  

}
