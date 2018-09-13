import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequisitionsService } from '../requisitions.service';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.page.html',
  styleUrls: ['./text-detail.page.scss'],
})
export class TextDetailPage implements OnInit {
  public detail: any;
  public text_id: string;
  public text_title: string;

  constructor(
    private route: ActivatedRoute,
    private requisition: RequisitionsService
  ) {
    this.text_id = this.route.snapshot.paramMap.get('text_id');
    this.text_title = this.route.snapshot.paramMap.get('text_title');
    this.initialize(this.text_id)

   }

  ngOnInit() {
    console.log("Estou aqui")
  }

  initialize(text_id) {
    this.requisition.textGetDetail(text_id).subscribe(
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        console.log(response._body)
        this.detail = returned_object.text;
      },
      error => {
        console.log("O meu nome é erro");
      }
    );
  }

}
