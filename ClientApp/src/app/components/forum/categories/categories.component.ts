import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { CategoryProfile } from 'src/app/Models/categoryProfile';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Icons } from 'src/app/shared/icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [
  ]
})
export class CategoriesComponent implements OnInit {
  showFilters : Array<string> = ["all","My Questions","My participation","Hot","Solved","Unsolved"];

  searchText: string="";
	showFilter: string = "popular";

	icons:Icons=new Icons
	addCategoryForm!: FormGroup;
	
  category!: Category;
	
  categories:CategoryProfile[]=[]
  filteredCategories:CategoryProfile[]=[]
  
	
  modalRef!: BsModalRef;
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};

  constructor(private httpservice : HttpService,
    private userService : UserService,
    private toastr: ToastrService,
    private modalService: BsModalService) 
    { }

  ngOnInit(): void {
    this.initializeForm();
    this.getCategories();
  }

  initializeForm(){
		this.addCategoryForm = new FormGroup({
			'name': new FormControl(null, Validators.required)!,
			'description': new FormControl(null, Validators.required)!
		})!;
	}

  resetFilters(){
		this.searchText = "";
    this.filterCategories();
		// this.searchFilter.emit(this.searchText)
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, this.config);
	}
	
	closeModal() {
		this.modalRef.hide();
	}


  addCategory(){
		this.category = {
      name : this.addCategoryForm.value.name,
      description : this.addCategoryForm.value.description,
      id : 0
    }

		this.httpservice.addCategory(this.category).subscribe(
			res=>{
				this.toastr.success("Category Added", "Succesfully");
				this.getCategories();
			}
		);
		this.closeModal();
	}

  getCategories()
  {
    // To get the categories which are there 
    this.httpservice.getCategoriesDetail().subscribe(
			res => {
        this.categories = res;
        this.filteredCategories = [...this.categories];
        console.log("categories are : ",this.categories);
			}
		)
  }

  filterCategories() {
		this.filteredCategories = [...this.categories];
		
    // console.log("filters are - category :",this.categoryId,"search text is - ",this.searchText,"show filter - ",this.showFilter," sort by filter - ",this.sortByFilter);
    
    // To get the questions on the basis of search text
    if(this.searchText.length > 0)
    {
      // console.log(this.searchText);
      this.filteredCategories = this.filteredCategories.filter(category => {
        return category.name.toLocaleLowerCase().startsWith(this.searchText);
      });
      // console.log("searched questions - ",this.filteredQuestionList);
    }

		// if(this.showFilter=="all" && this.sortByFilter=="all" && this.categoryId==0){
		// 	return;
		// }
		// else if (this.showFilter == "My Questions" || this.showFilter == "My participation") {
		// 	this.filteredQuestionList = this.filterByUserId(this.user.id, this.filteredQuestionList)
		// }
		// else if (this.showFilter == "Hot") {
		// 	this.filteredQuestionList=this.filteredQuestionList.sort((a, b) =>{ return  b.votes - a.votes })
		// }
		// else if (this.showFilter == "Solved") {
		// 	this.filteredQuestionList = this.filteredQuestionList.filter(a => a.isSolved);
		// }
		// else if (this.showFilter == "Unsolved") {
		// 	this.filteredQuestionList = this.filteredQuestionList.filter(a => !a.isSolved);
		// }
		// if (this.sortByFilter == "Recent") {
		// 	this.filteredQuestionList.sort((a, b) => a.createdOn > b.createdOn ? -1 : a.createdOn < b.createdOn ? 1 : 0)
		// }
		// else if (this.sortByFilter == "Last 10 days") {
		// 	this.filteredQuestionList = this.filterByNoOfDays(10, this.filteredQuestionList)
		// }
		// else if (this.sortByFilter == "Last 30 days") {
		// 	this.filteredQuestionList = this.filterByNoOfDays(30, this.filteredQuestionList)
		// }

    // console.log("filtered questions are : ",this.filteredCategories);
		// this.filteredQuestions.emit(this.questions);
	}

}
