import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/firebase/auth.service";
import {Camera} from '@ionic-native/camera/ngx';
import { Router } from "@angular/router";
import { CrudService } from '../../services/firebase/crud.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public  email : string;
  public  name : string;
  public password : string;
  public icon:boolean = true;
  public image;
  url:any;
  constructor(private auth : AuthService, private router : Router,
              private camera: Camera,private crudservice: CrudService) { }

  ngOnInit() {
  }

  OnSubmitRegister(){
    this.auth.register(this.email, this.password,this.name,this.url).then( auth => {
      this.router.navigate(['/home'])
      console.log(auth)
    }).catch(err => console.log(err))
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
     this.icon = false;
    // this.name_img = this.webview.convertFileSrc(imageData); 
    })
  }

  UploadImg(){
    this.crudservice.uploapImg('perfil',this.image).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then((url)=>{
        this.url =  url;
        //call method addpost
        this.OnSubmitRegister();
        this.router.navigate(['/home']);
      });
     
    }).catch(err => console.log(err));
   }


}
