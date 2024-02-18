import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponentComponent } from '../card-component/card-component.component';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, CardComponentComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  constructor(private activityService: ActivityService) {}

  // todoItems = [
  //   {title: "To-do 1", date: '5 oktober 2021'},
  //   {title: "To-do 1", date: '5 oktober 2021'},
  //   {title: "To-do 1", date: '5 oktober 2021'},
  //   {title: "To-do 1", date: '5 oktober 2021'},
  //   {title: "To-do 1", date: '5 oktober 2021'},
  //   {title: "To-do 1", date: '5 oktober 2021'},
  // ];

  todoItems: any[] = [];
  todoItemsLength = this.todoItems.length;
  circleCount = 3;
  circles = new Array(this.circleCount).fill(0);
  url = 'https://todo.api.devcode.gethired.id/activity-groups?email=yoga%2B1%40skyshi.io'

  ngOnInit() {
    this.getActivity();
  }

  getActivity() {
    this.activityService.getActivity().then(res => {
      this.todoItems = res.data.data;
      this.todoItemsLength = this.todoItems.length
    });
  }

  newActivity() {
    this.activityService.createActivity().then(
      res => {
        console.log(res)
        this.activityService.getActivity().then(res => {
          this.todoItems = res.data.data;
          this.todoItemsLength = this.todoItems.length
        });
      }
    )
  }
}
