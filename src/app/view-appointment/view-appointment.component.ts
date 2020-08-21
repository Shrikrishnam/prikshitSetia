import { Component, OnInit, ɵɵcontainerRefreshEnd } from "@angular/core";
import { UserService } from "../_services";
import { Router } from "@angular/router";
import { User } from "../user";
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.component.html",
})
export class ViewAppointmentComponent implements OnInit {
  users: User[] = [];
  selecteduser: User;
  show:boolean=false;
  packages: string[] = ['Basic', 'Standard', 'Elite'];
  headers = [
    "SL NO",
    "Name",
    "Address",
    "City",
    "Package",
    "Trainer Preference",
    "Phone",

  ];
  updateForm = this.formBuilder.group({
    inr: [""],
    paisa: [""],
    streetaddress: [""],
    city: [""],
    state: [""],
    country: [""],
    pincode: [""],
    phonenumber: [""],
    email: [""],
    firstname: [""],
    lastname: [""],
    age: [""],
    trainerpreference: [""],
    physiotherapist: [""],
    packages: [""],
  });
  constructor(private user: UserService, private router: Router,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.user.getfitnessdata().subscribe((data) => {
      this.users = [];
      data.forEach(
        (element) => {
          this.users.push(element);
          //console.log(element);
        },
        (error) => console.log(error)
      );
    });
    
  }
  delete(id:number) {
    const a = confirm(
      "Your Appointment will be canceled. Do you still want to Delete"
    );
    if (a == true) {
      this.user.deletefitnessdata(id).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
      this.router.navigateByUrl("landing-page");
    }
  }
  update(data) {
    this.show = !this.show;
    this.selecteduser=data;
    this.updateForm = this.formBuilder.group({
      firstname: [
        this.selecteduser.firstname,
        [Validators.required, Validators.pattern('^[a-zA-Z_-]{1,}$')],
      ],
      lastname: [
        this.selecteduser.lastname,
        [Validators.required, Validators.pattern('^[a-zA-Z_-]{1,}$')],
      ],
      email: [this.selecteduser.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      city: [this.selecteduser.city, [Validators.required]],
      state: [this.selecteduser.state, [Validators.required]],
      country: [this.selecteduser.country, [Validators.required]],
      streetaddress: [this.selecteduser.streetaddress, [Validators.required]],
      age: [this.selecteduser.age, [Validators.required, Validators.min(18), Validators.max(60)]],
      packages: [this.selecteduser.packages, [Validators.required]],
      physiotherapist: [this.selecteduser.physiotherapist, [Validators.required]],
      trainerpreference: [this.selecteduser.trainerpreference, [Validators.required]],
      phonenumber: [this.selecteduser.phonenumber, [Validators.required]],
      pincode: [
        this.selecteduser.pincode,
        [Validators.required, Validators.min(100000), Validators.max(999999),Validators.minLength(6),Validators.maxLength(6)],
      ],
      inr: [this.selecteduser.inr, [Validators.required]],
      paisa: [this.selecteduser.paisa, [Validators.required,Validators.min(1), Validators.max(100)]],
    });
  }
  selectPackage(value:string){
    if(value=="Basic"){
      this.updateForm.controls.inr.setValue(500);
      this.updateForm.controls.paisa.setValue(100);
    }
    else if(value=="Standard"){
      this.updateForm.controls.inr.setValue(700);
      this.updateForm.controls.paisa.setValue(100);
    }
    else if(value=="Elite"){
      this.updateForm.controls.inr.setValue(1000);
      this.updateForm.controls.paisa.setValue(100);
    }

  }
  onSubmit() {
    console.log(this.updateForm.status);
    if (this.updateForm.status === "VALID") {
      this.user.putfitnessdata(this.selecteduser.id, this.updateForm.value).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
     this.router.navigateByUrl("landing-page");
    }
  }
}
