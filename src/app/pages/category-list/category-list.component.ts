import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
    categories: Category[] = [];

    constructor(private categoryService: CategoryService, private actionSheetController: ActionSheetController, private router: Router) { }

    ionViewWillEnter() {
        this.getAllCategories();
    }

    private getAllCategories(): void {
        this.categoryService.getAll().subscribe((res) => this.categories = res);
    }

    private deleteOneItem(id: string): void {
        this.categoryService.delete(id).subscribe(() => this.getAllCategories());
    }

    async viewOptions(category: Category) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Options',
            buttons: [
                { text: 'Edit', icon: 'create', handler: () => this.router.navigate(['/categories', 'edit', category.id]) },
                { text: 'Delete', icon: 'trash', handler: () => this.deleteOneItem(category.id) },
                { text: 'Cancel', icon: 'close', role: 'cancel' },
            ],
        });

        await actionSheet.present();
    }

}
