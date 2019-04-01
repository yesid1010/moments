import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {timer} from 'rxjs';
import {FormComponent} from '../components/form/form.component';
import {CommentComponent} from '../components/comment/comment.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CrudService } from "../services/firebase/crud.service";

interface posts {
  user: string,
  img : string,
  description : string,
  likes : string,
  id:string
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public posts : any = [];
  imagenes: any   = [
    {nombre :'yesid', like:'45', description:'es simplemente el texto de relleno de las imprentas y archivos de texto.', ruta : 'assets/img/client-1.jpg'},
    {nombre :'nelly', like:'58',description:'Jugando el lunes', ruta : 'assets/img/client-2.jpg'},
    {nombre :'gabriel', like:'87', description:'Jugando el sabado', ruta : 'assets/img/team-1.jpg'},
    {nombre :'eris', like:'59',description:'Jugando el martes', ruta : 'assets/img/team-2.jpg'},
    {nombre :'yamid', like:'48', description:'Jugando el viernes', ruta : 'assets/img/team-3.jpg'},
  ]
  foto : any;

  showSplash = true;
  constructor(public modal : ModalController,
              private socialSharing: SocialSharing,
              private crudservice : CrudService){             
    timer(3000).subscribe(() => this.showSplash = false);
    this.getPost();
  }


  getPost(){
    this.crudservice.getPost().subscribe((data)=>{
      data.map(post =>{
        const data : posts = post.payload.doc.data() as posts;
        data.id = post.payload.doc.id;
        this.posts.push(data);
        console.log(data);
      })     
    })
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
