import { FormsModule } from '@angular/forms';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { ItemFormComponent } from './pages/item-form/item-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './pages/category-form/category-form.component';


@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        ItemListComponent,
        ItemFormComponent,
        CategoryListComponent,
        CategoryFormComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule { }
