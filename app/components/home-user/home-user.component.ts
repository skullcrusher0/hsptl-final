import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReqgeoService } from 'src/app/services/reqgeo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostService } from 'src/app/services/post.service';



@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})


export class HomeUserComponent implements OnInit {
  // path:'../home-user';
  userId: string;
  userName: string;
  posts: any;
  events: any;
  constructor(public authService: AuthService, public afs: AngularFirestore, public myGeo: ReqgeoService, public postService: PostService) {

  }

  ngOnInit() {
    this.myGeo.getLocationForUser();
    setTimeout(() => {
      const postCollection = this.myGeo.geo.collection('posts');
      const eventCollection = this.myGeo.geo.collection('events');
      const center = this.myGeo.geo.point(this.myGeo.latUser, this.myGeo.lngUser);
      let radius = 500;
      const field = 'point';
      const queryPost = postCollection.within(center, radius, field);
      const queryEvent = eventCollection.within(center, radius, field);
      queryPost.subscribe(a => {
        console.log(a)
        setTimeout(() => {
          this.posts = a;
        }, 2000);
      });
      queryEvent.subscribe(a => {
        console.log(a)
        setTimeout(() => {
          this.events = a;
        }, 2000);
      });
    }, 3000);

  }
}



