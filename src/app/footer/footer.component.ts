import { Component, OnInit } from '@angular/core';
import '../../assets/js/script.js';

declare var globalstyle: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    globalstyle();

  }

}
