import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  buscarPelicula( texto: string){
    if (texto !== undefined && texto !== null && texto.length > 0) {
      this.route.navigate([ 'search', texto ]);
    }
  }

}
