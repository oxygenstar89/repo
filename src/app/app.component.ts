import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { TableDataService } from './services/table-data.service';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { GroupedData } from './services/table-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemingService } from './services/theming.service';
import { OrderData } from './services/table-data.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe,
    KeyValuePipe,
    OrdersTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  tableData$ = this.tableData.getOrders();

  constructor(
    private tableData: TableDataService,
    private _snackBar: MatSnackBar,
    private themingService: ThemingService
  ) {}

  onThemeSwitchChange() {
    this.themingService.toggleTheme();
  }

  removeData(
    {key, index}: {key: string, index?: number},
    currentTableData: GroupedData
  ) {
    if(index !== undefined && currentTableData[key].data.length > 1) {
      this._snackBar.open(`Order number ${currentTableData[key].data[index].id} was closed`, 'OK');
      currentTableData[key].data.splice(index, 1);
      this.tableData.calculateDataForGroups(currentTableData);
    } else {
      if(currentTableData[key].data.length === 1) {
      this._snackBar.open(`Order number ${currentTableData[key].data[0].id} was closed`, 'OK');
      } else {
        const groupIds: number[] = currentTableData[key].data.map((order: OrderData) => order.id);
        this._snackBar.open(`Orders number ${groupIds.join(', ')} were closed`, 'OK');
      }
      delete currentTableData?.[key];
    }
    return currentTableData;
  }

}
