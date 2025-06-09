import { Code } from '@/domain/code';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'router-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-tieredmenu [model]="items">
                <ng-template #item let-item let-hasSubmenu="hasSubmenu">
                    @if (item.route) {
                        <a [routerLink]="item.route" [href]="item.href" class="p-tieredmenu-item-link">
                            <span class="item.icon"></span>
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    } @else {
                        @if (item.url) {
                            <a [href]="item.url" [target]="item.target" class="p-tieredmenu-item-link">
                                <span [class]="item.icon"></span>
                                <span class="ml-2">{{ item.label }}</span>
                                @if (hasSubmenu) {
                                    <span class="pi pi-angle-right ml-auto"></span>
                                }
                            </a>
                        } @else {
                            <a class="p-tieredmenu-item-link">
                                <span [class]="item.icon"></span>
                                <span class="ml-2">{{ item.label }}</span>
                                @if (hasSubmenu) {
                                    <span class="pi pi-angle-right ml-auto"></span>
                                }
                            </a>
                        }
                    }
                </ng-template>
            </p-tieredmenu>
        </div>
        <app-code [code]="code" selector="tiered-menu-router-demo"></app-code>
    `
})
export class RouterDoc implements OnInit {
    private router = inject(Router);

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Theming',
                        route: '/theming'
                    },
                    {
                        label: 'Colors',
                        route: '/colors'
                    }
                ]
            },
            {
                label: 'Programmatic',
                icon: 'pi pi-link',
                command: () => {
                    this.router.navigate(['/installation']);
                }
            },
            {
                label: 'External',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Angular',
                        url: 'https://angular.dev/'
                    },
                    {
                        label: 'Vite.js',
                        url: 'https://vitejs.dev/'
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-tieredmenu [model]="items">
    <ng-template #item let-item let-hasSubmenu="hasSubmenu">
        @if (item.route) {
            <a [routerLink]="item.route" [href]="item.href" class="p-tieredmenu-item-link">
                <span class="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </a>
        } @else {
            @if (item.url) {
                <a [href]="item.url" [target]="item.target" class="p-tieredmenu-item-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
                @if (hasSubmenu) {
                    <span class="pi pi-angle-right ml-auto"></span>
                }
                </a>
            } @else {
                <a class="p-tieredmenu-item-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
                @if (hasSubmenu) {
                    <span class="pi pi-angle-right ml-auto"></span>
                }
                </a>
            }
        }
    </ng-template>
</p-tieredmenu>`,

        html: `<div class="card flex justify-center">
    <p-tieredmenu [model]="items">
        <ng-template #item let-item let-hasSubmenu="hasSubmenu">
            @if (item.route) {
                <a [routerLink]="item.route" [href]="item.href" class="p-tieredmenu-item-link">
                    <span class="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            } @else {
                @if (item.url) {
                    <a [href]="item.url" [target]="item.target" class="p-tieredmenu-item-link">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                    @if (hasSubmenu) {
                        <span class="pi pi-angle-right ml-auto"></span>
                    }
                    </a>
                } @else {
                    <a class="p-tieredmenu-item-link">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                    @if (hasSubmenu) {
                        <span class="pi pi-angle-right ml-auto"></span>
                    }
                    </a>
                }
            }
        </ng-template>
    </p-tieredmenu>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TieredMenu } from 'primeng/tieredmenu';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tiered-menu-router-demo',
    templateUrl: './tiered-menu-router-demo.html',
    standalone: true,
    imports: [TieredMenu, CommonModule]
})
export class TieredMenuRouterDemo implements OnInit {

    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Theming',
                        route: '/theming'
                    },
                    {
                        label: 'Colors',
                        route: '/colors'
                    }
                ]
            },
            {
                label: 'Programmatic',
                icon: 'pi pi-link',
                command: () => {
                    this.router.navigate(['/installation']);
                }
            },
            {
                label: 'External',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Angular',
                        url: 'https://angular.dev/'
                    },
                    {
                        label: 'Vite.js',
                        url: 'https://vitejs.dev/'
                    }
                ]
            }
        ];
    }


}`
    };
}
