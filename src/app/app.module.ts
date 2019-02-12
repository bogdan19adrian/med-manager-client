import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {AuthInterceptor} from './_services';
import {SignupModule} from './signup/signup.module';
import {UiModule} from './ui/ui.module';
import {DisableIfUnauthorizedDirective} from './_guards/disable-if-unauthorized.directive';
import {HideIfUnauthorizedDirective} from './_guards/hide-if-unauthorized.directive';
import {AuthorizationService} from './_guards';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ListboxModule} from 'primeng/listbox';
// used to create fake backend

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    SignupModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ListboxModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DisableIfUnauthorizedDirective,
    HideIfUnauthorizedDirective,
  ],
  exports: [
    DisableIfUnauthorizedDirective,
    HideIfUnauthorizedDirective,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthorizationService, MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
