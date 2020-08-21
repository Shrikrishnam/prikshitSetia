import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../_services';

export class Fitness {
  constructor(
      public inr: number, public paisa: number, public streetaddress: string,
      public city: string, public state: string, public country: string,
      public pincode: number, public phonenumber: number, public email: string,
      public firstname: string, public lastname: string, public age: number,
      public trainerpreference: string, public physiotherapist: string,
      public packages: string, public id: number) {}
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  constructor(
      private formBuilder: FormBuilder, private user: UserService,
      private router: Router) {}
  packages: string[] = ['Basic', 'Standard', 'Elite'];
  choosen: boolean = false;

  fitnessForm = this.formBuilder.group({
    inr: [''],
    paisa: [''],
    streetaddress: [''],
    city: [''],
    state: [''],
    country: [''],
    pincode: [''],
    phonenumber: [''],
    email: [''],
    firstname: [''],
    lastname: [''],
    age: [''],
    trainerpreference: [''],
    physiotherapist: [''],
    packages: [''],
  });
  selectPackage(value:string){
    if(value=="Basic"){
      this.fitnessForm.controls.inr.setValue(500);
      this.fitnessForm.controls.paisa.setValue(100);
    }
    else if(value=="Standard"){
      this.fitnessForm.controls.inr.setValue(700);
      this.fitnessForm.controls.paisa.setValue(100);
    }
    else if(value=="Elite"){
      this.fitnessForm.controls.inr.setValue(1000);
      this.fitnessForm.controls.paisa.setValue(100);
    }

  }
  ngOnInit() {
    this.fitnessForm = this.formBuilder.group({
      firstname: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z_-]{1,}$')],
      ],
      lastname: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z_-]{1,}$')],
      ],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      streetaddress: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      packages: ['', [Validators.required]],
      physiotherapist: ['', [Validators.required]],
      trainerpreference: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      pincode: [
        '',
        [Validators.required, Validators.min(100000), Validators.max(999999),Validators.minLength(6),Validators.maxLength(6)],
      ],
      inr: ['', [Validators.required]],
      paisa: ['', [Validators.required,Validators.min(1), Validators.max(100)]],
    });
  }

  onSubmit() {
    console.log(this.fitnessForm.status);
    if (this.fitnessForm.status === 'VALID') {
      this.user.postfitnessdata(this.fitnessForm.value)
          .subscribe(
              (data) => {
                console.log(data);
              },
              (error) => {
                console.log(error);
              });
      this.router.navigateByUrl('view-appointment');
    }
  }
}
