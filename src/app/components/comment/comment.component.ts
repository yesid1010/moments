import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  comments: any   = [
    {nombre :'yesid', comment:'es simplemente el texto de relleno de las imprentas y archivos de texto.', ruta : 'assets/img/client-1.jpg'},
    {nombre :'nelly', comment:'Jugando el lunes', ruta : 'assets/img/client-2.jpg'},
    {nombre :'gabriel', comment:'Jugando el sabado', ruta : 'assets/img/team-1.jpg'},
    {nombre :'eris', comment:'Jugando el martes', ruta : 'assets/img/team-2.jpg'},
    {nombre :'yamid', comment:'Jugando el viernes', ruta : 'assets/img/team-3.jpg'},
  ]
  img:any;
  constructor(private modal : ModalController) { }

  ngOnInit() {
    this.img = 'assets/img/team-1.jpg';
  }

  close(){
    this.modal.dismiss();
  }

}
