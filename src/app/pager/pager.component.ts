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
    if (this.page.totalPages > 5) {
      // @TODO refactor
      let lastPageIndex = this.page.totalPages - 1;
      let currentPageIndex = this.page.number;

      let pagesBeforeCurrent: number[], pagesAfterCurrent: number[];
      if (currentPageIndex > 1 && currentPageIndex < lastPageIndex - 1) {
        pagesBeforeCurrent = [currentPageIndex - 2, currentPageIndex - 1];
        pagesAfterCurrent = [currentPageIndex + 1, currentPageIndex + 2];
      }

      if (currentPageIndex === 1) {
        pagesBeforeCurrent = [currentPageIndex - 1];
        pagesAfterCurrent = [currentPageIndex + 1, currentPageIndex + 2, currentPageIndex + 3];
      }
      if (currentPageIndex === 0) {
        pagesBeforeCurrent = [];
        pagesAfterCurrent = [currentPageIndex + 1, currentPageIndex + 2, currentPageIndex + 3, currentPageIndex + 4];
      }

      if (currentPageIndex === lastPageIndex - 1) {
        pagesBeforeCurrent = [currentPageIndex - 3, currentPageIndex - 2, currentPageIndex - 1];
        pagesAfterCurrent = [currentPageIndex + 1];
      }
      if (currentPageIndex === lastPageIndex) {
        pagesBeforeCurrent = [currentPageIndex - 4, currentPageIndex - 3, currentPageIndex - 2, currentPageIndex - 1];
        pagesAfterCurrent = [];
      }

      this.totalPagesRange = pagesBeforeCurrent.concat(currentPageIndex).concat(pagesAfterCurrent);
    } else {
      this.totalPagesRange = Array.from(Array(this.page.totalPages).keys());
    }
    this.currentPageIndex = this.page.number;
  }

  changeCurrentPage(clickedPageNumber: any) {
    if (clickedPageNumber !== this.currentPageIndex) {
      this.clickedPageNumber.emit(clickedPageNumber);
    }
  }

}
