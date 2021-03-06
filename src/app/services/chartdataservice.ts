
import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { alphavantageSettings } from '../appsettings';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Injectable()

export class ChartDataService
{
  charts = [];

  constructor(private http:  HttpClient)
  {

  }

  createChart(container, symbol, data = null)
  {
    this.charts = [];
    let e = document.createElement("div");
    if(container != null)
    {
      container.appendChild(e);
  
      let options: any = this.transformConfiguration(symbol, data);
  
      if(options.chart != null)
      {
        options.chart['renderTo'] = e;
      }
      else
      {
        options.chart = {
          'renderTo': e
        };
      }
  
      this.charts.push(new Highcharts.Chart(options));
    }
  }

  getCharts()
  {
    return this.charts;
  }

  /**
  * Retrieve Chart Intra Day
  */
  chartIntraDay(symbol, data)
  {
    var config = {
      chart: { type: 'spline' },
      title : { text : symbol },
      xAxis: {
          type: 'datetime'
      },
      series: [{
        name: symbol,
        data: data
      }],
      rangeSelector: {
          buttons: [{
              type: 'hour',
              count: 1,
              text: '1h'
          }, {
              type: 'day',
              count: 1,
              text: '1D'
          }, {
              type: 'all',
              count: 1,
              text: 'All'
          }],
          selected: 1,
          inputEnabled: false
      }
    };

    return config;
  };

  transformConfiguration(symbol, data)
  {
    let chartConfig = this.chartIntraDay(symbol, data);

    return chartConfig;
  }

  createStockQuery(tickerSymbol)
  {
  var url = alphavantageSettings.symbolIntraDayBaseUrl + tickerSymbol + '&interval='+ alphavantageSettings.symbolIntraDayTimeInterval +'min&apikey=' + alphavantageSettings.apikey;

    return encodeURI( url );
  };
 
  loadData(symbol, callback)
  {
     this.http.get(this.createStockQuery(symbol))
    .pipe(
      debounceTime(1000))
    .subscribe(this.onDataReceived.bind( this , symbol, callback));
  };

  onDataReceived(symbol, callback, rawData )
  {
    var highchartsData = this.transformDataForHighCharts( rawData );
    var metaData = rawData["Meta Data"];
    callback(symbol, highchartsData, metaData);

  };

  transformDataForHighCharts( rawData )
  {
    var quotes = rawData['Time Series (5min)'],
      data = [],
      i, item;
      
    for (var each in quotes)
    {
      item = quotes[each];

      data.push([new Date(each).getTime(),
        parseFloat(item["4. close"])]);
    }

    return data;
  };

}