import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnChanges {

  @Input() page: any;
  @Output() clickedPageNumber = new EventEmitter<number>();

  totalPagesRange: number[];
  currentPageIndex: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setPageInfo();
  }

  setPageInfo(): void {
    this.totalPagesRange = Array.from(Array(this.page.totalPages).keys());
    this.currentPageIndex = this.page.number;
  }

  changeCurrentPage(clickedPageNumber: any) {
    if (clickedPageNumber !== this.currentPageIndex) {
      this.clickedPageNumber.emit(clickedPageNumber);
    }
  }

}
