import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() data = [];
  @Input() labels = [];
  @Input() type: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
