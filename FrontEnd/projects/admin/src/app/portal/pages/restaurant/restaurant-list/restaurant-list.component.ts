import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { environment } from 'projects/shared/src/environments/environment';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  modalRef: MDBModalRef;

  elements: any = [];
  headElements = ['#', 'image','name', 'Restaurant Name', 'Cuisine', 'DOR', 'Acc. status', ''];

  baseurl = environment.baseUrl;

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 10;

  status;

  //Counts
  totalItem=0;
  activeItem=0;
  inactiveItem=0;
  requestItem=0;
  deactivateItem=0;

  constructor(private cdRef: ChangeDetectorRef, private route:ActivatedRoute, private router:Router, private modalService: MDBModalService, private GlobalService:GlobalService, private baseApp : AppComponent) {}



  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.getItemList();
    // this.getCount();
  }
  getCount(){
    this.GlobalService.getAll("menu/item/count").subscribe((res)=>{
      console.log(res);
      this.totalItem=res['totalCount'];
      this.activeItem=res['active'];
      this.inactiveItem=res['inactive'];
      this.requestItem=res['request'];
      this.deactivateItem=res['deactivate'];

    })
  }

  getItemList(){
    console.log("Getting cuisine list")
    this.status=this.route.snapshot.params.status;
    if(this.status){
      this.elements=[]
      this.GlobalService.getAll('menu/item/s/'+this.status).subscribe((res)=>{
        console.log("receiving data")
        console.log(res)
        if(res['success']){
          this.elements=res['item'];
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
      })
    }else{
      this.GlobalService.getAll('restaurant').subscribe((res)=>{
        console.log("receiving data")
        console.log(res)
        if(res['success']){
          this.elements=res['restaurant'];
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
      })
    }


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
  this.router.navigate(['/restaurant', id])
 } 

 updateStatus(id){
  this.GlobalService.updateStatus('restaurant/statusUpdate', id).subscribe((res)=>{
    console.log(res)
    if(res['success']){
      this.baseApp.showSuccess(res['success_subject'], res['success_message']);
      this.getItemList();
    }else{
      this.baseApp.showError(res['err_subject'], res['err_message']);
    }
  })  
 }

 delete(id){
  console.log(id);
  this.GlobalService.delete('restaurant', id).subscribe((res)=>{
    console.log(res)
    if(res['success']){
      this.baseApp.showSuccess(res['success_subject'], res['success_message']);
      this.getItemList();
    }else{
      this.baseApp.showError(res['err_subject'], res['err_message']);
    }
  })  
 }

}
 