import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TreeNode } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'sort-single-column-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Sorting on a column is enabled by adding the <i>ttSortableColumn</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header let-columns>
                        <tr>
                            @for (col of columns; track col) {
                                <th [ttSortableColumn]="col.field">
                                    {{ col.header }}
                                    <p-treetable-sort-icon [field]="col.field" />
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
        <app-code [code]="code" selector="tree-table-sort-single-column-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortSingleColumnDoc {
    private nodeService = inject(NodeService);

    files!: TreeNode[];

    cols!: Column[];

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    code: Code = {
        basic: `<p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            @for (col of columns; track col) {
                <th [ttSortableColumn]="col.field">
                    {{ col.header }}
                    <p-treetable-sort-icon [field]="col.field" />
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
    <p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
              <ng-template #header let-columns>
                <tr>
                  @for (col of columns; track col) {
                    <th [ttSortableColumn]="col.field">
                      {{ col.header }}
                      <p-treetable-sort-icon [field]="col.field" />
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
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-sort-single-column-demo',
    templateUrl: './tree-table-sort-single-column-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSortSingleColumnDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}`,

        service: ['NodeService']
    };
}
