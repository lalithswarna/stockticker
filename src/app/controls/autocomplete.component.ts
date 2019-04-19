import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { AutoCompleteService } from './autocomplete.service';
import { Router } from '@angular/router'
import { DataService } from "../services/data.service";
import { StockLite } from '../models/stocklite';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'auto-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [AutoCompleteService],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [""];
  filteredOptions: Observable<string[]>;
  searchTerm : FormControl = new FormControl();
  companies : Array<StockLite> = [];
  stockSym:string;
  stockLite: StockLite = {
    name:"",
    symbol:""
  };
  private changeDetectRef;
  private changeDetectRefSearch;
  constructor(private autoCompleteService: AutoCompleteService, private router: Router, private dataservice: DataService, private cdf: ChangeDetectorRef) {
    // this.autoCompleteService
    //   .getUsers()
    //   .subscribe((data: string[]) => {
    //       this.options = data;
    //     });
      }

  ngOnInit() {

     this.changeDetectRef = this.searchTerm.valueChanges.subscribe(
          term => {
            if (term != '') {
              this.changeDetectRefSearch = this.autoCompleteService.search(term).subscribe((data: any) => {
                this.companies = [];
                        data["bestMatches"].forEach(element => {
                          var company = {
                            name: element["2. name"],
                            symbol: element["1. symbol"]
                          }
                          this.companies.push(company);
                        }
                      );
                    }
                  )}
              });
        }

ngOnDestroy(){
  if (this.changeDetectRef && !this.changeDetectRef['destroyed']) {
    this.changeDetectRef.unsubscribe();
    // this.changeDetectRef.detach();
}
if(this.changeDetectRefSearch && !this.changeDetectRefSearch['destroyed']){
  this.changeDetectRefSearch.unsubscribe();
}
if(!this.cdf['destroyed']){
  this.cdf.detectChanges();
}
}

  getCompanyDetails(){
    // read stocksymbol data from service
    
    //this.dataservice.stockLite.subscribe(stock => {this.stockLite  = stock });
    this.stockLite = this.dataservice.getStockLite();
    //this.dataservice.setStockLite()
    if(this.stockLite.symbol != ''){
    this.router.navigateByUrl('/stockchart');
    }
  }

  selectedCompany(stockLite: StockLite){
    // read stocksymbol data from service
    //this.dataservice.stockLite.subscribe(msg => msg = stockLite);
    
    // write stocksymbol data into data service
    //this.dataservice.changestockLite(stockLite)
    this.dataservice.setStockLite(stockLite);
  }
}
