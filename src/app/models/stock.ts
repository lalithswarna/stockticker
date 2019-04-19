export class Stock {
        id: string
        name: string
    //     metaData: any
    //     lastRefreshed: string
    //     timeSeries: string
    //     stockPrice: any

    metaData : {
        info:   string,
        symbol: string,
        lastRefreshed: string,
        refreshFrequency: string,
        timezone: string
    };
    stockPrice : {
        open: number,
        close: number,
        volume: string,
        high: number
    };
  }