import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../../api/database.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactBackground = '../../../assets/background-homage.jpg';
  contactForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private fb: FormBuilder, private db: DatabaseService) {
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      email: ['', [Validators.required, Validators.pattern('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+')]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get controls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid)
      return;
    else {
      this.db.sendMeEmail({
        name: this.contactForm.controls.name.value,
        contactEmail: this.contactForm.controls.email.value,
        message: this.contactForm.controls.message.value,
      });// add observable call
      this.success = true;
    }
  }

}
