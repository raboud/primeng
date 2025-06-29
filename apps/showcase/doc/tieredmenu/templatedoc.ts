import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'template-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>TieredMenu offers item customization with the <i>item</i> template that receives the menuitem instance from the model as a parameter.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-tieredmenu [model]="items">
                <ng-template #item let-item let-hasSubmenu="hasSubmenu">
                    <a pRipple class="flex items-center p-tieredmenu-item-link">
                        <span [class]="item.icon" class="p-tieredmenu-item-icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                        <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                        <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                        <i *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
                    </a>
                </ng-template>
            </p-tieredmenu>
        </div>
        <app-code [code]="code" selector="tiered-menu-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Document',
                                icon: 'pi pi-file',
                                shortcut: '⌘+N'
                            },
                            {
                                label: 'Image',
                                icon: 'pi pi-image',
                                shortcut: '⌘+I'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-video',
                                shortcut: '⌘+L'
                            }
                        ]
                    },
                    {
                        label: 'Open',
                        icon: 'pi pi-folder-open',
                        shortcut: '⌘+O'
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print',
                        shortcut: '⌘+P'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy',
                        shortcut: '⌘+C'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times',
                        shortcut: '⌘+D'
                    }
                ]
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                shortcut: '⌘+S'
            },
            {
                separator: true
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Slack',
                        icon: 'pi pi-slack',
                        badge: '2'
                    },
                    {
                        label: 'Whatsapp',
                        icon: 'pi pi-whatsapp',
                        badge: '3'
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-tieredmenu [model]="items">
    <ng-template #item let-item let-hasSubmenu="hasSubmenu">
        <a pRipple class="flex items-center p-tieredmenu-item-link">
            <span [class]="item.icon" class="p-tieredmenu-item-icon"></span>
            <span class="ml-2">{{ item.label }}</span>
            <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">
                {{ item.shortcut }}
            </span>
            <i *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
        </a>
    </ng-template>
</p-tieredmenu>`,

        html: `<div class="card flex justify-center">
    <p-tieredmenu [model]="items">
        <ng-template #item let-item let-hasSubmenu="hasSubmenu">
            <a pRipple class="flex items-center p-tieredmenu-item-link">
                <span [class]="item.icon" class="p-tieredmenu-item-icon"></span>
                <span class="ml-2">{{ item.label }}</span>
                <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">
                    {{ item.shortcut }}
                </span>
                <i *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
            </a>
        </ng-template>
    </p-tieredmenu>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'tiered-menu-template-demo',
    templateUrl: './tiered-menu-template-demo.html',
    standalone: true,
    imports: [TieredMenu, BadgeModule, Ripple, CommonModule]
})
export class TieredMenuTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Document',
                                icon: 'pi pi-file',
                                shortcut: '⌘+N'
                            },
                            {
                                label: 'Image',
                                icon: 'pi pi-image',
                                shortcut: '⌘+I'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-video',
                                shortcut: '⌘+L'
                            }
                        ]
                    },
                    {
                        label: 'Open',
                        icon: 'pi pi-folder-open',
                        shortcut: '⌘+O'
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print',
                        shortcut: '⌘+P'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy',
                        shortcut: '⌘+C'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times',
                        shortcut: '⌘+D'
                    }
                ]
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                shortcut: '⌘+S'
            },
            {
                separator: true
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Slack',
                        icon: 'pi pi-slack',
                        badge: '2'
                    },
                    {
                        label: 'Whatsapp',
                        icon: 'pi pi-whatsapp',
                        badge: '3'
                    }
                ]
            }
        ]
    }
}`
    };
}
