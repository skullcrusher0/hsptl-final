import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as geofirex from 'geofirex';
import { GeoQueryDocument } from 'geofirex';
//import * as f from '@firebase/firestore-types';


// import * as geoConvert from 'ngeohash';

firebase.initializeApp({
  projectId: "hsptl-bd82f",
  apiKey: "AIzaSyD9rusQbtTj2rOBxHJ-pbw_p5behA3xN6Y",
  authDomain: "hsptl-bd82f.firebaseapp.com",
})
@Injectable({
  providedIn: 'root'
})

export class ReqgeoService {
  latPost: any;
  lngPost: any;
  latDoc: any;
  lngDoc: any;
  latEvent: any;
  lngEvent: any;
  latUser:any;
  lngUser:any;

  geo = geofirex.init(firebase.app());
  posts: GeoQueryDocument[];
  constructor() { }



  getLocationForPost() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latPost = position.coords.latitude;
        this.lngPost= position.coords.longitude;
      });
    }
  }

  getLocationForDoctor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latDoc = position.coords.latitude;
        this.lngDoc = position.coords.longitude;
      });
    }
  }

  getLocationForUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latUser = position.coords.latitude;
        this.lngUser = position.coords.longitude;
      });
    }
  }

  getLocationForEvent() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latEvent = position.coords.latitude;
        this.lngEvent = position.coords.longitude;
      });
    }
  }

  // getPostsForUser() {
  //   this.getLocationForUser();
  //   setTimeout(() => {
  //     const postCollection = this.geo.collection('posts');
  //     const center = this.geo.point(this.latUser,this.lngUser);
  //     let radius = 5;
  //     const field = 'point';
  //     const query = postCollection.within(center, radius, field);
  //     query.subscribe(a =>{this.posts = a;console.log(a)} );
  //   }, 3000);
  // }

  // getEventsForUser(){
  //   this.getLocationForUser();
  //   setTimeout(() => {
  //     const postCollection = this.geo.collection('posts');
  //     const center = this.geo.point(this.latUser,this.lngUser);
  //     let radius = 5;
  //     const field = 'point';
  //     const query = postCollection.within(center, radius, field);
  //     query.subscribe(a =>this.posts = a );
  //   }, 3000);
  // }



}



