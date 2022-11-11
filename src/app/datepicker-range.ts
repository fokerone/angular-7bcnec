import { Component } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'ngbd-datepicker-range',
  templateUrl: './datepicker-range.html',
  styles: [
    `
			.custom-day {
				text-align: center;
				padding: 0.185rem 0.25rem;
				display: inline-block;
				height: 2rem;
				width: 2rem;
			}
			.custom-day.focused {
				background-color: #e6e6e6;
			}
			.custom-day.range,
			.custom-day:hover {
				background-color: rgb(2, 117, 216);
				color: white;
			}
			.custom-day.faded {
				background-color: rgba(2, 117, 216, 0.5);
			}
		`,
  ],
})
export class NgbdDatepickerRange {
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  deshabilitarDay: (date: NgbDate) => boolean;

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.deshabilitarDay = this.diasDeshabilitados();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  diasDeshabilitados(): (date: NgbDate) => boolean {
    const hoyNgb: any = {
      day: 10,
      month: 11,
      year: 2022,
    };
    const otro: any = {
      day: 20,
      month: 11,
      year: 2022,
    };

    const hoyNgb2: any = {
      day: 15,
      month: 11,
      year: 2022,
    };

    const otro2: any = {
      day: 27,
      month: 11,
      year: 2022,
    };

    return (date: NgbDate) => {
      if (
        date.before(hoyNgb) ||
        (date.after(otro) && date.before(hoyNgb2)) ||
        date.after(otro2)
      ) {
        return true;
      }
    };
  }
}
