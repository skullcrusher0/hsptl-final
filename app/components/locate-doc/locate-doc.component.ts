import { Component, OnInit } from '@angular/core';
import { ReqgeoService } from 'src/app/services/reqgeo.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-locate-doc',
  templateUrl: './locate-doc.component.html',
  styleUrls: ['./locate-doc.component.css']
})
export class LocateDocComponent implements OnInit {
  lat:number;
  lng:number;
  constructor(public myGeo :ReqgeoService , public afs : AngularFirestore) { }

  ngOnInit() {

  }

}
