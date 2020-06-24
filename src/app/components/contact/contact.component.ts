import { Component, OnInit, ViewChild } from '@angular/core';
//import { $ } from 'protractor';
declare var $: any; //Permite el uso del signo dolar en el componente

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider: number;
  public anchuraToSlider: number;
  public captions: boolean;
  public autor: any;

  @ViewChild('textos', {static: true}) textos; //Los ViewChild permiten lo mismo que el DOM en javascript native

  constructor() {
    this.anchuraToSlider = 0;
    this.captions = false;
  }

  ngOnInit(): void {
    var contenido = document.querySelector('#texto').innerHTML;
    console.log(this.textos);
  }

  cargarSlider() {
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider() {
    this.anchuraToSlider = null;
  }

  getAutor(event){
    this.autor = event;
  }

}
