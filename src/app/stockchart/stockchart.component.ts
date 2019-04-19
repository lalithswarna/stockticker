
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChartDataService } from '../services/chartdataservice';
import { DataService } from "../services/data.service";
import { Stock } from '../models/stock';

@Component({
  selector: 'app-stockchart',
  templateUrl: './stockchart.component.html',
  styleUrls: ['./stockchart.component.css'],
  providers: [ChartDataService]
})
export class stockchartComponent implements OnInit {
  @ViewChild('charts') public chartEl: ElementRef;
  
  stockLite:any={
    name:"",
    symbol:""
  };
  stockData: Stock = {
    id: "1",
    name: "",
    metaData: {
      info: "",
      symbol: "",
      lastRefreshed: "",
      refreshFrequency: "",
      timezone:""
    },
    stockPrice: {
      open: null,
      close:null,
      high:null,
      volume: ""
    }
  };
  stocks: any = {};
  id: any = {};
  dataAvailable: boolean = false;
  constructor(private hcs: ChartDataService, private dataService: DataService) { }
  
  ngOnInit() {
    
  //  this.stockData = null;
   this.loadSymbolData();
  // this.id = setInterval(() => {
  //   alert("refreshing data :");
  //  // this.loadSymbolData(); 
  // }, 10000);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
    this.chartEl = null;
  }

  refresh : boolean = false;
  exchange: string = "";
  timezone: string = ""
  stockPositive: boolean = false;
  stockChange: number = null;
  stockChangePercent: number = null;
  stockDataChanged: boolean = false;

  loadSymbolData(){
    
    this.stockLite = this.dataService.getStockLite();
    if(this.stockLite.symbol != ''){  
		this.hcs.loadData(this.stockLite.symbol, (symbol, data, metaData)=> {
      if(metaData){
      let stockItem = {
            id: this.stockLite.id,
            name: this.stockLite.name,
            metaData : {
                info:   metaData['1. Information'],
                symbol: metaData['2. Symbol'],
                lastRefreshed: metaData['3. Last Refreshed'],
                refreshFrequency: metaData['4. Interval'],
                timezone: metaData['6. Time Zone']
            },
            stockPrice:{
              open: parseFloat(data[99]["1"]),
              high: parseFloat(data[0]["1"]),
              close: parseFloat(data[0]["1"]),
              volume: data[99]["0"]
            }
        };
      
        this.stockChange = stockItem.stockPrice.close - stockItem.stockPrice.open;
        this.stockChangePercent = (this.stockChange/100);
        if(this.stockChange > 0){
          this.stockPositive = true;
        }
        this.stockData = stockItem;
        this.hcs.createChart(this.chartEl.nativeElement, symbol, data);
        
        this.chartEl.nativeElement = null;
        this.exchange = "NYSE: ";
        this.dataAvailable = true;
      }
		});
    }
  }
}