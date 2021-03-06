import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormComponent} from '../../components/form/form.component';
import {CommentComponent} from '../comment/comment.component'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CrudService} from "../../services/firebase/crud.service";
import { AuthService} from "../../services/firebase/auth.service";
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name:any;
  image:any;
  public posts : any = [];
  UserId:any
  constructor(public modal : ModalController,
    private socialSharing: SocialSharing,
    private crudservice : CrudService,
    private auth : AuthService,
    public actionSheetController: ActionSheetController,
    public route : ActivatedRoute,
    private routers : Router){             
   // this.getPost(this.UserId);
   this.UserId = this.route.snapshot.params.id;
}

  ngOnInit() {
    this.getUser(this.UserId);
    console.log(this.UserId);
    this.getPost(this.UserId);
  }

  getUser(userid){
    this.crudservice.getUser(userid).subscribe((user)=>{
      this.name = user.name;
      this.image = user.image;
    })
  }
  getPost(user){
    this.crudservice.getPostUser(user).subscribe((data)=>{
      this.posts = data;
      console.log(data)
    })
  }


  
  comment(){
    this.modal.create({
      component: CommentComponent,
    }).then((modal)=> modal.present())
  }

  share(item){
    this.socialSharing.share(item)
    .then(()=>{

    }).catch(()=>{
      
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Sign off',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.UserId = '',
          this.logout();

        },
      }]
    });
    await actionSheet.present();
  }

  logout(){
    this.auth.logout().then(()=>{
      this.routers.navigate(['/login']);
    }).catch(err => alert('hubo un error al salir'+ err));
  }

  OpenModal(){
    this.modal.create({
      component: FormComponent
    }).then((modal)=> modal.present())
  }
  mantenimiento(){
    alert('!!Lo sentimos estamos En Manteimiento!!')
  }
}
