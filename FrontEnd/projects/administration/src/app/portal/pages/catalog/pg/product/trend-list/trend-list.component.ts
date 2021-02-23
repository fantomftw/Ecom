import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/administration/src/app/app.component';
import { AddTrendComponent } from 'projects/administration/src/app/portal/models/catalog/add-trend/add-trend.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-trend-list',
  templateUrl: './trend-list.component.html',
  styleUrls: ['./trend-list.component.scss']
})
export class TrendListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['id', 'Image', 'Trend Name', 'Description', 'Created On','Status', 'Action'];

  searchText: string = '';
  previous: string;
  modalRef: MDBModalRef;

  maxVisibleItems: number = 8;
  tableStatus=false;

  constructor(private router:Router,private modalService: MDBModalService, private cdRef: ChangeDetectorRef, private GlobalService:GlobalService, private baseApp : AppComponent) {}

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.getList();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getList(){
    this.GlobalService.getAll('catalog/trend').subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.tableStatus=true;
      this.elements=res['trend'];
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();  
    }else{
        this.tableStatus=false;
      }
    })
  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length,
      handle1: 'Handle ' + this.elements.length

    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy', handle1: 'Kopytkowy'});
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

  view(id){
    console.log(id);
  //  this.router.navigate(['vouchers', id]);
 
  } 
  updateStatus(id){
    this.GlobalService.updateStatus('catalog/trend/status', id).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.baseApp.showSuccess(res['success_subject'], res['success_message']);
        
        this.getList();
      }else{
        this.baseApp.showError(res['err_subject'], res['err_message']);
      }
    })  
   }
   delete(id){
    console.log(id);
    this.GlobalService.delete('catalog/trend', id).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.baseApp.showSuccess(res['success_subject'], res['success_message']);
        this.getList();
      }else{
        this.baseApp.showError(res['err_subject'], res['err_message']);
      }
    })
  }


  openModal(){
    this.modalRef = this.modalService.show(AddTrendComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'cascading-modal',
      containerClass: '',
      animated: true
  });

    this.modalRef.content.action.subscribe( (result: any) => { 
      console.log(result); 
      console.log("modal response")
      console.log(result); 
      if(result['success']){
        this.baseApp.showSuccess(result['success_subject'], result['success_message']);
        this.getList();
      }else{
        for(let i=0; i<result['err_message'].length; i++){
          this.baseApp.showError(result['err_subject'], result['err_message'][i]);
        }
      }
    });
  }

}
