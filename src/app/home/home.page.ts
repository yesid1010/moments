import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
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
    name: any,
    image : any
  };

  public user:any;
  
 
  constructor(public modal : ModalController,
              private socialSharing: SocialSharing,
              private crudservice : CrudService,
              private auth : AuthService,
              public actionSheetController: ActionSheetController,
              private router : Router){             
    this.observer();
    //this.getPost();

  }
  observer(){
    this.auth.observer().then((data)=>{
      this.user = data;
        this.crudservice.getUser(data).subscribe((data)=>{
            this.usuario = {
              id: data.uid,
              name:data.name,
              image : data.image
            };
      
            this.getPost();
        })
    })
  
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
          this.logout();
        },
      }]
    });
    await actionSheet.present();
  }

  // cerrar sesion
  logout(){
    this.auth.logout().then(()=>{
      this.router.navigate(['/login']);
    }).catch(err => alert('hubo un error al salir'+ err));
  }

  // abrir la ventana para ingresar una publicacion
  OpenModal(){
    this.modal.create({
      component: FormComponent
    }).then((modal)=> modal.present())
  }
// abrir la ventana para mostrar los comentarios
  comment(){
    this.modal.create({
      component: CommentComponent,
    }).then((modal)=> modal.present())
  }
  // compartir el post por las redes sociales
  share(item){
    this.socialSharing.share(item)
    .then(()=>{

    }).catch(()=>{
      
    })
  }

  profile(){
    this.auth.observer().then((data)=>{
       this.user = data;
    });
    this.router.navigate(['profile',this.user]);
  }
}
