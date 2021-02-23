import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/administration/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { SalesComponent } from '../../sales.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit , AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = []; 
  headElements = ['#', 'Order id', 'Customer Name', 'Payment Date', 'Transaction ID', 'Amount',   'Status', 'Action'];
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;
  tableStatus=false;

  constructor(private router:Router, private cdRef: ChangeDetectorRef, private GlobalService:GlobalService, private baseApp : AppComponent, private windowTitle:SalesComponent) {
    windowTitle.title="Sales List"
  }

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
    this.GlobalService.getAll('order').subscribe((res)=>{
      console.log(res)
      if(res['status']){
        this.tableStatus=true;
      this.elements=res['Order'];
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


}
