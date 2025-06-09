import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, inject, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ChevronRightIcon, HomeIcon } from 'primeng/icons';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbItemClickEvent } from './breadcrumb.interface';
import { BreadCrumbStyle } from './style/breadcrumbstyle';

/**
 * Breadcrumb provides contextual information about page hierarchy.
 * @group Components
 */
@Component({
    selector: 'p-breadcrumb',
    standalone: true,
    imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule],
    template: `
        <nav [class]="cx('root')" [style]="style" [attr.data-pc-name]="'breadcrumb'" [attr.data-pc-section]="'root'">
            <ol [attr.data-pc-section]="'menu'" [class]="cx('list')">
                @if (home && home.visible !== false) {
                    <li [attr.id]="home.id" [class]="cn(cx('homeItem'), home.styleClass)" [ngStyle]="home.style" pTooltip [tooltipOptions]="home.tooltipOptions" [attr.data-pc-section]="'home'">
                        @if (!home.routerLink) {
                            <a
                                [href]="home.url ? home.url : null"
                                [attr.aria-label]="homeAriaLabel"
                                [class]="cx('itemLink')"
                                (click)="onClick($event, home)"
                                [target]="home.target"
                                [attr.title]="home.title"
                                [attr.tabindex]="home.disabled ? null : '0'"
                            >
                                @if (home.icon) {
                                    <span [class]="cn(cx('itemIcon'), home.icon)" [ngStyle]="home?.style"></span>
                                }
                                @if (!home.icon) {
                                    <HomeIcon [class]="cx('itemIcon')" />
                                }
                                @if (home.label) {
                                    @if (home.escape !== false) {
                                        <span [class]="cx('itemLabel')">{{ home.label }}</span>
                                    } @else {
                                        <span [class]="cx('itemLabel')" [innerHTML]="home.label"></span>
                                    }
                                }
                            </a>
                        }
                        @if (home.routerLink) {
                            <a
                                [routerLink]="home.routerLink"
                                [attr.aria-label]="homeAriaLabel"
                                [queryParams]="home.queryParams"
                                [routerLinkActiveOptions]="home.routerLinkActiveOptions || { exact: false }"
                                [class]="cx('itemLink')"
                                (click)="onClick($event, home)"
                                [target]="home.target"
                                [attr.title]="home.title"
                                [attr.tabindex]="home.disabled ? null : '0'"
                                [fragment]="home.fragment"
                                [queryParamsHandling]="home.queryParamsHandling"
                                [preserveFragment]="home.preserveFragment"
                                [skipLocationChange]="home.skipLocationChange"
                                [replaceUrl]="home.replaceUrl"
                                [state]="home.state"
                            >
                                @if (home.icon) {
                                    <span [class]="cn(cx('itemIcon'), home.icon)" [style]="home.iconStyle"></span>
                                }
                                @if (!home.icon) {
                                    <HomeIcon [styleClass]="cx('itemIcon')" />
                                }
                                @if (home.label) {
                                    @if (home.escape !== false) {
                                        <span [class]="cx('itemLabel')">{{ home.label }}</span>
                                    } @else {
                                        <span [class]="cx('itemLabel')" [innerHTML]="home.label"></span>
                                    }
                                }
                            </a>
                        }
                    </li>
                }
                @if (model && home) {
                    <li [class]="cx('separator')" [attr.data-pc-section]="'separator'">
                        @if (!separatorTemplate && !_separatorTemplate) {
                            <ChevronRightIcon />
                        }
                        <ng-template *ngTemplateOutlet="separatorTemplate || _separatorTemplate"></ng-template>
                    </li>
                }
                @for (menuitem of model; track menuitem; let end = $last) {
                    @if (menuitem.visible !== false) {
                        <li [class]="cn(cx('item', { menuitem }), menuitem.styleClass)" [attr.id]="menuitem.id" [style]="menuitem.style" pTooltip [tooltipOptions]="menuitem.tooltipOptions" [attr.data-pc-section]="'menuitem'">
                            @if (itemTemplate || _itemTemplate) {
                                <ng-template *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: menuitem }"></ng-template>
                            } @else {
                                @if (!menuitem?.routerLink) {
                                    <a
                                        [attr.href]="menuitem?.url ? menuitem?.url : null"
                                        [class]="cx('itemLink')"
                                        (click)="onClick($event, menuitem)"
                                        [target]="menuitem?.target"
                                        [attr.title]="menuitem?.title"
                                        [attr.tabindex]="menuitem?.disabled ? null : '0'"
                                    >
                                        @if (!itemTemplate && !_itemTemplate) {
                                            @if (menuitem?.icon) {
                                                <span [class]="cn(cx('itemIcon'), menuitem?.icon)" [style]="menuitem?.iconStyle"></span>
                                            }
                                            @if (menuitem?.label) {
                                                @if (menuitem?.escape !== false) {
                                                    <span [class]="cx('itemLabel')">{{ menuitem?.label }}</span>
                                                } @else {
                                                    <span [class]="cx('itemLabel')" [innerHTML]="menuitem?.label"></span>
                                                }
                                            }
                                        }
                                    </a>
                                }
                                @if (menuitem?.routerLink) {
                                    <a
                                        [routerLink]="menuitem?.routerLink"
                                        [queryParams]="menuitem?.queryParams"
                                        [routerLinkActiveOptions]="menuitem?.routerLinkActiveOptions || { exact: false }"
                                        [class]="cx('itemLink')"
                                        (click)="onClick($event, menuitem)"
                                        [target]="menuitem?.target"
                                        [attr.title]="menuitem?.title"
                                        [attr.tabindex]="menuitem?.disabled ? null : '0'"
                                        [fragment]="menuitem?.fragment"
                                        [queryParamsHandling]="menuitem?.queryParamsHandling"
                                        [preserveFragment]="menuitem?.preserveFragment"
                                        [skipLocationChange]="menuitem?.skipLocationChange"
                                        [replaceUrl]="menuitem?.replaceUrl"
                                        [state]="menuitem?.state"
                                    >
                                        @if (menuitem?.icon) {
                                            <span [class]="cn(cx('itemIcon'), menuitem?.icon)" [style]="menuitem?.iconStyle"></span>
                                        }
                                        @if (menuitem?.label) {
                                            @if (menuitem?.escape !== false) {
                                                <span [class]="cx('itemLabel')">{{ menuitem?.label }}</span>
                                            } @else {
                                                <span [class]="cx('itemLabel')" [innerHTML]="menuitem?.label"></span>
                                            }
                                        }
                                    </a>
                                }
                            }
                        </li>
                    }
                    @if (!end && menuitem.visible !== false) {
                        <li [class]="cx('separator')" [attr.data-pc-section]="'separator'">
                            @if (!separatorTemplate && !_separatorTemplate) {
                                <ChevronRightIcon />
                            }
                            <ng-template *ngTemplateOutlet="separatorTemplate || _separatorTemplate"></ng-template>
                        </li>
                    }
                }
            </ol>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BreadCrumbStyle]
})
export class Breadcrumb extends BaseComponent implements AfterContentInit {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * MenuItem configuration for the home icon.
     * @group Props
     */
    @Input() home: MenuItem | undefined;
    /**
     * Defines a string that labels the home icon for accessibility.
     * @group Props
     */
    @Input() homeAriaLabel: string | undefined;
    /**
     * Fired when an item is selected.
     * @param {BreadcrumbItemClickEvent} event - custom click event.
     * @group Emits
     */
    @Output() onItemClick: EventEmitter<BreadcrumbItemClickEvent> = new EventEmitter<BreadcrumbItemClickEvent>();

    _componentStyle = inject(BreadCrumbStyle);

    constructor(private router: Router) {
        super();
    }

    onClick(event: MouseEvent, item: MenuItem) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }

        this.onItemClick.emit({
            originalEvent: event,
            item: item
        });
    }

    /**
     * Defines template option for item.
     * @group Templates
     */
    @ContentChild('item') itemTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for separator.
     * @group Templates
     */
    @ContentChild('separator') separatorTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _separatorTemplate: TemplateRef<any> | undefined;

    _itemTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'separator':
                    this._separatorTemplate = item.template;
                    break;

                case 'item':
                    this._itemTemplate = item.template;
                    break;

                default:
                    this._itemTemplate = item.template;
                    break;
            }
        });
    }
}

@NgModule({
    imports: [Breadcrumb, SharedModule],
    exports: [Breadcrumb, SharedModule]
})
export class BreadcrumbModule {}
