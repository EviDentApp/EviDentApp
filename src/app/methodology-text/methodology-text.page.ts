import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-methodology-text',
  templateUrl: './methodology-text.page.html',
  styleUrls: ['./methodology-text.page.scss'],
})
export class MethodologyTextPage implements OnInit {
  public methodologyName: String;
  public methodologyText: String;
  
  constructor(    private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.methodologyName = (this.route.snapshot.paramMap.get('MeName'));
    this.methodologyText = (this.route.snapshot.paramMap.get('meText'));
    console.log(this.methodologyText)

  }

}
