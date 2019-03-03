import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
 
  constructor() { }

  speech:SpeechRecognition=new SpeechRecognition();

  startRecord(){
    this.speech.onstart(event);
  }



}