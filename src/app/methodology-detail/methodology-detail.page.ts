import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequisitionsService } from '../requisitions.service';

@Component({
  selector: 'app-methodology-detail',
  templateUrl: './methodology-detail.page.html',
  styleUrls: ['./methodology-detail.page.scss'],
})
export class MethodologyDetailPage implements OnInit {

  public metho_id;
  public methodology: any;

  constructor(
    private route: ActivatedRoute,
    private requisition: RequisitionsService
  ) {
    this.metho_id = this.route.snapshot.paramMap.get('metho_id');
  }

  ngOnInit() {
    this.initialize(this.metho_id);
  }

  initialize(metho_id) {
    this.requisition.methodologyGetDetail(metho_id).subscribe(
      data => {
        const response = (data as any);
        const returned_object = JSON.parse(response._body);
        this.methodology = returned_object.methodology;
      },
      error => {
        console.log(error);
      }
    );
  }
}
