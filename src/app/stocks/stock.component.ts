import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock } from '../models/stock';
import { StockService } from './stock.service';
import { StockSymbol } from '../users/stocksymbol'
import { Router } from '@angular/router'
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService]
})

export class stocksComponent implements OnInit {

  @Input() symbol: StockSymbol;
  @Output() symbolSelected = new EventEmitter<StockSymbol>();
  @Output() stockSym = new EventEmitter<string>();
  stocks: Array<Stock> = [];
  selectedStock: Stock;

  constructor(private StockService : StockService, private router: Router, private dataservice : DataService) { 
     this.StockService
    .getUsers()
    .subscribe((data: any) => {
        data.forEach(stock => {
            var stockSymbolResponse = stock;
            var metaData = stockSymbolResponse["Meta Data"];
            var timezoneData = stockSymbolResponse["Time Series (1min)"];
            var latestTimeSeriesData = timezoneData[metaData['3. Last Refreshed']];
           let stockItem = {
                id: stock.id,
                name: stock.name,
                metaData : {
                    info:   metaData['1. Information'],
                    symbol: metaData['2. Symbol'],
                    lastRefreshed: metaData['3. Last Refreshed'],
                    refreshFrequency: metaData['4. Interval'],
                    timezone: metaData['6. Time Zone']
                },
                stockPrice:{
                  open: latestTimeSeriesData["1. open"],
                  close: latestTimeSeriesData["4. close"],
                  volume: latestTimeSeriesData["5. volume"],
                  high: latestTimeSeriesData["2. high"]
                }
            };
            this.stocks.push(stockItem);
        });
      });
    }
  ngOnInit() {
  }

  onSelected(stock: Stock)
  {
    var stockLite = {
      name: stock.name,
      symbol: stock.metaData.symbol
    }
     
     this.dataservice.setStockLite(stockLite);
     this.router.navigateByUrl('/stockchart');
  }

  onSelect(Stock: Stock): void {
    this.selectedStock = Stock;
  }
}