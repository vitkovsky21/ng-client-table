import { Component } from '@angular/core';
import { UserElement } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';

// const ELEMENT_DATA: UserElement[] = [
//   {
//     id: 1,
//     template: 'Hydrogen',
//     fio: 'Hydrogen',
//     first_name: 'Hydrogen',
//     last_name: 'Hydrogen',
//     pat_name: 'Hydrogen',
//     phone: '+79114111111',
//     email: 'Hydrogen@hydrogen.com',
//     birthday: '00.00.00',
//     gender: 'M',
//   },
//   {
//     id: 2,
//     template: 'Hydrogen',
//     fio: 'Hydrogen',
//     first_name: 'Hydrogen',
//     last_name: 'Hydrogen',
//     pat_name: 'Hydrogen',
//     phone: '+79114111111',
//     email: 'Hydrogen@hydrogen.com',
//     birthday: '00.00.00',
//     gender: 'M',
//   },
//   {
//     id: 3,
//     template: 'Hydrogen',
//     fio: 'Hydrogen',
//     first_name: 'Hydrogen',
//     last_name: 'Hydrogen',
//     pat_name: 'Hydrogen',
//     phone: '+79114111111',
//     email: 'Hydrogen@hydrogen.com',
//     birthday: '00.00.00',
//     gender: 'M',
//   },
// ];

@Component({
  selector: 'main.component',
  styleUrls: ['main.component.css'],
  templateUrl: 'main.component.html',
})
export class MainComponent {
  ELEMENT_DATA: any = [];
  dataSource = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers(window.sessionStorage['auth-user'].slice(1, -1))
      .subscribe((userData) => {
        this.ELEMENT_DATA = userData.passes;

        this.dataSource = this.ELEMENT_DATA;
      });
  }
  displayedColumns: string[] = [
    'user_id',
    'template',
    'first_name',
    'last_name',
    'pat_name',
    'phone',
    'email',
    'birthday',
    'gender',
  ];
}
