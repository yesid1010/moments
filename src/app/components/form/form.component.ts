import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import { CrudService } from '../../services/firebase/crud.service';
import { AuthService} from "../../services/firebase/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent{
  image : any;
  url:any;
  likes = 0;
  date :any;
  hour : any;

  usuario:{
    id: any,
    name: any,
    image:any
  };
  uploadPercent:boolean=false;
  public descriptions:string;
  
  constructor(private modal : ModalController,
              private camera : Camera,
              public webview: WebView,
              public crudservice : CrudService,
              public navCtrl: NavController,
              private router : Router,
              private auth : AuthService){

                this.observer();
                this.hoyFecha();
               }

  close(){
    this.modal.dismiss();
  }

  capturarFoto(){
    this.camera.getPicture({
       quality: 100,
         destinationType: this.camera.DestinationType.DATA_URL,
         encodingType: this.camera.EncodingType.JPEG,
         mediaType: this.camera.MediaType.PICTURE,
         allowEdit: false,
         saveToPhotoAlbum: true,
         sourceType: this.camera.PictureSourceType.CAMERA
     }).then(imageData => {
        this.image = 'data:image/jpeg;base64,' + imageData;
     })
      
   }
 
   buscarFoto(){
     this.camera.getPicture({
       quality: 100,
         destinationType: this.camera.DestinationType.DATA_URL,
         encodingType: this.camera.EncodingType.JPEG,
         mediaType: this.camera.MediaType.PICTURE,
         allowEdit: false,
         saveToPhotoAlbum: true,
         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
     }).then(imageData => {
      this.image = 'data:image/jpeg;base64,' + imageData;
     // this.name_img = this.webview.convertFileSrc(imageData); 
     })
   }

   //upload the image and download your url of firebase storage 
   UploadImg(){
    this.uploadPercent = true;
    this.crudservice.uploapImg('images',this.image).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then((url)=>{
        this.url =  url;
        //call method addpost
        this.addpost();
        this.router.navigate(['/home']);
      });
     
    }).catch(err => console.log(err));
   }
   //Method to add a post to firestore
   addpost(){
     this.crudservice.addPost(this.usuario.id,this.usuario.name,this.usuario.image,this.url,this.likes,this.descriptions).then(()=>{ 
      this.modal.dismiss();
     });
   }

   //method to know which user has logged in
   observer(){
      this.auth.observer().then((data)=>{
          this.crudservice.getUser(data).subscribe((data)=>{
              this.usuario = {
                id: data.uid,
                name:data.name,
                image : data.image
              }
          })
      })
    
   }

  hoyFecha(){
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();
    let hour = hoy.getHours();
    let minutes = hoy.getMinutes();
    
    this.date = dd+'/'+mm+'/'+yyyy;
    this.hour = hour+'/'+minutes
  } 



}
