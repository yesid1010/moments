import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url:any;
  constructor( private firestore:AngularFirestore,
               private store : AngularFireStorage) { }

  getPost(){
    return this.firestore.collection('post').snapshotChanges();
  }

  uploapImg(img,name_img){
    const foto = this.store.ref('images/mif');
   return foto.putString(img,'data_url'); 
  }


  addPost(name:string,image:string,like:string,desc:string){

    const id = this.firestore.createId();
   return  this.firestore.collection('post').doc(id).set({
      user : name,
      image :image,
      likes : like,
      description : desc
    })
  }
}
