import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatChipInputEvent } from '@angular/material';
import { Post } from 'src/app/services/user';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { PostService } from 'src/app/services/post.service';
import { ReqgeoService } from 'src/app/services/reqgeo.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  
  selectedFile:any = null;
  postCollection :AngularFirestoreCollection<Post>;
  tags: Tag[] = [];
  userId: string;



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  constructor(private auth:AuthService ,private postService:PostService ,private myGeo :ReqgeoService ,private storage: AngularFireStorage) { 
    this.postService.setUserId();
    setTimeout(() => {
      this.userId = this.postService.userId;
    }, 3000);
  }

  ngOnInit() {
    this.myGeo.getLocationForPost();
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    this.storage.ref('events\${this.userId}\${file.name}').put(this.selectedFile)
    //upload('events\${this.userId}\${file.name}',this.selectedFile);
  }
}


export interface Tag {
  name: string;
}
