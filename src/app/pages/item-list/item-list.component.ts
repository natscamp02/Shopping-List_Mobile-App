import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
    items: Item[] = [];

    constructor(private itemService: ItemService, private actionSheetController: ActionSheetController, private router: Router) { }

    ngOnInit() {
        this.getAllItems();
    }

    private getAllItems(): void {
        this.itemService.getAll().subscribe((res) => this.items = res);
    }

    private deleteOneItem(id: string): void {
        this.itemService.delete(id).subscribe(() => this.getAllItems());
    }

    async viewOptions(item: Item) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Options',
            buttons: [
                { text: 'Edit', icon: 'create', handler: () => this.router.navigate(['item-list', 'edit', item.id]) },
                { text: 'Delete', icon: 'trash', handler: () => this.deleteOneItem(item.id) },
                { text: 'Cancel', icon: 'close', role: 'cancel' },
            ],
        });

        await actionSheet.present();
    }
}
