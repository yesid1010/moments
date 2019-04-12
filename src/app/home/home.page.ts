import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {FormComponent} from '../components/form/form.component';
import {CommentComponent} from '../components/comment/comment.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CrudService} from "../services/firebase/crud.service";
import { AuthService} from "../services/firebase/auth.service";
import { ActionSheetController } from '@ionic/angular';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public posts : any = [];
  foto : any;
  usuario:{
    id: any,
    name: any
  };

  public user:any;
  
 
  constructor(public modal : ModalController,
              private socialSharing: SocialSharing,
              private crudservice : CrudService,
              private auth : AuthService,
              public actionSheetController: ActionSheetController){             
  
    this.getPost();

  }



  getPost(){
    this.crudservice.getPost().subscribe((data)=>{
      this.posts = data;
      console.log(data)
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
          
          this.auth.logout();

        },
      }]
    });
    await actionSheet.present();
  }



  OpenModal(){
    this.modal.create({
      component: FormComponent
    }).then((modal)=> modal.present())
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
}
