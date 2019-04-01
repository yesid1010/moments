import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Camera} from '@ionic-native/camera/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FormComponent} from './components/form/form.component';
import {CommentComponent} from './components/comment/comment.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {AngularFirestoreModule,FirestoreSettingsToken} from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { firebaseConfig } from '../environments/environment';

@NgModule({
  declarations: [AppComponent,FormComponent,CommentComponent],
  entryComponents: [FormComponent,CommentComponent],
  imports: [AngularFireStorageModule,
            AngularFirestoreModule,
            AngularFireAuthModule,
            BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    WebView,
    SocialSharing,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: FirestoreSettingsToken, useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
