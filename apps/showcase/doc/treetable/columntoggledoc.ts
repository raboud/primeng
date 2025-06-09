import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TreeNode } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'column-toggle-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Column visibility based on a condition can be implemented with dynamic columns, in this sample a MultiSelect is used to manage the visible columns.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="selectedColumns" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #caption>
                        <div style="text-align:left">
                            <p-multiselect [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ width: '20em' }" placeholder="Choose Columns" display="chip" />
                        </div>
                    </ng-template>
                    <ng-template #header let-columns>
                        <tr>
                            @for (col of columns; track col) {
                                <th>
                                    {{ col.header }}
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode">
                            @for (col of columns; track col; let i = $index) {
                                <td>
                                    @if (i === 0) {
                                        <p-treetable-toggler [rowNode]="rowNode" />
                                    }
                                    {{ rowData[col.field] }}
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-column-toggle-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnToggleDoc {
    private nodeService = inject(NodeService);

    files!: TreeNode[];

    cols!: Column[];

    selectedColumns!: Column[];

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.selectedColumns = this.cols;
    }

    code: Code = {
        basic: `<p-treetable [value]="files" [columns]="selectedColumns" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #caption>
        <div style="text-align:left">
            <p-multiselect [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ width: '20em' }" placeholder="Choose Columns" display="chip" />
        </div>
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            @for (col of columns; track col) {
                <th>
                    {{ col.header }}
                </th>
            }
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            @for (col of columns; track col; let i = $index) {
                <td>
                    @if (i === 0) {
                        <p-treetable-toggler [rowNode]="rowNode" />
                    }
                    {{ rowData[col.field] }}
                </td>
            }
        </tr>
    </ng-template>
</p-treetable>`,

        html: `<div class="card">
    <p-treetable [value]="files" [columns]="selectedColumns" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template #caption>
            <div style="text-align:left">
                <p-multiselect [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ width: '20em' }" placeholder="Choose Columns" display="chip" />
            </div>
        </ng-template>
        <ng-template #header let-columns>
            <tr>
                @for (col of columns; track col) {
                    <th>
                        {{ col.header }}
                    </th>
                }
            </tr>
        </ng-template>
        <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
                @for (col of columns; track col; let i = $index) {
                    <td>
                        @if (i === 0) {
                            <p-treetable-toggler [rowNode]="rowNode" />
                        }
                        {{ rowData[col.field] }}
                    </td>
                }
            </tr>
        </ng-template>
    </p-treetable>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-column-toggle-demo',
    templateUrl: './tree-table-column-toggle-demo.html',
    standalone: true,
    imports: [TreeTableModule, MultiSelectModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableColumnToggleDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    selectedColumns!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.selectedColumns = this.cols;
    }
}`,

        service: ['NodeService']
    };
}
