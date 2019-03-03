import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post ,Event } from "../services/user";
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { ReqgeoService } from '../services/reqgeo.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection: AngularFirestoreCollection<Post>;
  eventCollection: AngularFirestoreCollection<Event>;

  public posts: Post[];
  public events:Event[];
  
  userId: string;
  userName: string;


  constructor(public afs: AngularFirestore, public authService: AuthService, public afAuth: AngularFireAuth ,public myGeo:ReqgeoService) {
    this.setUserId();
  }
  
  setUserId(){
    this.authService.afAuth.auth.onAuthStateChanged(s => { this.userId = s.uid; this.userName = s.displayName; })
  }

  //for doctors
  getPosts() {
    this.setUserId();
    setTimeout(() => {
      console.log(this.userId);
     // console.log(this.userName);
      this.postCollection = this.afs.collection('posts', ref => ref.where('author_id', '==', this.userId));
      this.postCollection.snapshotChanges().subscribe((doc) => {
        this.posts = doc.map(data => {
          return data.payload.doc.data();
        });
      })
    }, 3000)
  }

  

  //for doctors
  getEvents() {
    setTimeout(() => {
    //  console.log(this.userId);
      this.eventCollection = this.afs.collection('events');
      this.eventCollection.snapshotChanges().subscribe((doc) => {
        this.events = doc.map(data => {
          return data.payload.doc.data();
        });
      })
    }, 3000)

  }




  createPost(inputData:any) {
    this.myGeo.getLocationForPost();
    setTimeout(() => {
      const data:Post ={ 
        author_id: this.userId,
        title:inputData.title,
        content: inputData.content,
        point:{geopoint:new firebase.firestore.GeoPoint(this.myGeo.latPost,this.myGeo.lngPost), geohash:encode(this.myGeo.latPost,this.myGeo.lngPost,9)}
      }
      this.afs.collection('posts').ref.add(data)
      .then(()=>console.log("posted SuccessFlly"))
      .catch((error)=>console.log(error.message))
    }, 3000);  
  }

  createEvent(inputData:any){
    this.myGeo.getLocationForEvent();
    const data : Event={ 
     // author_id:this.userId,
      link:inputData.link,
      title:inputData.title,
      content:inputData.content,
      point:{geopoint:new firebase.firestore.GeoPoint(this.myGeo.latEvent,this.myGeo.lngEvent), geohash:encode(this.myGeo.latEvent,this.myGeo.lngEvent,9)}
    }
    this.afs.collection('events').ref.add(data).then(()=>console.log("event posted SuccessFlly"))
  }
}













var BASE32_CODES = "0123456789bcdefghjkmnpqrstuvwxyz";
var BASE32_CODES_DICT = {};
for (var i = 0; i < BASE32_CODES.length; i++) {
  BASE32_CODES_DICT[BASE32_CODES.charAt(i)] = i;
}

var ENCODE_AUTO = 'auto';

var MIN_LAT = -90;
var MAX_LAT = 90;
var MIN_LON = -180;
var MAX_LON = 180;
var SIGFIG_HASH_LENGTH = [0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18];

 function encode(latitude, longitude, numberOfChars) {
 if (numberOfChars === ENCODE_AUTO) {
   if (typeof(latitude) === 'number' || typeof(longitude) === 'number') {
     throw new Error('string notation required for auto precision.');
   }
   var decSigFigsLat = latitude.split('.')[1].length;
   var decSigFigsLong = longitude.split('.')[1].length;
   var numberOfSigFigs = Math.max(decSigFigsLat, decSigFigsLong);
   numberOfChars = SIGFIG_HASH_LENGTH[numberOfSigFigs];
 } else if (numberOfChars === undefined) {
   numberOfChars = 9;
 }

 var chars = [],
 bits = 0,
 bitsTotal = 0,
 hash_value = 0,
 maxLat = MAX_LAT,
 minLat = MIN_LAT,
 maxLon = MAX_LON,
 minLon = MIN_LON,
 mid;
 while (chars.length < numberOfChars) {
   if (bitsTotal % 2 === 0) {
     mid = (maxLon + minLon) / 2;
     if (longitude > mid) {
       hash_value = (hash_value << 1) + 1;
       minLon = mid;
     } else {
       hash_value = (hash_value << 1) + 0;
       maxLon = mid;
     }
   } else {
     mid = (maxLat + minLat) / 2;
     if (latitude > mid) {
       hash_value = (hash_value << 1) + 1;
       minLat = mid;
     } else {
       hash_value = (hash_value << 1) + 0;
       maxLat = mid;
     }
   }

   bits++;
   bitsTotal++;
   if (bits === 5) {
     var code = BASE32_CODES[hash_value];
     chars.push(code);
     bits = 0;
     hash_value = 0;
   }
 }
 return chars.join('');
};


































// getPosts() {
  //   this.authService.afAuth.auth.onAuthStateChanged(user => {
  //     if (user) {
  //       this.userId = user.uid;
  //       console.log(this.userId);
  //       this.postCollection = this.afs.collection('posts', ref => ref.where('author_id', '==', this.userId));
  //       return this.postCollection.snapshotChanges().pipe(map(action => {
  //         this.postData = action;
  //         return action.map(a => {
  //           this.postData = a.payload.doc.data() as Post;

  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         })
  //       }))
  //     }
  //   });

  //   // }















//   // getPosts(){
//   //   this.authService.afAuth.auth.onAuthStateChanged(user => {
//   //     if (user) {
//   //       this.userId = user.uid;
//   //       console.log(this.userId);
//   //       this.postCollection =  this.afs.collection('posts', ref =>
//   //       {
//   //         return ref.where('author_id', '==',this.userId);
//   //       })
//   //       
//   //       this.postCollection.valueChanges().subscribe(docs=>{
//   //         this.postData =  docs;
//   //       })
//   //     }
//   //   });
//   //   //console.log(this.posts);
//   // }