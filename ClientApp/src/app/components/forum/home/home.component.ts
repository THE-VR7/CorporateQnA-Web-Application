import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';
import { Question } from 'src/app/Models/question';
import { Icons } from '../../../shared/icons';
import { HttpService  } from '../../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryProfile } from 'src/app/Models/categoryProfile';
import { Category } from 'src/app/Models/category';
import { QuestionDetailsView } from 'src/app/Models/questionDetailsView';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/Models/userProfile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private httpservice : HttpService,
  private userService : UserService,
  private toastr: ToastrService,
  private modalService: BsModalService) 
  { }

  // categoryFilters : Array<string> = ["All","Asp.Net","Java","Node js","Dev opps","UX Design"];
  showFilters : Array<string> = ["My Questions","My participation","Hot","Solved","Unsolved"];
  sortByFilters : Array<string> = ["Recent","Last 10 days","Last 30 days"];

  questionSelected: boolean = false;
  question!: Question ;
  
  categories : Category[] = [];

  // This is for storing the filters
  categoryId: number = 0;
	searchText: string = ""
	showFilter: string = "all";
	sortByFilter: string = "all";

  questionsList : QuestionDetailsView[] = [];
  filteredQuestionList : QuestionDetailsView[] = [];

	icons: Icons = new Icons;
  
  addQuestionForm!: FormGroup;

  user! : UserProfile;
  answeredQuestionsList : Array<number> = [];
  
	modalRef!: BsModalRef;
	addModal!: TemplateRef<any>;
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};

	editor: Editor = new Editor;
	toolbar: Toolbar = [
		['bold', 'italic', 'underline'],
		['ordered_list', 'bullet_list'],
		['blockquote', 'link']
	];
	html = 'Enter Your Answer Here';

  currentQuestionId : string = "-1";

  ngOnInit(): void {
    this.editor = new Editor({
			content: ``,
			enabled: true,
			history: true,
			keyboardShortcuts: true
    });

	this.httpservice.questionId.subscribe(id => {
		// console.log("id in home component ",id);
		this.refreshQuestion(id);
	});

    this.userService.getcurrentUser().subscribe(res => {
      this.user = res;
      this.userService.currentUser = res;
	  this.answeredQuestionsList = [];
	  this.user.answeredQuestions.forEach(ques => {
		  this.answeredQuestionsList.push(ques.id);
	  });
    });
    
    this.initializeForm();

    this.getCategories();

    this.getQuestions();

  }

  receiveQuestionId(event: any)
  {
    // console.log("Info send is home component is ",event);
    this.currentQuestionId = event;
    this.questionSelected = true;
  }

  getCategories()
  {
    // To get the categories which are there 
    this.httpservice.getCategories().subscribe(
			res => {
        this.categories = res;
        // console.log("categories are : ",this.categories);
			}
		)
  }

  getQuestions()
  {
    this.httpservice.getQuestions().subscribe(
			res => {
				this.questionsList = res;
				this.filteredQuestionList =  [...this.questionsList];
				this.filterQuestions();
				// console.log("questions in home are : ",this.questionsList);
			}
		)
  }


  initializeForm() {
		this.addQuestionForm = new FormGroup({
			'question': new FormControl('', Validators.required)!,
			'description': new FormControl('', [Validators.required]),
			'Id': new FormControl('', Validators.required),
		});
  }
  
  addQuestion() {
    this.question = {
      id : 0,
      headline : this.addQuestionForm.value.question,
      description : this.addQuestionForm.value.description,
      createdOn : new Date(),
      isSolved : false,
      userId : ""+this.user.id,
      categoryId : this.addQuestionForm.value.Id
    };
    
    console.log("in add question method : ",this.question);

		this.httpservice.addQuestion(this.question).subscribe(
			res => {
				if(res)
        {
          this.toastr.success("Question Added", "Successfully")
          this.getQuestions();
        }
			}
    )

		this.closeModal();
  }

  resetFilters() {
		this.categoryId = 0;
		this.showFilter = "all";
		this.sortByFilter = "all";
		this.searchText = "";
		this.filteredQuestionList = [...this.questionsList];
		// this.searchFilter.emit(this.searchText);
    this.searchText = "";
    // this.filterQuestions();
		// this.getQuestions();
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, this.config);
	}

	closeModal() {
		this.modalRef.hide();
	}


  // searchTextFilter() 
  // {
  //   if(this.searchText.length > 0)
  //   {
  //     console.log(this.searchText);
  //     let searchedQuestions = this.filteredQuestionList.filter(question => {
  //       return question.headline.toLocaleLowerCase().startsWith(this.searchText);
  //     });
  //     console.log("searched questions - ",searchedQuestions);
  //   }
  // }

  filterByCategory = (id: number, questions: QuestionDetailsView[]) => {
		let questionsbyCategory = questions.filter(
			question => {
				return question.categoryId == id;
			}
		)
    // console.log("category questions are - ",questionsbyCategory);
		return questionsbyCategory;
	}

	filterByUserId = (id: string, questions: QuestionDetailsView[]) => {
		questions = questions.filter(
			question => {
				// console.log(question.userId == id)
				return question.userId == id;
			}
		)
		return questions;
	}

	filterByUserIdAndParticipation = (questions: QuestionDetailsView[]) => {
		questions = questions.filter(
			question => {
				if(this.answeredQuestionsList.includes(question.id))
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		);
		// console.log("participation - ",questions);
		return questions;
	}

	filterByNoOfDays = (noOfDays: number, questions: QuestionDetailsView[]) => {
		questions = questions.filter(
			question => {
				var diff = Math.abs((new Date).getTime() - (new Date(question.createdOn)).getTime());
				var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
				console.log(diffDays <= noOfDays)
				return diffDays <= noOfDays;
			}

		)
		return questions;
	}

	filterQuestions(questionsList : QuestionDetailsView[] = this.questionsList) {
		this.filteredQuestionList = [...this.questionsList];
		// console.log("filters are - category :",this.categoryId,"search text is - ",this.searchText,"show filter - ",this.showFilter," sort by filter - ",this.sortByFilter);

		// get the filtered list due to category filters
		if (this.categoryId != 0)
		this.filteredQuestionList = this.filterByCategory(this.categoryId, this.filteredQuestionList);

		// To get the questions on the basis of search text
		if(this.searchText.length > 0)
		{
		console.log(this.searchText);
		this.filteredQuestionList = this.filteredQuestionList.filter(question => {
		return question.headline.toLocaleLowerCase().startsWith(this.searchText);
		});
		//   console.log("searched questions - ",this.filteredQuestionList);
		}

		if(this.showFilter=="all" && this.sortByFilter=="all" && this.categoryId==0){
			
		}
		else if (this.showFilter == "My Questions") {
			this.filteredQuestionList = this.filterByUserId(this.user.id, this.filteredQuestionList)
		}
		else if (this.showFilter == "My participation") {
			this.filteredQuestionList = this.filterByUserIdAndParticipation(this.filteredQuestionList)
		}
		else if (this.showFilter == "Hot") {
			this.filteredQuestionList=this.filteredQuestionList.sort((a, b) =>{ return  b.votes - a.votes })
		}
		else if (this.showFilter == "Solved") {
			this.filteredQuestionList = this.filteredQuestionList.filter(a => a.isSolved);
		}
		else if (this.showFilter == "Unsolved") {
			this.filteredQuestionList = this.filteredQuestionList.filter(a => !a.isSolved);
		}
		if (this.sortByFilter == "Recent") {
			this.filteredQuestionList.sort((a, b) => a.createdOn > b.createdOn ? -1 : a.createdOn < b.createdOn ? 1 : 0)
		}
		else if (this.sortByFilter == "Last 10 days") {
			this.filteredQuestionList = this.filterByNoOfDays(10, this.filteredQuestionList)
		}
		else if (this.sortByFilter == "Last 30 days") {
			this.filteredQuestionList = this.filterByNoOfDays(30, this.filteredQuestionList)
		}

		console.log("filtered questions are : ",this.filteredQuestionList);
		// this.filteredQuestions.emit(this.questions);
	}

   refreshQuestion(questionId : number)
  {
    if(questionId != -1)
	{
		// console.log("questions needs to be refreshed",questionId);
		this.getQuestions();
	}
  }


}




