import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';
import { map  } from "rxjs/operators";

export interface posts {
  user: string,
  img : string,
  description : string,
  likes : string,
  id:string
} 

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url:any;
  constructor( private firestore:AngularFirestore,
               private store : AngularFireStorage) { }

  getPost(){ 
    return this.firestore.collection('post').snapshotChanges().pipe(map(posts => {
      return posts.map(a =>{
        const data = a.payload.doc.data() as posts;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getPostUser(user){ 
    return this.firestore.collection('post',ref => ref.where('idUs','==',user)).snapshotChanges().pipe(map(posts => {
      return posts.map(a =>{
        const data = a.payload.doc.data() as posts;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }


  // usuario logueado
  getUser(user:any){
    let users;
    return  users = this.firestore.collection('users').doc(user).get().pipe(map(data=>{
       if(data.exists){
         return data.data();
       }
    }))    
  }

  // guardo la imagen en firebase storage y devuelvo la url de dicha imagen
  uploapImg(carpeta,img){
    const rand = Math.floor((Math.random()*645)*8);
    const rand2=Math.floor((Math.random()*45)*82);
    return new Promise<any>((resolve,reject)=>{
      const foto = this.store.ref(carpeta+'/foto'+rand+rand2);
      foto.putString(img,'data_url').then(snapshot => {
        snapshot.ref.getDownloadURL()
        .then(res => resolve(res))
      }, err =>{
          reject(err);
      })
    })
  }


  addPost(idUser:any,name:any,imgU:any,image:string,like,desc:string){

   const id = this.firestore.createId();
   return  this.firestore.collection('post').doc(id).set({
      idUs : idUser,
      user : name,
      imgU : imgU,
      image :image,
      likes : like,
      description : desc,
    })
  }
}
