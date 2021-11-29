import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news: any[] = [];

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dataService.news$.subscribe(res => {
      if (res) {
        this.news = res.sort((a, b) => {
          return b.views - a.views;
        });
      }
    });
  }
}