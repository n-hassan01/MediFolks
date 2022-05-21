import { ApiService } from './../../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  divisions = [
    'Dhaka',
    'Rajshahi',
    'Chattogram',
    'Sylhet',
    'Mymensingh',
    'Rangpur',
    'Khulna',
    'Barishal'
  ]

  subjects = [
    'Heart',
    'Kidney',
    'ENT',
    'Dental',
    'Medicine',
    'Eye',
    'Gyne',
    'Nutrition',
    'Rheumatology',
    'Diabetese',
    'Orthopedics',
    'Neurology',
    'Psychiatry'

  ]

  eventForm !: FormGroup;
  actionBtn: string = 'Save';

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      title: ['',Validators.required],
      subject: ['',Validators.required],
      location: ['',Validators.required],
      address: ['',Validators.required],
      date: ['',Validators.required]
  })

  if(this.editData){
    this.actionBtn = 'Update';
    this.eventForm.controls['title'].setValue(this.editData.title);
    this.eventForm.controls['subject'].setValue(this.editData.subjct);
    this.eventForm.controls['location'].setValue(this.editData.location);
    this.eventForm.controls['address'].setValue(this.editData.address);
    this.eventForm.controls['date'].setValue(this.editData.date);
  }

  }

  saveEvent(){
    if(!this.editData){
      if(this.eventForm.valid){
        this.api.postEvent(this.eventForm.value)
        .subscribe({
          next: (res) => {
            alert('Event Created Successfully!');
            this.eventForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('Error! Try again');
          }
        })
      }
    }
    else{
      this.updateEvent();
    }
  }

  updateEvent(){
    this.api.putEvent(this.eventForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert('Event Updated Successfully!');
        this.eventForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Error! Try again');
      }
    })
  }

}
