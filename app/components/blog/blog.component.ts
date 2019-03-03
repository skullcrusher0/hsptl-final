import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from 'src/app/services/user';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  postCollection:AngularFirestoreCollection<Post>;
  posts:Post[];
  //  let id;
  // url = "http://localhost/" + encodeURIComponent('');

  // document.getElementById("mylink").href = url;
  constructor(public authService:AuthService) { }

  ngOnInit() {
    
    this.postCollection.valueChanges().subscribe(a=>
      setTimeout(() => {
        this.posts = a
      }, 1000)
    );
  }
}
