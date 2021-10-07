import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { QuestionDetailsView } from 'src/app/Models/questionDetailsView';
import { UserProfile } from 'src/app/Models/userProfile';
import { View } from 'src/app/Models/View';
import { Vote } from 'src/app/Models/vote';
import { DatetimeService } from 'src/app/services/datetime.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styles: [
  ]
})
export class QuestionsComponent implements OnInit {

  @Input() questions : QuestionDetailsView[] = [];
  @Output() selectedQuestionId = new EventEmitter<string>();
  intiailQuestionId : number = -1;

  user! : UserProfile;
  userVotes : Array<number> = [];
  view! : View;
  constructor(private datetimeService : DatetimeService,
    private userService : UserService
    ,private httpservice : HttpService) { }

  ngOnInit(): void {
    
  }

  

  ngOnChanges(changes: SimpleChanges): void 
  {
    // console.log(changes);
    this.questions = (changes.questions.currentValue);
    this.questions.forEach((x) => {
      x.questionTime =  this.datetimeService.dateDiff(new Date(x.createdOn),new Date());
    });
    // console.log("in questions component method : ",this.questions);  

    this.userService.getcurrentUser().subscribe(res => {
      this.userService.currentUser = res;
      this.user = res;
      this.userVotes = [];
      this.user.questionsVoted.forEach(x => {
        if(x.isVoted)
        {
          this.userVotes.push(x.questionId);
        }
      });
      // console.log("user votes in starting are : ",this.userVotes);
    });
  }  

  selectQuestion(id : number,index:number)
  {
    if(id == this.intiailQuestionId)
    {
      return;
    }
    this.user = this.userService.currentUser;
    this.selectedQuestionId.emit(""+id);
    this.intiailQuestionId = id;
    // console.log("emitting value - from questionlist component - ",id);
    this.addView(id,index);
  }

  addView(questionId : number,index:number)
  {
    this.view = {
      id : 0,
      questionId : questionId,
      userId : ""+this.user.id,
      createdOn : new Date()
    }
    // console.log("view is after clicking - ",this.view);
    this.httpservice.addView(this.view)
    .subscribe(res => {
      if(res)
      {
        this.questions[index].views++;
      }
    });

  }

  addVote(questionId : number,index : number,val : boolean = true)
  {
    if(this.questions[index].userId == this.user.id)
    {
      console.log("user can't vote his own question");
      return;
    }
    let vote : Vote = {
      id : 0,
      questionId : questionId,
      isVoted : val,
      userId : ""+this.user.id
    };

    // console.log("Vote is ",vote);

    this.httpservice.addVote(vote)
    .subscribe(res => {
      if(res)
      {
        res.questionTime = this.datetimeService.dateDiff(new Date(res.createdOn),new Date());
        this.questions[index] = res;
        console.log("res is ",res," questions list is ",this.questions);
        let hasUserLiked = this.userVotes.indexOf(res.id);
        if(hasUserLiked != -1)
        {
          this.userVotes.splice(hasUserLiked,1);
        }
        else
        {
          this.userVotes.push(res.id);
        }
        // console.log("user votes list : ",this.userVotes);
      }
    });
  }


}
