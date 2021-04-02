import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  ngOnInit(): void {
  }
  settings = {
    mode: "external",

    edit: {
      editButtonContent: 'Editer',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'id',
        type: 'number',
      },
      Name: {
        title: 'Name',
        type: 'string',
      },
      Creation_Date: {
        title: 'Creation_Date',
        type: 'date',
      },
      Promotion_Price: {
        title: 'Promotion_Price',
        type: 'number',
      },
      Sexe: {
        title: 'Sexe',
        type: 'string',
      },
      Price: {
        title: 'Price',
        type: 'number',
      },
      marque: {
        title: 'marque',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private ps: ProductService) {
    const data = this.ps.getListProduct();
    //this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    console.log('test');

  }

  openWindowUpdateProduit() {

  }
}