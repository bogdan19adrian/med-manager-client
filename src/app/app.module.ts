import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import {AuthInterceptor} from './_services';
import { LayoutComponent } from './ui/layout/layout.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SignupComponent } from './signup/signup/signup.component';
import {SignupModule} from './signup/signup.module';
import {UiModule} from './ui/ui.module';
import { DisableIfUnauthorizedDirective } from './_guards/disable-if-unauthorized.directive';
import { HideIfUnauthorizedDirective } from './_guards/hide-if-unauthorized.directive';
import {AuthorizationService} from './_guards';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    SignupModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthorizationService
    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
