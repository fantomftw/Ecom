import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   //  $("#menu-toggle").click(function(e) {
   //    e.preventDefault();
   //    $("#wrapper").toggleClass("toggled");
   // });
   // $("#menu-toggle-2").click(function(e) {
   //    e.preventDefault();
   //    $("#wrapper").toggleClass("toggled-2");
   //    $('#menu ul').hide();
   // });

   // $(document).ready(function() {
   //  this.initMenu();
   // });
  }
  
 
 initMenu() {
    $('#menu ul').hide();
    $('#menu ul').children('.current').parent().show();
    //$('#menu ul:first').show();
    $('#menu li a').click(
       function() {
          var checkElement = $(this).next();
          if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
             return false;
          }
          if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
             $('#menu ul:visible').slideUp('normal');
             checkElement.slideDown('normal');
             return false;
          }
       }
    );
 }


}
