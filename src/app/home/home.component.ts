import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    users: User[] = [];
    usersDs: Object;
    private isDataAvailable: boolean = false;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    callBackend() {
        this.userService.findAll().subscribe(
            (data) => {
                this.usersDs = data;
                this.isDataAvailable = true;
            }
        )
    }
}