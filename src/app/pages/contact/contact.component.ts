import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatabaseService} from '../../api/database.service';
import {Router} from '@angular/router';
import $ from 'jquery';

declare var $: $;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  backgroundUrl = '../../../assets/background-homage.jpg';
  contactBackground = '';
  contactForm: FormGroup;
  submitted = false;
  success = false;
  showSpinner = true;

  constructor(private fb: FormBuilder, private db: DatabaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      email: ['', [Validators.required, Validators.pattern('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      trappy: ['']
    });
    this.loadBackground();
  }

  loadBackground() {
    let preloaderImg = document.createElement('img');
    preloaderImg.src = this.backgroundUrl;
    preloaderImg.addEventListener('load', (event) => {
      this.contactBackground = this.backgroundUrl;
      preloaderImg = null;
      this.showSpinner = false;
    });
  }

  get controls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid || this.controls.trappy.value !== '') {
      return;
    } else {
      this.db.sendContactInfo({
        name: this.contactForm.controls.name.value,
        contactEmail: this.contactForm.controls.email.value,
        message: this.contactForm.controls.message.value,
      }).then(() => {
        this.success = true;
        $('#contactedSuccesfully').modal('show');
        this.contactForm.reset();
        setTimeout(() => {
            $('#contactedSuccesfully').modal('toggle');
            this.router.navigate([''], {queryParams: {contact: 'yes'}});
          }
          , 2000);
      }).catch(() => this.db.sendContactInfo({error: 'Someone tried to contact and failed'}));
    }
  }

}
