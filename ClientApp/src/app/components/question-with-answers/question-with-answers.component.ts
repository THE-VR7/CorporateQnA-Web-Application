import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Answer } from 'src/app/Models/Answer';
import { QuestionProfile } from 'src/app/Models/questionProfile';
import { UserProfile } from 'src/app/Models/userProfile';
import { DatetimeService } from 'src/app/services/datetime.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Icons } from 'src/app/shared/icons';
import { Like } from 'src/app/Models/like';
import { Question } from 'src/app/Models/question';
import { Report } from 'src/app/Models/report';

@Component({
  selector: 'app-question-with-answers',
  templateUrl: './question-with-answers.component.html',
  styles: [
  ]
})
export class QuestionWithAnswersComponent implements OnInit,OnChanges {
  @Input() questionId : string = "-1";
  questionProfile! : QuestionProfile;

  answerForm!: FormGroup;
  expand: boolean = false;

  user! : UserProfile;

  icons: Icons = new Icons;
	editor: Editor = new Editor;
	
  toolbar: Toolbar = [
		['bold', 'italic', 'underline'],
		['ordered_list', 'bullet_list'],
		['blockquote', 'link']
	];
	html = 'Enter Your Answer Here';
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};

  answersLiked : Array<number> = [];
  answersDisliked : Array<number> = [];
  questionReported : Array<number> = [];
  

  constructor(private httpservice : HttpService,
    private userService : UserService
    ,private toastr: ToastrService,private datetimeService : DatetimeService) { }

  

  ngOnInit(): void {
    this.editor = new Editor({
			content: ``,
			enabled: true,
			history: true,
			keyboardShortcuts: true
		});

		this.answerForm = new FormGroup({
			'editorContent': new FormControl('')
		});

    this.user = this.userService.currentUser;
  }

  ngOnChanges(changes: SimpleChanges): void 
  {
    // console.log("in app answer with questions - ",);
    this.questionId = changes.questionId.currentValue;
    this.getQuestionWithAnswers();
    this.answersLiked = [];
    this.answersDisliked = [];
    this.userService.getcurrentUser().subscribe(res => {
      this.user = res;
      this.userService.currentUser = res;
      this.user.answersLiked.forEach((x) => {
        if(x.isLiked)
          this.answersLiked.push(x.answerId);
        if(x.isDisliked)
        this.answersDisliked.push(x.answerId);
      });
      this.questionReported = [];
      this.user.questionsReported.forEach(q => {
        if(q.isReported)
        {
          this.questionReported.push(q.id);
        }
      });
    });

  }  

  getQuestionWithAnswers()
  {
    this.httpservice.questionWithAnswersById(this.questionId)
    .subscribe(
      res => {
        this.questionProfile = res;
        this.questionProfile.questionTime = this.datetimeService.dateDiff(new Date( this.questionProfile.createdOn),new Date());
        this.questionProfile.answers.forEach((x) => {
          x.answerTime =  this.datetimeService.dateDiff(new Date(x.createdOn),new Date());
        });
        console.log("selected question by Id is ",this.questionProfile);
      }
    );
  }

  addAnswer()
  {
    let answer : Answer = {
      id : 0,
      questionId : parseInt(this.questionId),
      description : this.answerForm.value.editorContent,
      userId : ""+this.user.id,
      isBestSolution : false,
      createdOn : new Date()
    };

    console.log("on sumission of answer :",answer);

    this.httpservice.addAnswer(answer)
    .subscribe(
      res => {
        if(res)
        {
          this.answerForm.reset();
          this.editor.setContent('');
          this.toastr.success("Answer Added", "Successfully")
          this.getQuestionWithAnswers();
          this.httpservice.refreshQuestion(this.questionProfile.id);
        }
      }
    )
  }

  expandEditor(){
		this.expand=!this.expand;
	}


  likeAnswer(val : boolean,index : number)
  {
    // if(this.user.id == this.questionProfile.answers[index].userId)
    // {
    //   return;
    // }

    var like : Like = {
      id : 0,
      answerId : this.questionProfile.answers[index].id,
      userId : ""+this.user.id,
      isLiked : val,
      isDisliked : false 
    }

    let ansIndex = this.checkIfUserDisliked(like.answerId);
    if(ansIndex != -1 && val )
    {
      this.answersDisliked.splice(ansIndex,1);
      this.questionProfile.answers[index].dislikes--;
    }

    this.httpservice.likeAnswer(like)
    .subscribe(res => {
      
      if(val)
      {
        this.questionProfile.answers[index].likes++;
        this.answersLiked.push(this.questionProfile.answers[index].id);
      }
      else
      {
        this.questionProfile.answers[index].likes--;
        var ind  = this.answersLiked.indexOf(this.questionProfile.answers[index].id);
        if(ind != -1)
        {
          this.answersLiked.splice(ind,1);
        }
      }
    });
  }

  dislikeAnswer(val : boolean,index : number)
  {
    if(this.user.id == this.questionProfile.answers[index].userId)
    {
      return;
    }
    var dislike : Like = {
      id : 0,
      answerId : this.questionProfile.answers[index].id,
      userId : ""+this.user.id,
      isLiked : false,
      isDisliked : val 
    };

    let ansIndex = this.checkIfUserLiked(dislike.answerId);
    if(ansIndex != -1 && val )
    {
      this.answersLiked.splice(ansIndex,1);
      this.questionProfile.answers[index].likes--;
    }

    this.httpservice.dislikeAnswer(dislike)
    .subscribe(res => {
      if(val)
      {
        this.questionProfile.answers[index].dislikes++;
        this.answersDisliked.push(this.questionProfile.answers[index].id);
      }
      else
      {
        this.questionProfile.answers[index].dislikes--;
        var ind  = this.answersDisliked.indexOf(this.questionProfile.answers[index].id);
        if(ind != -1)
        {
          this.answersDisliked.splice(ind,1);
        }
      }
    });
  }

  checkIfUserLiked(answerId : number) : number
  {
    // console.log("user is ",this.user," answerid is ",answerId);
    // var istrue = this.user.answersLiked.some(x => x.answerId == answerId && x.isLiked == true);
    // console.log("called  ",istrue );

    return this.answersLiked.indexOf(answerId);

    // return istrue;
  }

  checkIfUserDisliked(answerId : number) : number
  {
    // console.log("user is ",this.user," answerid is ",answerId);
    // var istrue =  this.user.answersLiked.some(x => x.answerId == answerId && x.isDisliked == true);
    // console.log("in dislike check ",istrue);
    // return istrue;
    return this.answersDisliked.indexOf(answerId);

  }
  
  markAsBestSolution(answerId : number,index : number)
  {
    this.questionProfile.answers[index].isBestSolution = !this.questionProfile.answers[index].isBestSolution; 
    // console.log("in mark func",this.questionProfile.answers[index]);
    this.httpservice.markBestSolution(answerId)
    .subscribe(res => {
      // console.log("res is ",res);
      this.alterQuestionSolveStatus();
    });
  }

  alterQuestionSolveStatus()
  {
    let flag = false;
    this.questionProfile.answers.forEach(ans => {
      if(ans.isBestSolution)
      {
        flag = true;
      }
    });
    let question : Question = {
      id : this.questionProfile.id,
      headline : this.questionProfile.headline,
      description : this.questionProfile.description,
      createdOn : this.questionProfile.createdOn,
      categoryId : this.questionProfile.category.id,
      userId : ""+this.questionProfile.user.id,
      isSolved : flag
    };
    // console.log("in alternate question question : ",question);
    this.httpservice.questionSolved(question)
    .subscribe(res => {
      // console.log("is question solved run - ",res);
      // this.httpservice.refreshQuestion(-1); 
      this.httpservice.refreshQuestion(this.questionProfile.id);
    });
  }

  reportQuestion(questionId : number)
  {
    let flag = false;
    let index = this.questionReported.indexOf(questionId); 
    
    if(this.questionReported.includes(questionId))
    {
      flag = false;
      this.questionReported.splice(index,1);
    }
    else
    {
      flag = true;
      this.questionReported.push(questionId);
    }

    let report : Report = {
      questionId : this.questionProfile.id,
      userId : ""+this.user.id,
      id : 0,
      isReported : flag
    }

    this.httpservice.reportQuestion(report)
    .subscribe(res => {
      console.log("question reported");
      // this.toastr.show("question Reported Successfully");
    })
  }


}
