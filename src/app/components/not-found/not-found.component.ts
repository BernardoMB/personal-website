import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, AfterViewInit, OnDestroy {
  showEasterEgg = true;
  nyanParams: object = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: false,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "star",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "http://wiki.lexisnexis.com/academic/images/f/fb/Itunes_podcast_icon_300.jpg",
          width: 100,
          height:100
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable:false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 14,
        direction: "left",
        random: false,
        straight: true,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 200,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };
  nyanWidth = 100;
  nyanHeight = 100;
  nyanStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    /* 'z-index': -1, */
  };
  public showPauseButton: boolean = true;

  intervalId: any;

  constructor() { }
  
  ngOnInit(): void {
    /* for (let index = 0; index < 5; index++) {
      let definiteUrl = '';
      const url = 'assets/audio/NyanCatSong.mp3';
      for (let index2 = 0; index2 < index; index2++) {
        definiteUrl += '../'
      }
      definiteUrl += url;
      console.log(definiteUrl);
      this.playAudio(definiteUrl);
    } */

    var myButton: any = document.createElement("button");
    myButton.click();

    var audio: any = document.createElement("AUDIO")
    document.body.appendChild(audio);
    audio.src = '../../../assets/audio/NyanCatSong.mp3';

    document.body.addEventListener("mousemove", function () {
        //audio.play();
    });

    setTimeout(() => {
      this.showPauseButton = false;
    }, 10);
  }

  ngAfterViewInit(): void {
    //this.playAudio2();

    (document.getElementById('video') as any).muted = true; 
    (document.getElementById('video') as any).play();
    
    /* var foo = document.getElementById("foo");
    (foo as any).addEventListener("click", function() {
      display("Clicked");
    }, false);
    setTimeout(function() {
      display("Artificial click:");
      (foo as any).click(); // <==================== The artificial click
    }, 500);

      function display(msg: string) {
        var p = document.createElement('p');
        p.innerHTML = String(msg);
        document.body.appendChild(p);
      } */

    /* setTimeout(() => {
      this.unmute();
    }, 5000); */

    (document.getElementById('video') as any).onplay = function() {
      console.log('Video played');
      this.showPauseButton = true;
    };

    var vid = document.getElementById("video");
    (vid as any).onvolumechange = function() {
      //alert("The volume has been changed!");
      this.showPauseButton = true;
    };

    this.intervalId = setInterval(this.unmute, 1000);
  }

  ngOnDestroy(): void {
    //this.intervalId?.unsubscribe();
    clearInterval(this.intervalId);
  }

  playAudio(url: string) {
    let audio = new Audio(); 
    audio.src = url;
    audio.load();
    //audio.play();
  }
  
  playAudio2() {
    let audio = new Audio(); 
    audio.src = '../../../assets/audio/NyanCatSong.mp3';
    audio.load();
    //audio.play();
  }

  onHover() {
    console.log('Calling on hover method');
    //this.playAudio2();
  }

  async unmute() {
    console.log('unmute');
    var vid = (document.getElementById('video') as any);
    if (vid) {
      vid.muted = false; 
    }
    /* while (true) {
    }  */
  }

  myFunction() {
    console.log('Reacting to onplay event');
  }

  culo() {
    this.showPauseButton = true;
  }

}
