import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component, inject } from '@angular/core';
import { TreeNode } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'scroll-horizontal-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Horizontal scrolling is enabled when the total width of columns exceeds table width.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="250px" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #colgroup let-columns>
                        <colgroup>
                            @for (col of columns; track col) {
                                <col style="width:500px" />
                            }
                        </colgroup>
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
                                        <p-treetable-toggler [rowNode]="rowNode"></p-treetable-toggler>
                                    }
                                    {{ rowData[col.field] }}
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-scroll-horizontal-demo"></app-code>
    `
})
export class ScrollHorizontalDoc {
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
        basic: `<p-treetable [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="250px" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
              <ng-template #colgroup let-columns>
                <colgroup>
                @for (col of columns; track col) {
                  <col style="width:500px" />
                }
              </colgroup>
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
                      <p-treetable-toggler [rowNode]="rowNode"></p-treetable-toggler>
                    }
                    {{ rowData[col.field] }}
                  </td>
                }
              </tr>
            </ng-template>
</p-treetable>`,

        html: `
<div class="card">
    <p-treetable [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="250px" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
              <ng-template #colgroup let-columns>
                <colgroup>
                @for (col of columns; track col) {
                  <col style="width:500px" />
                }
              </colgroup>
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
                      <p-treetable-toggler [rowNode]="rowNode"></p-treetable-toggler>
                    }
                    {{ rowData[col.field] }}
                  </td>
                }
              </tr>
            </ng-template>
    </p-treetable>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-scroll-horizontal-demo',
    templateUrl: './tree-table-scroll-horizontal-demo.html'
})
export class TreeTableScrollHorizontalDemo implements OnInit {
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
