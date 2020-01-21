import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html'
})
export class GraficoBarraHorizontalComponent implements OnInit, OnDestroy {

  @Input() results: { name: string, value: number  }[] = [];

  // results: any[] = [
  //   {
  //     "name": "Juego 1",
  //     "value": 20
  //   },
  //   {
  //     "name": "Juego 2",
  //     "value": 25
  //   },
  //   {
  //     "name": "Juego 3",
  //     "value": 15
  //   },
  //   {
  //     "name": "Juego 4",
  //     "value": 25
  //   }
  // ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = "nightLights";

  // intervalo;

  constructor() {

    // this.intervalo = setInterval(
    //   () => {

    //     const newResult = [...this.results];

    //     for ( let i in newResult ) {
    //       newResult[i].value = Math.round( Math.random() * 500 );
    //     }

    //     this.results = [...newResult];
    //   },1500
    // );



  }

  
  ngOnInit() {
  }

  ngOnDestroy() {
    // clearInterval( this.intervalo );
  }
  
  onSelect(event) {
    console.log(event);
  }
}
