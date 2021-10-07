import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styles: [
  ]
})


export class ForumComponent implements OnInit {
  selectedListIndex = -1;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.loadHomeComponent();
  }

  loadHomeComponent()
  {
    this.selectedListIndex = 0;
    this.router.navigateByUrl("/forum/home");
  }

}
