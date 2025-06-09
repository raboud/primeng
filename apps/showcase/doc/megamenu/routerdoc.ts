import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'router-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Items with navigation are defined with templating to be able to use a routerLink directive, an external link or programmatic navigation.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true" [hideStackBlitz]="true"></app-code>
    `
})
export class RouterDoc {
    code: Code = {
        basic: `<p-megamenu [model]="items">
    <ng-template #item let-item>
        @if (item.route) {
            <a [routerLink]="item.route" class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </a>
        } @else {
            <a [href]="item.url" class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </a>
        }
    </ng-template>
</p-megamenu>`
    };
}
