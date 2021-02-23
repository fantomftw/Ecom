import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { CuisineCreateComponent } from '../../../modal/menu/cuisine-create/cuisine-create.component';

@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrls: ['./cuisine-list.component.scss']
})

export class CuisineListComponent implements OnInit , AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  modalRef: MDBModalRef;

  elements: any = [];
  headElements = ['#', 'name', 'description', 'DOJ', 'status', ''];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 10;

  constructor(private cdRef: ChangeDetectorRef, private modalService: MDBModalService, private GlobalService:GlobalService, private baseApp : AppComponent) {}

  openModal() {
    this.modalRef = this.modalService.show(CuisineCreateComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      // class: 'modal-side modal-top-right',
      // containerClass: 'right',
      animated: true
  })
  this.modalRef.content.action.subscribe( (result: any) => { 
    if(result){
      this.getCuisineList();
    }
   });
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    // for (let i = 1; i <= 25; i++) {
    //   this.elements.push({id: i.toString(), first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i});
    // }

    // this.mdbTable.setDataSource(this.elements);
    // this.elements = this.mdbTable.getDataSource();
    // this.previous = this.mdbTable.getDataSource();
    this.getCuisineList();

  }

  getCuisineList(){
    console.log("Getting cuisine list")
    this.GlobalService.getAll('menu/cuisine').subscribe((res)=>{
      console.log("receiving data")
      console.log(res)
      if(res['success']){
        this.elements=res['cuisine'];
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }

    })
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Zone Code ' + this.elements.length,
      last: 'Zone Name ' + this.elements.length,
      handle: 'Zone Note ' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy'});
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  //Configuring Modal Form
 view(id){
  //  console.log(id);
   this.modalRef = this.modalService.show(CuisineCreateComponent, {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: true,
    // class: 'modal-side modal-top-right',
    // containerClass: 'right',
    animated: true,
    data: {
      heading: 'User/Employee',
      id: id
      // content: { heading: 'Content heading', description: 'Content description'}
    }
  })
  this.modalRef.content.action.subscribe( (result: any) => { 
    if(result){
      this.getCuisineList();
    }
   });
 } 

 updateStatus(id){
  this.GlobalService.updateStatus('menu/cuisine/statusUpdate', id).subscribe((res)=>{
    console.log(res)
    if(res['success']){
      this.baseApp.showSuccess(res['success_subject'], res['success_message']);
      this.getCuisineList();
    }else{
      this.baseApp.showError(res['err_subject'], res['err_message']);
    }
  })  
 }

 delete(id){
  console.log(id);
  this.GlobalService.delete('menu/cuisine', id).subscribe((res)=>{
    console.log(res)
    if(res['success']){
      this.baseApp.showSuccess(res['success_subject'], res['success_message']);
      this.getCuisineList();
    }else{
      this.baseApp.showError(res['err_subject'], res['err_message']);
    }
  })  
 }

}
 