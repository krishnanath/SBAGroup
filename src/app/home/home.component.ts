import { Component, OnInit } from '@angular/core';
import '../../assets/js/script.js';

declare var globalstyle: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  card = [
    {
      img:'https://d39l2hkdp2esp1.cloudfront.net/img/photo/163475/163475_00_2x.jpg',
      title:'Permanent Residence Visa',
      des:'Skilled workers visas are designed to target skill shortages, diversify the business expertise and escalate entrepreneurial talent.'
    },
    {
      img:'https://cf.ltkcdn.net/fashion-history/images/std/207732-658x450-Women-with-men-in-business-suits.jpg',
      title:'Business Immigration Visa',
      des:'All thanks to globalization!  Owing to the rising economy and growth in international trade, there is a large influx of business immigrants.'
    },
    {
      img:'https://onlinestudentshub.com/wp-content/uploads/2018/11/Study-in-Sweden-Cost-of-Living-Study-Scholarships-How-to-Apply-and-List-of-Top-and-Low-Tuition-Universities.jpg',
      title:'Student/ Study Visa',
      des:'Student Visas are exclusively issued to applicants whose prime purpose of visit to the country is the pursuit of education'
    },
    {
      img:'https://www.immilawglobal.com/wp-content/uploads/2019/02/family-visa-consultants.jpg',
      title:'Visitor Visa',
      des:'To have a hassle free vacation or a business trip at any international destination, one need to duly fulfill all the formalities regarding to the country  '
    },
    {
      img:'https://www.immilawglobal.com/wp-content/uploads/2019/02/visitor-visa-consultants.jpg',
      title:'Family Visa',
      des:'Are you the one who can’t live separately from the family? Don’t worry, now shifting to a foreign land along your family is not at all an uphill task.'
    },
    {
      img:'https://www.immilawglobal.com/wp-content/uploads/2019/02/work-permit-visa-consultants.jpg',
      title:'Work Permit Visa',
      des:'A work permit can be simply defined as a record of the authorization and completion of specific work. Work Permit Visa has a number of layers'
    },
   
  ]


  destinations =[{

  }]

  about_us=[
    {
      title:'',
      des:'Founded in 2008, SBA Group Services is an overseas education consultancy headquartered in Kochi. Over the years, the success we have been able to achieve can be aptly described in terms of the credibility we have established with our clients. We are one of the few agencies in India to be accredited with an AAERI membership.',
   des2:'From dedicated counselling sessions, identifying the right university for students, facilitating student loans to successful processing of visas, we offer a complete and curated pathway for our clients to take the next step towards a promising tomorrow. As one of the leading overseas education consultants in the state, SBA Group Services aims to push the boundaries of ensuring comprehensive services for each and every student who wishes to fulfil their dreams of studying abroad.'
   
  }
  ]
  constructor() { }

  ngOnInit(): void {

    globalstyle();

  }

}
