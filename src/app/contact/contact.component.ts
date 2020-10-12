import { Component, OnInit } from '@angular/core';
import '../../assets/js/script.js';

declare var globalstyle: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    globalstyle();
  }

}
