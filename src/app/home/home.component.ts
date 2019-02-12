import {Component, OnInit} from '@angular/core';

import {User} from '../_models';
import {UserService} from '../_services';
import {MessageService} from 'primeng/api';
import {SignupService} from '../signup/http-service/signup.service';
import {ResponseType} from '@angular/http';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  users: User[] = [];
  usersDs: any[];
  isDataAvailable = false;
  userRoles: any;
  displayDialog: boolean;
  selectedUser: User;
  roles: Object;
  selectedRoles;

  constructor(private userService: UserService, private messageService: MessageService, private signupService: SignupService) {
  }

  ngOnInit() {
    this.userService.findAll().subscribe(
      (data) => {
        this.usersDs = data as any[];
        this.isDataAvailable = true;
      }
    );
    this.signupService.getAllRoles().subscribe(
      data => {
        console.log('allRoles', data);
        this.roles = data;

      }
    );
  }

  getPerms() {
    this.userService.getUserPermissions().subscribe(
      (data) => {
        this.userRoles = data;
        console.log(this.userRoles);
      }
    );
  }

  onRowSelect(event) {
    console.log('selectedRow', event);
    this.selectedUser = (event.data);
    this.selectedRoles = event.data.roles;
    // this.displayDialog = true;
  }

  delete() {
    if (this.selectedUser == null) {
      console.error('user', this.selectedUser);
      this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Please select a row to delete'});
      return;
    } else {
      console.error('user', this.selectedUser);
      this.userService.deleteUser(this.selectedUser.id).subscribe(data => {
        this.usersDs.splice(this.selectedUser.id, 1);
        this.selectedUser = null; });
    }
  }

  save(event) {
    console.log('toSave', event);
    this.userService.updateUser(event).subscribe(resp  => {
      console.log('resp', resp);

    });
    this.displayDialog = false;
  }

  showError() {

  }

  edit(rowData) {
    if (this.selectedUser == null) {
      console.error('user', this.selectedUser);
      this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Please select a row '});
      return;
    } else {
    this.displayDialog = true;
  }
  }
}
