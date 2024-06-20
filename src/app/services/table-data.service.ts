import { Injectable } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { map } from 'rxjs';
import { GroupedData, OrderData } from './table-data.model';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {


  constructor(private apiRequests: ApiRequestsService) { }

  getOrders() {
    return this.apiRequests.getOrders().pipe(
      map(
        ({data}) => {
          const groupedData: GroupedData = this.groupBySymbol(data);
          return this.calculateDataForGroups(groupedData);
        }
      )
    );
  }

  groupBySymbol(data: OrderData[]) {
    let gd: GroupedData = {};
    data.forEach(
      (order) => {
        const profit = this.calculateProfit(order);
        if(gd[order.symbol]) {
          gd[order.symbol].data.push({...order, profit});
        } else {
          gd = {
            ...gd,
            [order.symbol]:
              {
                open: false,
                data: [{...order, profit}],
                totalSize: 0,
                averageOpenPrice: 0,
                totalSwap: 0,
                averageProfit: 0,
              }

          }
        }
      }
    );
    return gd;
  }

  calculateProfit(order: OrderData) {
    let exponent = 3;
    switch(order.symbol) {
      case 'TTWO.US':
        exponent = 1;
        break;
      case 'BTCUSD':
        exponent = 2;
        break;
    }
    const multiplier = 10 ** exponent;
    const sideMultiplier = order.side === 'BUY' ? 1 : -1;
    return (order.closePrice - order.openPrice) * multiplier * sideMultiplier / 100;

  }

  calculateDataForGroups(groupedData: GroupedData) {
    Object.keys(groupedData).forEach(
      (key) => {
        const groupData = groupedData[key].data;
        groupedData[key].totalSize = 0;
        groupedData[key].averageOpenPrice = 0;
        groupedData[key].totalSwap = 0;
        groupedData[key].averageProfit = 0;
        groupData.forEach(order => {
          groupedData[key].totalSize += order.size;
          groupedData[key].averageOpenPrice += order.openPrice;
          groupedData[key].totalSwap += order.swap;
          groupedData[key].averageProfit += order.profit || 0;
        });
        groupedData[key].averageOpenPrice = groupedData[key].averageOpenPrice / groupedData[key].data.length;
        groupedData[key].averageProfit = groupedData[key].averageProfit / groupedData[key].data.length;
      }
    );
    return groupedData;
  }

}


