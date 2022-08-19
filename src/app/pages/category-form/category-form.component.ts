import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {

    category: Category = new Category();
    action: 'add' | 'edit' = 'add';

    constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        if (id)
            this.categoryService.get(id).subscribe(category => {
                this.category = category;
                this.action = 'edit';
            });
    }

    onSubmit(): void {
        if (this.action === 'add')
            this.categoryService.create(this.category).subscribe((res) => {
                if (res) this.router.navigateByUrl('/categories');
            });

        if (this.action === 'edit')
            this.categoryService.update(this.category.id, this.category).subscribe((res) => {
                if (res) this.router.navigateByUrl('/categories');
            });
    }


}
