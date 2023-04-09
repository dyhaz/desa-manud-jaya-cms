import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: [],
  providers: []
})

export class TermsOfUseComponent implements OnInit, AfterViewInit {
  @Input('modal') modal: any;
  constructor() {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }
}
