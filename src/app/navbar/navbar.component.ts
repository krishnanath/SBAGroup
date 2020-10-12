import { Component, OnInit } from '@angular/core';
import '../../assets/js/script.js';


declare var globalstyle: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    globalstyle();

  }

}
