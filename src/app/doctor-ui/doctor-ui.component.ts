import { ApiService } from './../services/api.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-doctor-ui',
  templateUrl: './doctor-ui.component.html',
  styleUrls: ['./doctor-ui.component.css']
})
export class DoctorUiComponent implements OnInit {

  displayedColumns: string[] = ['title', 'subject', 'location', 'address', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService){

  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllEvents();
      }
    })
  }

  getAllEvents(){
    this.api.getEvent()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error! Try again');
      }
    })
  }

  editEvent(row: any){
    this.dialog.open(DialogComponent ,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllEvents();
      }
    })
  }

  deleteEvent(id: number){
    this.api.deleteEvent(id)
    .subscribe({
      next: (res) => {
        alert('Event Deleted Successfully!');
        this.getAllEvents();
      },
      error: (err) => {
        alert('Error! Try again');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
