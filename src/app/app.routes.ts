import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { nameApp } from "@Global/constants";

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: nameApp + 'Login'
    }
]