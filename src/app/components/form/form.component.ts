import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import { CrudService } from '../../services/firebase/crud.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent{
  image : any;
  url:any;
  name_img:any;
  user: string='juan';
  likes : string = '5';
  desc :string ='esto dsandjkasdk' ;

  constructor(private modal : ModalController,
              private camera : Camera,
              public webview: WebView,
              public crudservice : CrudService
              ){ }

  close(){
    this.modal.dismiss();
  }

  capturarFoto(){
    this.camera.getPicture({
       quality: 100,
         destinationType: this.camera.DestinationType.FILE_URI,
         encodingType: this.camera.EncodingType.JPEG,
         mediaType: this.camera.MediaType.PICTURE,
         allowEdit: false,
         saveToPhotoAlbum: true,
         sourceType: this.camera.PictureSourceType.CAMERA
     }).then(imageData => {
       this.image = this.webview.convertFileSrc(imageData);
       //this.posts.push(this.foto);
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
      this.name_img = this.webview.convertFileSrc(imageData); 
      // this.posts.push(this.foto);
      console.log(this.name_img)
     })
   }

   UploadImg(){
    this.crudservice.uploapImg(this.image,this.name_img).then((snapshot)=>{

      console.log('guardada');
      this.url =  snapshot.ref.getDownloadURL();
     
     // console.log(this.url)
    //  this.close();
      
      
    }).catch(err => console.log(err));
   }

   addpost(){
     this.crudservice.addPost(this.user,this.url,this.likes,this.desc).then(()=>{
       this.close();
     });
   }
}
