import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './pages/category-form/category-form.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { ItemFormComponent } from './pages/item-form/item-form.component';
import { ItemListComponent } from './pages/item-list/item-list.component';

const routes: Routes = [
    {
        path: 'item-list',
        children: [
            { path: 'edit/:id', component: ItemFormComponent },
            { path: 'new', component: ItemFormComponent },
            { path: '', component: ItemListComponent },
        ],
    },

    {
        path: 'categories',
        children: [
            { path: 'edit/:id', component: CategoryFormComponent },
            { path: 'new', component: CategoryFormComponent },
            { path: '', component: CategoryListComponent }
        ]
    },

    { path: '', redirectTo: 'item-list', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
