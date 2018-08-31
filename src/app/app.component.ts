import { Component, OnInit } from '@angular/core';
import * as Handsontable from 'handsontable-pro';
import { HotTableRegisterer } from '@handsontable-pro/angular';
import { Observable, of } from 'rxjs';
import { RepositoryService } from './repository.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataset: any;
  fetched = false;
  error = false;
  saveMessages: string[] = [];

  columns: any[] = [];
  options: any;

  constructor(private repositoryService: RepositoryService) {
    this.fetchData();
    this.options = {
      height: 396,
      rowHeaders: true,
      stretchH: 'all',
      columnSorting: true,
      contextMenu: true,
      className: 'htCenter htMiddle',
      columnSummary: [
        {
          destinationRow: 4,
          destinationColumn: 4,
          type: 'min'
        }
      ]
    };
  }
  settings = {
    contextMenu: [
      'row_above', 'row_below', 'remove_row', 'col_left', 'col_right', 'alignment', 'remove_col', 'undo', 'redo']
  };



  ngOnInit() {

  }

  fetchData(): void {

    this.repositoryService.getUsers()
      .subscribe(
        users => this.dataset = users,
        err => this.error = true,
        () => this.fetched = true);



  }

  saveData(users): void {
    this.repositoryService.saveUsers(users).subscribe();
  }

  onAfterChange($event) {
    if (!$event.params[0]) {
      return;
    }

    const hotInstance = $event.hotInstance;
    const changes = $event.params[0];

    changes.forEach(change => {
      const [row, prop, oldVal, newVal] = change;

      if (oldVal === newVal) {
        return;
      }

      const uid = hotInstance.getDataAtCell(row, 'uid');

      this.saveData({ uid: uid, prop: prop, value: newVal });
    })
  }

}