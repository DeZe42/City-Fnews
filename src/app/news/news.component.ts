import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  timer: number = 120000;
  news: any = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNews();
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getNews();
      }
    })
  }

  getNews() {
    this.dataService.getNewsById(this.route.snapshot.params['id']).subscribe(res => {
      if (res) {
        this.news = res;
        let viewed = localStorage.getItem(res.id);
        let element = {
          id: res.id,
          title: res.title,
          description: res.description,
          views: res.views + 1
        }
        if (viewed) {
          if (Date.now() - Number(viewed) > this.timer) {
            localStorage.setItem(res.id, JSON.stringify(Date.now()));
            this.dataService.updateNews(element);
          }
        } else {
          localStorage.setItem(res.id, JSON.stringify(Date.now()));
          this.dataService.updateNews(element);
        }
      }
    });
  }
}