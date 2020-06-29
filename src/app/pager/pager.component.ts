import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnChanges {

  private readonly sidePagesNumber: number = 2;

  @Input() page: any;
  @Output() clickedPageNumber = new EventEmitter<number>();

  totalPagesRange: number[];
  currentPageIndex: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setPageInfo();
  }

  setPageInfo(): void {
    if (this.page.totalPages > this.sidePagesNumber * 2 + 1) {
      // index of current and last page
      let currentPage = this.page.number;
      let lastPage = this.page.totalPages - 1;

      //  arrays with page indexes before and after the current
      let before: number[] = new Array();
      let after: number[] = new Array();
     
      // adding this.sidePagesNumber(count) indexes each to the before and after arrays
      for (let i = currentPage - 1; i >= currentPage - this.sidePagesNumber && i >= 0; i--) {
        before.push(i);
      }
      for (let i = currentPage + 1; i <= currentPage + this.sidePagesNumber && i <= lastPage; i++) {
        after.push(i);
      }

      // difference in array length
      // if sidePagesDiff !== 0, then added additional indexes to the before and after arrays
      let sidePagesDiff = before.length - after.length;

      // if sidePagesDiff > 0, then after.length < this.sidePagesNumber,
      // so added sidePagesDiff(count) additional indexes to before array
      for (let i = sidePagesDiff; i > 0; i--) {
        let lastElement = before[before.length - 1];
        before.push(lastElement - 1);
      }
      // if sidePagesDiff < 0, then bedore.length < this.sidePagesNumber,
      // so added sidePagesDiff(count) additional indexes to after array
      for (let i = sidePagesDiff; i < 0; i++) {
        let lastElement = after[after.length - 1];
        after.push(lastElement + 1);
      }
      before.reverse();
      
      // create range of indexes(pages)
      this.totalPagesRange = before.concat(currentPage).concat(after);
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
