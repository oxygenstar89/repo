import { DatePipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupedData } from '../../services/table-data.model';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [KeyValuePipe, DatePipe, DecimalPipe],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent {
  @Input() tableData: GroupedData = {};
  @Output() removeData = new EventEmitter<{key: string, index?: number}>();

  remove(key:string, index?: number) {
    this.removeData.emit({key, index});
  }

}
