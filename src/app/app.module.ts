import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { stockchartComponent } from './stockchart/stockchart.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteComponent } from './controls/autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule  } from '@angular/material';
import { stocksComponent } from './stocks/stock.component';
import { StockListItemComponent } from './users/stocklist-item.component';
import { DataService } from "./services/data.service"; 

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'stockchart', component: stockchartComponent },
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'stockpick', component: stocksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    stockchartComponent,
    UsersComponent,
    AutocompleteComponent,
    stocksComponent,
    StockListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
