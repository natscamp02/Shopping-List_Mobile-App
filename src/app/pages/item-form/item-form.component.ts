import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
    item: Item = new Item();
    action: 'add' | 'edit' = 'add';

    constructor(private itemService: ItemService, private navController: NavController, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        if (id)
            this.itemService.get(id).subscribe(item => {
                this.item = item;
                this.action = 'edit';
            });
    }

    onSubmit(): void {
        if (this.action === 'add')
            this.itemService.create(this.item).subscribe((res) => {
                if (res) this.navController.navigateRoot(['/item-list']);
            });

        if (this.action === 'edit')
            this.itemService.update(this.item.id, this.item).subscribe((res) => {
                if (res) this.navController.navigateRoot(['/item-list']);
                // if (res) this.router.navigateByUrl('/item-list', { replaceUrl: true });
            });
    }

}
