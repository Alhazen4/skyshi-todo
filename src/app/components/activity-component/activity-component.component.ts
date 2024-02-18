import { NgIf, NgFor, NgClass } from '@angular/common';
import { Component, ViewChild, ElementRef, HostListener, TemplateRef } from '@angular/core';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import { RouterLink, ActivatedRoute  } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activity-component',
  standalone: true,
  imports: [
    NgIf, 
    NgFor, 
    NgClass, 
    ActivityCardComponent, 
    RouterLink, 
    ReactiveFormsModule,
  ],
  templateUrl: './activity-component.component.html',
  styleUrl: './activity-component.component.scss',
})
export class ActivityComponentComponent {

  constructor(
      private route: ActivatedRoute, 
      private activityService: ActivityService,
      private todoService: TodoService,
      private modalService: NgbModal
    ) { }

  // activityItems: any[] = [
  //   {id: 71555, title: 'e', activity_group_id: 76360, is_active: 1, priority: 'very-high'},
  //   {id: 71554, title: 'w', activity_group_id: 76360, is_active: 1, priority: 'high'},
  //   {id: 71553, title: 'q', activity_group_id: 76360, is_active: 1, priority: 'normal'}
  // ];

  @ViewChild('inputTitle') inputTitle: ElementRef | undefined;
  @ViewChild('modal') modal: ElementRef | undefined;

  activityItems: any[] = [];
  activityItemsLength = 0;
  readOnly = true;
  selectedId = 0;
  isInputFocused = false;
  showTitle = new FormControl('Activity');
  inputTodoTitle = new FormControl('');
  inputTodoPriority = new FormControl('');
  selectedTodoId = new FormControl(0);
  isAddNewTodo: boolean = false;

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.selectedId = params['id'];
        this.activityService.getActivityDetail(this.selectedId).then(res => {
          console.log(res.data)
          this.showTitle.setValue(res.data.title);
          this.activityItems = res.data.todo_items;
          console.log(this.activityItems);
          this.activityItemsLength = this.activityItems.length;
        });
      }
    );
  }

  getTodoItem() {
    this.activityService.getActivityDetail(this.selectedId).then(res => {
      this.activityItems = res.data.todo_items;
    });
  }

  editTitle() {
    if(this.readOnly === true) {
      this.readOnly = false;
      this.isInputFocused = true;
    } else {
      this.readOnly = true;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (
      this.inputTitle &&
      !this.inputTitle.nativeElement.contains(event.target) &&
      event.target instanceof HTMLElement &&
      event.target.id !== 'editButton'
    ) {
      // Clicked outside the input and not on the "Edit" button, blur the input
      if(this.readOnly === false) {
        this.readOnly = true;
        this.isInputFocused = false;
        this.activityService.editActivity(this.selectedId, this.showTitle.value!).then(
          res => {console.log(this.selectedId, ' ', this.showTitle.value!)}
        )
      }
    }
  }

  saveTodo() {
    this.todoService.createTodo(
      this.selectedId, 
      this.inputTodoTitle.value!, 
      this.inputTodoPriority.value!)
    .then(res => {
      this.modalService.dismissAll();
      this.activityService.getActivityDetail(this.selectedId).then(res => {
        this.activityItems = res.data.todo_items;
      });
    })
  }

  getTodoDetail(content: TemplateRef<any>, event: any) {
    this.todoService.getTodoDetail(event).then( res => {
      this.selectedTodoId.setValue(res.data.id)
      this.inputTodoTitle.setValue(res.data.title);
      this.inputTodoPriority.setValue(res.data.priority);
      this.isAddNewTodo = false;
      this.modalService.open(content, { centered: true });
    })
  }

  openSaveModal(content: TemplateRef<any>) {
    this.isAddNewTodo = true;
    this.inputTodoTitle.setValue('');
    this.inputTodoPriority.setValue('');
    this.modalService.open(content, { centered: true })
  }

  updateTodo() {
    this.todoService.updateTodo(
      this.selectedTodoId.value!, 
      this.inputTodoTitle.value!, 
      this.inputTodoPriority.value!).then(
      res => {
        this.activityService.getActivityDetail(this.selectedId).then(res => {
          this.activityItems = res.data.todo_items;
          this.modalService.dismissAll();
        });
    })
  }
}
