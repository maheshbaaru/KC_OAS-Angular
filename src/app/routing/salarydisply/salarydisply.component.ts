import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeData } from 'src/app/Modesls/employee';
import { SalaryService } from 'src/app/services/salary.service';

@Component({
  selector: 'app-salarydisply',
  templateUrl: './salarydisply.component.html',
  styleUrls: ['./salarydisply.component.css'],
})
export class SalarydisplyComponent {
  resultData: any[];
  cols: any[];
  constructor(private _ser: SalaryService, private active: ActivatedRoute) {}
  ngOnInit() {
    let id = this.active.snapshot.params['id'];

    this._ser.getEmployeeById(id).subscribe((data) => {
      this.resultData = data;
    });
  }
  // cols=[
  //   {

  //   }
  // ]
}
