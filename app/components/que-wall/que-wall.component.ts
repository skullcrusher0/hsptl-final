


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognizerService } from 'src/app/services/shared/services/speech-recognizer.service';

import { SpeechNotification } from 'src/app/services/shared/model/speech-notification';
import { SpeechError } from 'src/app/services/shared/model/speech-error';
import { ActionContext } from 'src/app/services/shared/model/strategy/action-context';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-que-wall',
  templateUrl: './que-wall.component.html',
  styleUrls: ['./que-wall.component.css']
})


export class QueWallComponent implements OnInit {

  finalTranscript = '';
  recognizing = false;
  notification: string;
  languages: string[] =  ['hi-IN','en-IN','gu','ta','ml','kn'];
  currentLanguage: string;
  actionContext: ActionContext = new ActionContext();
  userId: string;
  userName: string;

  constructor(private changeDetector: ChangeDetectorRef, private speechRecognizer: SpeechRecognizerService,private postService:PostService) {
    this.postService.setUserId(); }

  ngOnInit() {
    setTimeout(() => {
      this.userId  = this.postService.userId;
     // this.userName = this.postService.userName;
      console.log(this.postService.userId);
    }, 3000);
    console.log();
    this.currentLanguage = this.languages[0];
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;
  }

  startButton(event) {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      return;
    }

    this.speechRecognizer.start(event.timeStamp);
  }

  onSelectLanguage(language: string) {
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          this.actionContext.processMessage(message, this.currentLanguage);
          this.detectChanges();
          this.actionContext.runAction(message, this.currentLanguage);
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }



}



























// import { Component, OnInit } from '@angular/core';
// //import { registerContentQuery } from '@angular/core/src/render3';



// @Component({
//   selector: 'app-que-wall',
//   templateUrl: './que-wall.component.html',
//   styleUrls: ['./que-wall.component.css']
// })
// export class QueWallComponent implements OnInit {
//  // speech: SpeechRecognition = new SpeechRecognition();
//   stringValue:string;
//   final_transcript:string;
//   interim_transcript :string;
//   recognizing:boolean;

//   constructor() { }


//    langs :any= [
//     ['Afrikaans', ['af-ZA']],
//     ['አማርኛ', ['am-ET']],
//     ['Azərbaycanca', ['az-AZ']],
//     ['বাংলা', ['bn-BD', 'বাংলাদেশ'],
//         ['bn-IN', 'ভারত']
//     ],
//     ['Bahasa Indonesia', ['id-ID']],
//     ['Bahasa Melayu', ['ms-MY']],
//     ['Català', ['ca-ES']],
//     ['Čeština', ['cs-CZ']],
//     ['Dansk', ['da-DK']],
//     ['Deutsch', ['de-DE']],
//     ['English', ['en-AU', 'Australia'],
//         ['en-CA', 'Canada'],
//         ['en-IN', 'India'],
//         ['en-KE', 'Kenya'],
//         ['en-TZ', 'Tanzania'],
//         ['en-GH', 'Ghana'],
//         ['en-NZ', 'New Zealand'],
//         ['en-NG', 'Nigeria'],
//         ['en-ZA', 'South Africa'],
//         ['en-PH', 'Philippines'],
//         ['en-GB', 'United Kingdom'],
//         ['en-US', 'United States']
//     ],
//     ['Español', ['es-AR', 'Argentina'],
//         ['es-BO', 'Bolivia'],
//         ['es-CL', 'Chile'],
//         ['es-CO', 'Colombia'],
//         ['es-CR', 'Costa Rica'],
//         ['es-EC', 'Ecuador'],
//         ['es-SV', 'El Salvador'],
//         ['es-ES', 'España'],
//         ['es-US', 'Estados Unidos'],
//         ['es-GT', 'Guatemala'],
//         ['es-HN', 'Honduras'],
//         ['es-MX', 'México'],
//         ['es-NI', 'Nicaragua'],
//         ['es-PA', 'Panamá'],
//         ['es-PY', 'Paraguay'],
//         ['es-PE', 'Perú'],
//         ['es-PR', 'Puerto Rico'],
//         ['es-DO', 'República Dominicana'],
//         ['es-UY', 'Uruguay'],
//         ['es-VE', 'Venezuela']
//     ],
//     ['Euskara', ['eu-ES']],
//     ['Filipino', ['fil-PH']],
//     ['Français', ['fr-FR']],
//     ['Basa Jawa', ['jv-ID']],
//     ['Galego', ['gl-ES']],
//     ['ગુજરાતી', ['gu-IN']],
//     ['Hrvatski', ['hr-HR']],
//     ['IsiZulu', ['zu-ZA']],
//     ['Íslenska', ['is-IS']],
//     ['Italiano', ['it-IT', 'Italia'],
//         ['it-CH', 'Svizzera']
//     ],
//     ['ಕನ್ನಡ', ['kn-IN']],
//     ['ភាសាខ្មែរ', ['km-KH']],
//     ['Latviešu', ['lv-LV']],
//     ['Lietuvių', ['lt-LT']],
//     ['മലയാളം', ['ml-IN']],
//     ['मराठी', ['mr-IN']],
//     ['Magyar', ['hu-HU']],
//     ['ລາວ', ['lo-LA']],
//     ['Nederlands', ['nl-NL']],
//     ['नेपाली भाषा', ['ne-NP']],
//     ['Norsk bokmål', ['nb-NO']],
//     ['Polski', ['pl-PL']],
//     ['Português', ['pt-BR', 'Brasil'],
//         ['pt-PT', 'Portugal']
//     ],
//     ['Română', ['ro-RO']],
//     ['සිංහල', ['si-LK']],
//     ['Slovenščina', ['sl-SI']],
//     ['Basa Sunda', ['su-ID']],
//     ['Slovenčina', ['sk-SK']],
//     ['Suomi', ['fi-FI']],
//     ['Svenska', ['sv-SE']],
//     ['Kiswahili', ['sw-TZ', 'Tanzania'],
//         ['sw-KE', 'Kenya']
//     ],
//     ['ქართული', ['ka-GE']],
//     ['Հայերեն', ['hy-AM']],
//     ['தமிழ்', ['ta-IN', 'இந்தியா'],
//         ['ta-SG', 'சிங்கப்பூர்'],
//         ['ta-LK', 'இலங்கை'],
//         ['ta-MY', 'மலேசியா']
//     ],
//     ['తెలుగు', ['te-IN']],
//     ['Tiếng Việt', ['vi-VN']],
//     ['Türkçe', ['tr-TR']],
//     ['اُردُو', ['ur-PK', 'پاکستان'],
//         ['ur-IN', 'بھارت']
//     ],
//     ['Ελληνικά', ['el-GR']],
//     ['български', ['bg-BG']],
//     ['Pусский', ['ru-RU']],
//     ['Српски', ['sr-RS']],
//     ['Українська', ['uk-UA']],
//     ['한국어', ['ko-KR']],
//     ['中文', ['cmn-Hans-CN', '普通话 (中国大陆)'],
//         ['cmn-Hans-HK', '普通话 (香港)'],
//         ['cmn-Hant-TW', '中文 (台灣)'],
//         ['yue-Hant-HK', '粵語 (香港)']
//     ],
//     ['日本語', ['ja-JP']],
//     ['हिन्दी', ['hi-IN']],
//     ['ภาษาไทย', ['th-TH']]
// ];

//   ngOnInit() {

//   }

  

    
  
// }
