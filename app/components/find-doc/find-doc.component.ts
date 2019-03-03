import { Component, OnInit } from '@angular/core';
import { ReqgeoService } from 'src/app/services/reqgeo.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-find-doc',
  templateUrl: './find-doc.component.html',
  styleUrls: ['./find-doc.component.css']
})
export class FindDocComponent implements OnInit {
  docList:any[];
  userName:string;
  constructor(public myGeo:ReqgeoService ,public authService:AuthService) {/*this.userName = this.authService.afAuth.auth.currentUser.displayName*/ }
  // setUserId(){
  //   this.authService.afAuth.auth.onAuthStateChanged(s => { this.userName = s.displayName; })
  // }

  ngOnInit() {
    this.myGeo.getLocationForUser();
    setTimeout(() => {
      const doctorCollection = this.myGeo.geo.collection('doctors');
      const center = this.myGeo.geo.point(this.myGeo.latUser,this.myGeo.lngUser);
      let radius = 500;
      const field = 'point';
      const query = doctorCollection.within(center, radius, field);
      query.subscribe(a =>{this.docList = a;console.log(a)} );
    }, 3000);
  }

}
