import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionsService } from '../requisitions.service';

@Component({
  selector: 'app-text-by-themes',
  templateUrl: './text-by-themes.page.html',
  styleUrls: ['./text-by-themes.page.scss'],
})
export class TextByThemesPage implements OnInit {

  public theme: string;
  public id: string;
  public texts: any;
  public keyword: string;

  constructor(
    private route: ActivatedRoute,
    private requisition: RequisitionsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.theme = this.route.snapshot.paramMap.get('theme');
    this.id = this.route.snapshot.paramMap.get('id');
    this.initialize(this.id, '');
    console.log (this.id)
    console.log(this.texts)
  }

  initialize(theme, keyword) {
    this.requisition.textGetList(theme, keyword).subscribe(
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        this.texts = returned_object.texts;
      },
      error => {
        console.log(error);
      }
    );
  }

  filterList(keyword: any) {
    this.keyword = keyword.target.value;
    this.requisition.textGetList (this.id, this.keyword).subscribe (
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        this.texts = returned_object.texts;
        
      },
      error => {
        console.log(error);
      }
    );
  }

  goToDetail(event, text) {
    this.router.navigate(['textDetail', { text_id: text.id, text_title: text.title }])
  }
}
