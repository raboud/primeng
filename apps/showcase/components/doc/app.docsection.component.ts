import { Doc } from '@/domain/doc';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-docsection',
    standalone: false,
    template: `
        @if (docs && docs.length) {
            @for (doc of docs; track doc.id) {
                <section class="py-6">
                    @if (!doc.component && doc.children) {
                        <app-docsectiontext [title]="doc.label" [id]="doc.id" [level]="2" [description]="doc?.description" />
                        @for (child of doc.children; track child) {
                            <app-docsectiontext [title]="child.label" [id]="child.id" [level]="3" [description]="child?.description" />
                            <ng-container *ngComponentOutlet="child.component"></ng-container>
                        }
                    }
                    @if (doc.component && !doc.children) {
                        <app-docsectiontext [title]="doc.label" [id]="doc.id" [level]="2" [description]="doc?.description" />
                        <ng-container *ngComponentOutlet="doc.component"></ng-container>
                    }
                </section>
            }
        }

        @if (apiDocs && apiDocs.length) {
            @for (doc of apiDocs; track doc.id) {
                <section class="py-6">
                    @if (doc.children) {
                        <app-docsectiontext [title]="doc.label" [id]="doc.id" [description]="doc.description" [level]="2" />
                        @for (child of doc.children; track child) {
                            <app-docapitable [id]="child.id" [label]="child.label" [data]="child.data" [description]="child.description" [relatedProp]="child.relatedProp" [level]="3" [isInterface]="child.isInterface" />
                        }
                    }
                </section>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocSectionsComponent {
    @Input() docs!: Doc[];

    @Input() apiDocs!: any[];
}
