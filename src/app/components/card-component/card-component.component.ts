import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgFor, DatePipe  } from '@angular/common';
import { ActivityService } from '../../services/activity.service';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [NgFor, DatePipe, RouterLink],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.scss',
})
export class CardComponentComponent {

  constructor(private activityService: ActivityService, private modalService: NgbModal) {}


  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() date: string = '';
  @Input() index: number = 0;
  @Output() getActivity = new EventEmitter<string>()

  showTitle: string = '';
  showDate: string | null = '';

  ngOnInit() {
    this.showTitle = this.title
    this.showDate = this.date
    console.log(this.index);
  }

  cardClick() {
    console.log(this.id);
    this.activityService.getActivityDetail(this.id).then(res => console.log(res))
  }

  openRemoveModal(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  removeClick() {
    this.activityService.deleteActivity(this.id).then(res => {
      this.modalService.dismissAll();
      this.getActivity.emit();
    })
  }
}
