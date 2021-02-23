import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("ul.vertical-nav-menu li ul").attr("style", "display:none")
    
    $('ul.vertical-nav-menu li a').click(function(){
        $("ul.vertical-nav-menu li.mm-active ul").attr("style", "display:none")
        $('ul.vertical-nav-menu li.mm-active').removeClass("mm-active")
        $('ul.vertical-nav-menu li a.mm-active').removeClass("mm-active")

        let current = $(this)
        // console.log("adding class")
        current.parent().addClass("mm-active")
        current.addClass("mm-active")
        $("ul.vertical-nav-menu li.mm-active ul").attr("style", "display:block")
    })

    $('ul.vertical-nav-menu li ul a').click(function(){
      let current = $(this)
      // console.log("adding class", current)
      current.parent().parent().parent().addClass("mm-active")
      current.addClass("mm-active")
      $("ul.vertical-nav-menu li.mm-active ul").attr("style", "display:block")
    })
  }

}
