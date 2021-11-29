import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  searchCtrl: FormControl = new FormControl('');
  news: any[] = [];
  filteredNews: Observable<any[]>;

  constructor(
   private dataService: DataService
  ) {

  }

  ngOnInit() {
    this.dataService.getNews();
    this.dataService.news$.subscribe(res => {
      if (res) {
        this.news = res;
      }
    });
    this.filteredNews = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      map(element => (element ? this._filterNews(element) : this.news.slice())),
    );
  }

  private _filterNews(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.news.filter(news => news.title.toLowerCase().includes(filterValue));
  }
}