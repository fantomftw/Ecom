import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/administration/src/app/app.component';
import { InvoiceComponent } from 'projects/administration/src/app/portal/models/invoice/invoice.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { SalesComponent } from '../../../sales.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = []; 
  headElements = ['#', 'Order id', 'Customer Name', 'Item Count', 'Total Items', 'Total Cost', 'Order Date', 'Order Updated','Status', 'Action'];
  searchText: string = '';
  previous: string;
  
  modalRef: MDBModalRef;


  maxVisibleItems: number = 8;
  tableStatus=false;

  constructor(private router:Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private modalService: MDBModalService, private GlobalService:GlobalService, private baseApp : AppComponent, private windowTitle:SalesComponent) {
    windowTitle.title="Sales List"
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('status');
    if(id){
      this.getListByFilter(id);
    }else{
      this.getList();

    }
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getList(){
    this.GlobalService.getAll('order').subscribe((res)=>{
      console.log('Order ---- ',res)
      if(res['success']){
        this.tableStatus=true;
          if(res['orders'])
          { 
            this.elements=res['orders'];
            this.mdbTable.setDataSource(this.elements);
            this.elements = this.mdbTable.getDataSource();
            this.previous = this.mdbTable.getDataSource();  
          }else{
            this.elements=[]
          }
    }else{
        this.tableStatus=false;
        this.elements=[]
      }
    })
  }

  getListByFilter(id){
    this.GlobalService.getById('order/getbystatus', id).subscribe((res)=>{
      console.log('Order ---- ',res)
      if(res['success']){
        this.tableStatus=true;
        this.elements=res['orders'];
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

  updateStatus(id){
    this.GlobalService.updateStatus('user', id).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.baseApp.showSuccess(res['success_subject'], res['success_message']);
        
        // this.getUserList();
      }else{
        this.baseApp.showError(res['err_subject'], res['err_message']);
      }
    })  
   }
   delete(id){
    console.log(id);
    this.GlobalService.delete('user', id).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.baseApp.showSuccess(res['success_subject'], res['success_message']);
        // this.getUserList();
      }else{
        this.baseApp.showError(res['err_subject'], res['err_message']);
      }
    })
  }

  
  view(orderId){
    this.modalRef = this.modalService.show(InvoiceComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog modal-notify modal-fluid',
      containerClass: '',
      animated: true,
      data: {
        orderId: orderId,
        // subCategoryId : this.subCategoryId
      }
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
