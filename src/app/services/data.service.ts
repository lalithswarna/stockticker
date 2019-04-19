import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockLite } from '../models/stocklite'
import { Stock } from '../models/stock'

@Injectable()
export class DataService {
  private stockLite: StockLite = {
      name: "",
      symbol: ""
  };
  private stock: Stock = {
    id: "",
    name: "",
    metaData : {
        info:   "",
        symbol: "",
        lastRefreshed: "",
        refreshFrequency: "",
        timezone:""
    },
    stockPrice : {
        open: null,
        close: null,
        volume: "",
        high:null
    }
  };

  setStockLite(stockLite : StockLite){
    this.stockLite = stockLite;
  }

  getStockLite(){
      return this.stockLite;
  }
  //private messageSource = new BehaviorSubject(this.stockLite);
  //stockLite = this.messageSource.asObservable();
//   private messageSource = new StockLite;
//   stockLte = this.messageSource;
  
//   //private stockDataSource = new BehaviorSubject(this.stock)
//   //stockData = this.stockDataSource.asObservable();
//   private stockDataSource = new Stock;
//   stockData = this.stockDataSource;

//   constructor() { }

//   changestockLite(message: any) {
//     //this.messageSource.next(message)
//     this.messageSource = message;
//   }

//   stockDataSync(message: any) {
//    // this.stockDataSource.next(message)
//     this.stockDataSource = message;
//   }

}