import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/firebase/auth.service";
import { Router } from "@angular/router";
import {timer} from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  
  showSplash = true;
  constructor(private authService: AuthService, public router: Router) { }


  ngOnInit() {
    timer(3000).subscribe(() => this.showSplash = false);
  }

  onSubmitLogin(){
    this.authService.login(this.email, this.password).then( res =>{
      this.router.navigate(['/home']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'))
  }
}
