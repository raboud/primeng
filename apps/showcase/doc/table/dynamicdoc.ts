import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'dynamic-doc',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>Columns can be defined dynamically using the <i>&#64;for</i> directive.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [columns]="cols" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header let-columns>
                        <tr>
                            @for (col of columns; track col) {
                                <th>
                                    {{ col.header }}
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowData let-columns="columns">
                        <tr>
                            @for (col of columns; track col) {
                                <td>
                                    {{ rowData[col.field] }}
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-dynamic-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDoc {
    private productService = inject(ProductService);
    private cd = inject(ChangeDetectorRef);

    products!: Product[];

    cols!: Column[];

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }

    code: Code = {
        basic: `<p-table [columns]="cols" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header let-columns>
        <tr>
            @for (col of columns; track col) {
            <th>
                {{ col.header }}
            </th>
            }
        </tr>
    </ng-template>
    <ng-template #body let-rowData let-columns="columns">
        <tr>
            @for (col of columns; track col) {
            <td>
                {{ rowData[col.field] }}
            </td>
            }
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [columns]="cols" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                  <ng-template #header let-columns>
                    <tr>
                      @for (col of columns; track col) {
                        <th>
                          {{ col.header }}
                        </th>
                      }
                    </tr>
                  </ng-template>
                  <ng-template #body let-rowData let-columns="columns">
                    <tr>
                      @for (col of columns; track col) {
                        <td>
                          {{ rowData[col.field] }}
                        </td>
                      }
                    </tr>
                  </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'table-dynamic-demo',
    templateUrl: 'table-dynamic-demo.html',
    standalone: true,
    imports: [TableModule, CommonModule],
    providers: [ProductService]
})
export class TableDynamicDemo {
    products!: Product[];

    cols!: Column[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }
}`,
        data: `{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
...`,
        service: ['ProductService']
    };

    extFiles = [
        {
            path: 'src/domain/product.ts',
            content: `
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}`
        }
    ];
}
