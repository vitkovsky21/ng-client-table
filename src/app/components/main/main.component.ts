import { Component } from '@angular/core';
import { UserElement } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';
import { Sort } from '@angular/material/sort';
import { debounceTime, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'main.component',
  styleUrls: ['main.component.css'],
  templateUrl: 'main.component.html',
})
export class MainComponent {
  ELEMENT_DATA: any = [];

  dataSource: UserElement[] = [];
  sortedData: UserElement[] = [];
  filteredData?: UserElement[];

  keyupSub?: Subscription;
  countriesSub?: Subscription;
  searchControl = new FormControl();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers(window.sessionStorage['auth-user'].slice(1, -1))
      .subscribe((userData) => {
        this.ELEMENT_DATA = userData.passes;

        this.dataSource = this.ELEMENT_DATA;
        this.sortedData = this.dataSource.slice();
      });
  }

  displayedColumns: string[] = [
    'user_id',
    'template',
    'fio',
    'first_name',
    'last_name',
    'pat_name',
    'phone',
    'email',
    'birthday',
    'discount',
  ];

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'user_id':
          return compare(a.user_id, b.user_id, isAsc);
        case 'template':
          return compare(a.template, b.template, isAsc);
        case 'fio':
          return compare(a.fio, b.fio, isAsc);
        case 'first_name':
          return compare(a.first_name, b.first_name, isAsc);
        case 'last_name':
          return compare(a.last_name, b.last_name, isAsc);
        case 'pat_name':
          return compare(a.pat_name, b.pat_name, isAsc);
        case 'phone':
          return compare(a.phone, b.phone, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'birthday':
          return compare(a.birthday, b.birthday, isAsc);
        case 'discount':
          return compare(a.discount, b.discount, isAsc);
        default:
          return 0;
      }
    });
  }

  subSearchBoxChanges() {
    this.keyupSub = this.searchControl.valueChanges.subscribe((val: string) => {
      this.applyFilter(val);
    });
  }

  applyFilter(filterValue: any): void {
    this.filteredData = this.sortedData.filter((val: any) => {
      return val.fio.includes(filterValue);
    });
  }
}
