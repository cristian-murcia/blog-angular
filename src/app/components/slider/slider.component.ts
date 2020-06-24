import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() anchura: number;
  @Input() captions: boolean;

  @Output() conseguirAutor = new EventEmitter();

  public autor: any;

  constructor() {
    this.autor = {
      nombre: "Cristian Guzman",
      edad: 22,
      profesion: "Desarrollador web y movil"
    }
  }

  ngOnInit(): void {
    $('.bxslider').bxSlider({
      mode: 'fade',
      captions: this.captions,
      slideWidth: this.anchura
    });
  }

  lanzar(event) {
    console.log(event);
    this.conseguirAutor.emit(this.autor);
  }

}
