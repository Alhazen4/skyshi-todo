import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.scss'
})
export class ActivityCardComponent {

  constructor(private todoService: TodoService, private modalService: NgbModal) {}

  @Input() activity_group_id = 0
  @Input() id = 0
  @Input() is_active = 1
  @Input() priority = ""
  @Input() title = ""
  @Output() getTodoList = new EventEmitter();
  @Output() getTodoDetail = new EventEmitter();

  inputTodoTitle = new FormControl('');
  inputTodoPriority = new FormControl('');
  removeTodoTitle = new FormControl('');

  getTodo(id: number) {
    this.getTodoDetail.emit(id);
  }

  updateTodo() {
    this.todoService.updateTodo(this.id, this.inputTodoTitle.value!, this.inputTodoPriority.value!)
    .then(res => {
      this.getTodoList.emit()
    })
  }

  removeTodo(content: TemplateRef<any>) {
    this.todoService.removeTodo(this.id).then(res => this.getTodoList.emit())
    this.modalService.dismissAll()
    this.modalService.open(content, { centered: true });
  }

  openRemoveModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true})
  }
}
