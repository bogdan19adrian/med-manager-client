﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    users: User[] = [];
    usersDs: Object;
    isDataAvailable = false;
    usersperms: any;

    constructor(private userService: UserService) {}

    ngOnInit() {
           }

    callBackend() {
        this.userService.findAll().subscribe(
            (data) => {
                this.usersDs = data;
                this.isDataAvailable = true;
            }
        );
    }

  getPerms() {
    this.userService.getUserPermissions().subscribe(
      (data) => {
        this.usersperms = data;
        console.log(this.usersperms);
      }
    );
  }
}
