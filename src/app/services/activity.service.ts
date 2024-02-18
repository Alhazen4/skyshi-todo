import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  getActivity() {
    return axios.get('https://todo.api.devcode.gethired.id/activity-groups?email=aa%40skyshi.co');
  }
  
  getActivityDetail(id: number) {
    return axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`);
  }

  createActivity() {
    return axios.post(`https://todo.api.devcode.gethired.id/activity-groups`, 
      {
        title: 'New Activity',
        email: 'aa@skyshi.co'
      }
    );
  }

  editActivity(id: number, editTitle: string) {
    return axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`,
    {
      title: editTitle
    });
  }

  deleteActivity(id: number) {
    return axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
  }
}
