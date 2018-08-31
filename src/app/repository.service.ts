import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  url = 'https://cdn.rawgit.com/swistach/2503ee590c97efb156494c8be6e1b15e/raw/be88418df10ad8f9036b7f8586fb3865be5d9840/remote-data.json';

  constructor(private httpClient: HttpClient) { }
  data: Object[];
  getUsers() {

    return this.httpClient.get(this.url);
  }
  getCol() {
    // return this.httpClient.get(this.url);
    const columns: any[] = [
      { data: 'uid', title: 'UID', readOnly: true },
      { data: 'name', title: 'Name' },
      { data: 'age', title: 'Age', type: 'numeric' },
      { data: 'balance', title: 'Balance' },
      { data: 'company', title: 'Company' },
      { data: 'gender', title: 'Gender', type: 'dropdown', source: ['male', 'female'] },
      { data: 'phone', title: 'Phone' },
      { data: 'registered', title: 'Registered' },
      { data: 'isActive', title: 'Is active?', type: 'checkbox' }

    ];
    return columns
  }

  saveUsers(user) {
    // Here you can use this.httpClient.post(this.url, body)
    // Below is only an example
    return of(`UPDATE users SET ${user.prop}='${user.value}' WHERE uid=${user.uid}`);
  }
}
