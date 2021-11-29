import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createNews() {
    let data = {
      title: this.createForm.controls['title'].value,
      description: this.createForm.controls['description'].value,
      date: new Date().toString(),
      views: 0,
      status: false
    }
    this.dataService.addNews(data);
    this.router.navigateByUrl('/');
  }
}