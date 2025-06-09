import { animate, state, style, transition, trigger } from '@angular/animations';

import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    NgModule,
    numberAttribute,
    OnChanges,
    Output,
    QueryList,
    signal,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { equals, findLast, findSingle, focus, getAttribute, isEmpty, isNotEmpty, isPrintableCharacter, resolve, uuid } from '@primeuix/utils';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon } from 'primeng/icons';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuStyle } from './style/panelmenustyle';

@Component({
    selector: 'p-panelMenuSub, p-panelmenu-sub',
    imports: [RouterModule, TooltipModule, AngleDownIcon, AngleRightIcon, SharedModule],
    standalone: true,
    template: `
        <ul
            #list
            [class]="root ? cx('rootList') : cx('submenu')"
            role="tree"
            [tabindex]="-1"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="'menu'"
            [attr.aria-hidden]="!parentExpanded"
            (focusin)="menuFocus.emit($event)"
            (focusout)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            @for (processedItem of items; track processedItem; let index = $index) {
                @if (processedItem.separator) {
                    <li [class]="cn(cx('separator'), getItemProp(processedItem, 'styleClass'))" role="separator"></li>
                }
                @if (!processedItem.separator && isItemVisible(processedItem)) {
                    <li
                        role="treeitem"
                        [attr.id]="getItemId(processedItem)"
                        [attr.aria-label]="getItemProp(processedItem, 'label')"
                        [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                        [attr.aria-level]="level + 1"
                        [attr.aria-setsize]="getAriaSetSize()"
                        [attr.aria-posinset]="getAriaPosInset(index)"
                        [class]="cx('item', { processedItem })"
                        [ngStyle]="getItemProp(processedItem, 'style')"
                        [pTooltip]="getItemProp(processedItem, 'tooltip')"
                        [attr.data-p-disabled]="isItemDisabled(processedItem)"
                        [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                    >
                        <div [class]="cx('itemContent')" (click)="onItemClick($event, processedItem)">
                            @if (!itemTemplate) {
                                @if (!getItemProp(processedItem, 'routerLink')) {
                                    <a [attr.href]="getItemProp(processedItem, 'url')" [class]="cx('itemLink')" [target]="getItemProp(processedItem, 'target')" [attr.data-pc-section]="'action'" [attr.tabindex]="!!parentExpanded ? '0' : '-1'">
                                        @if (isItemGroup(processedItem)) {
                                            @if (!panelMenu.submenuIconTemplate && !panelMenu._submenuIconTemplate) {
                                                @if (isItemActive(processedItem)) {
                                                    <AngleDownIcon [styleClass]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                                }
                                                @if (!isItemActive(processedItem)) {
                                                    <AngleRightIcon [styleClass]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                                }
                                            }
                                            <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate || panelMenu._submenuIconTemplate"></ng-template>
                                        }
                                        @if (processedItem.icon) {
                                            <span [class]="cx('itemIcon', { processedItem })" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                        }
                                        @if (processedItem.item?.escape !== false) {
                                            <span [class]="cx('itemLabel')">{{ getItemProp(processedItem, 'label') }}</span>
                                        } @else {
                                            <span [class]="cx('itemLabel')" [innerHTML]="getItemProp(processedItem, 'label')"></span>
                                        }
                                    </a>
                                }
                                @if (getItemProp(processedItem, 'routerLink')) {
                                    <a
                                        [routerLink]="getItemProp(processedItem, 'routerLink')"
                                        [queryParams]="getItemProp(processedItem, 'queryParams')"
                                        [routerLinkActive]="'p-panelmenu-item-link-active'"
                                        [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                        [class]="cx('itemLink')"
                                        [target]="getItemProp(processedItem, 'target')"
                                        [attr.title]="getItemProp(processedItem, 'title')"
                                        [fragment]="getItemProp(processedItem, 'fragment')"
                                        [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                        [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                        [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                        [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                        [state]="getItemProp(processedItem, 'state')"
                                        [attr.data-pc-section]="'action'"
                                        [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                                    >
                                        @if (isItemGroup(processedItem)) {
                                            @if (!panelMenu.submenuIconTemplate && !panelMenu._submenuIconTemplate) {
                                                @if (isItemActive(processedItem)) {
                                                    <AngleDownIcon [styleClass]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                                }
                                                @if (!isItemActive(processedItem)) {
                                                    <AngleRightIcon [styleClass]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                                }
                                            }
                                            <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate && panelMenu._submenuIconTemplate"></ng-template>
                                        }
                                        @if (processedItem.icon) {
                                            <span [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'))" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                        }
                                        <ng-template #htmlLabel><span [class]="cx('itemLabel')" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                        <ng-template #htmlRouteLabel><span [class]="cx('itemLabel')" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                        @if (processedItem.badge) {
                                            <span [class]="cn(cx('badge'), getItemProp(processedItem, 'badgeStyleClass'))">{{ processedItem.badge }}</span>
                                        }
                                    </a>
                                }
                            }
                            @if (itemTemplate) {
                                <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                            }
                        </div>
                        <div [@submenu]="getAnimation(processedItem)">
                            @if (isItemVisible(processedItem) && isItemGroup(processedItem) && isItemExpanded(processedItem)) {
                                <p-panelmenu-sub
                                    [id]="getItemId(processedItem) + '_list'"
                                    [panelId]="panelId"
                                    [items]="processedItem?.items"
                                    [itemTemplate]="itemTemplate"
                                    [transitionOptions]="transitionOptions"
                                    [focusedItemId]="focusedItemId"
                                    [activeItemPath]="activeItemPath"
                                    [level]="level + 1"
                                    [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                                    (itemToggle)="onItemToggle($event)"
                                ></p-panelmenu-sub>
                            }
                        </div>
                    </li>
                }
            }
        </ul>
    `,
    animations: [
        trigger('submenu', [
            state(
                'hidden',
                style({
                    height: '0'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [PanelMenuStyle]
})
export class PanelMenuSub extends BaseComponent {
    @Input() panelId: string | undefined;

    @Input() focusedItemId: string | undefined;

    @Input() items: any[];

    @Input() itemTemplate: TemplateRef<any> | undefined;

    @Input({ transform: numberAttribute }) level: number = 0;

    @Input() activeItemPath: any[];

    @Input({ transform: booleanAttribute }) root: boolean | undefined;

    @Input({ transform: numberAttribute }) tabindex: number | undefined;

    @Input() transitionOptions: string | undefined;

    @Input({ transform: booleanAttribute }) parentExpanded: boolean | undefined;

    @Output() itemToggle: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuKeyDown: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('list') listViewChild: ElementRef;

    panelMenu: PanelMenu = inject(forwardRef(() => PanelMenu));

    _componentStyle = inject(PanelMenuStyle);

    getItemId(processedItem) {
        return processedItem.item?.id ?? `${this.panelId}_${processedItem.key}`;
    }

    getItemKey(processedItem) {
        return this.getItemId(processedItem);
    }

    getItemClass(processedItem) {
        return {
            'p-panelmenu-item': true,
            'p-disabled': this.isItemDisabled(processedItem),
            'p-focus': this.isItemFocused(processedItem)
        };
    }

    getItemProp(processedItem, name?, params?): any {
        return processedItem && processedItem.item ? resolve(processedItem.item[name], params) : undefined;
    }

    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }

    isItemExpanded(processedItem) {
        return processedItem.expanded;
    }

    isItemActive(processedItem) {
        return this.isItemExpanded(processedItem) || this.activeItemPath.some((path) => path && path.key === processedItem.key);
    }

    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemFocused(processedItem) {
        return this.focusedItemId === this.getItemId(processedItem);
    }

    isItemGroup(processedItem) {
        return isNotEmpty(processedItem.items);
    }

    getAnimation(processedItem) {
        return this.isItemActive(processedItem) ? { value: 'visible', params: { transitionParams: this.transitionOptions, height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }

    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }

    onItemClick(event, processedItem) {
        if (!this.isItemDisabled(processedItem)) {
            this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
            this.itemToggle.emit({ processedItem, expanded: !this.isItemActive(processedItem) });
        }
    }

    onItemToggle(event) {
        this.itemToggle.emit(event);
    }
}

@Component({
    selector: 'p-panelMenuList, p-panel-menu-list',
    imports: [PanelMenuSub, RouterModule, TooltipModule, SharedModule],
    standalone: true,
    template: `
        <p-panelmenu-sub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
        ></p-panelmenu-sub>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PanelMenuList extends BaseComponent implements OnChanges {
    @Input() panelId: string | undefined;

    @Input() id: string | undefined;

    @Input() items: any[];

    @Input() itemTemplate: TemplateRef<any> | undefined;

    @Input({ transform: booleanAttribute }) parentExpanded: boolean | undefined;

    @Input({ transform: booleanAttribute }) expanded: boolean | undefined;

    @Input() transitionOptions: string | undefined;

    @Input({ transform: booleanAttribute }) root: boolean | undefined;

    @Input({ transform: numberAttribute }) tabindex: number | undefined;

    @Input() activeItem: any;

    @Output() itemToggle: EventEmitter<any> = new EventEmitter<any>();

    @Output() headerFocus: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('submenu') subMenuViewChild: PanelMenuSub;

    searchTimeout: any;

    searchValue: any;

    focused: boolean | undefined;

    focusedItem = signal<any>(null);

    activeItemPath = signal<any[]>([]);

    processedItems = signal<any[]>([]);

    visibleItems = computed(() => {
        const processedItems = this.processedItems();
        return this.flatItems(processedItems);
    });

    get focusedItemId() {
        const focusedItem = this.focusedItem();
        return focusedItem && focusedItem.item?.id ? focusedItem.item.id : isNotEmpty(this.focusedItem()) ? `${this.panelId}_${this.focusedItem().key}` : undefined;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.processedItems.set(this.createProcessedItems(changes?.items?.currentValue || this.items || []));
    }

    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? resolve(processedItem.item[name]) : undefined;
    }

    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }

    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemActive(processedItem) {
        return this.activeItemPath().some((path) => path.key === processedItem.parentKey);
    }

    isItemGroup(processedItem) {
        return isNotEmpty(processedItem.items);
    }

    isElementInPanel(event, element) {
        const panel = event.currentTarget.closest('[data-pc-section="panel"]');

        return panel && panel.contains(element);
    }

    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isVisibleItem(processedItem) {
        return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    }

    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem) && !processedItem.separator;
    }

    findFirstItem() {
        return this.visibleItems().find((processedItem) => this.isValidItem(processedItem));
    }

    findLastItem() {
        return findLast(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }

    findItemByEventTarget(target: EventTarget): undefined | any {
        let parentNode = target as ParentNode & Element;

        while (parentNode && parentNode.tagName?.toLowerCase() !== 'li') {
            parentNode = parentNode?.parentNode as Element;
        }

        return parentNode?.id && this.visibleItems().find((processedItem) => this.isValidItem(processedItem) && `${this.panelId}_${processedItem.key}` === parentNode.id);
    }

    createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
        const processedItems = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem = {
                    icon: item.icon,
                    expanded: item.expanded,
                    separator: item.separator,
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };

                newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }

    findProcessedItemByItemKey(key, processedItems?, level = 0) {
        processedItems = processedItems || this.processedItems();
        if (processedItems && processedItems.length) {
            for (let i = 0; i < processedItems.length; i++) {
                const processedItem = processedItems[i];

                if (this.getItemProp(processedItem, 'key') === key) return processedItem;
                const matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
                if (matchedItem) return matchedItem;
            }
        }
    }

    flatItems(processedItems, processedFlattenItems = []) {
        processedItems &&
            processedItems.forEach((processedItem) => {
                if (this.isVisibleItem(processedItem)) {
                    processedFlattenItems.push(processedItem);
                    this.flatItems(processedItem.items, processedFlattenItems);
                }
            });

        return processedFlattenItems;
    }

    changeFocusedItem(event) {
        const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;

        if (isNotEmpty(this.focusedItem()) && this.focusedItem().key !== processedItem.key) {
            this.focusedItem.set(processedItem);
            this.scrollInView();
        } else if (allowHeaderFocus) {
            this.headerFocus.emit({ originalEvent, focusOnNext, selfCheck });
        }
    }

    scrollInView() {
        const element = findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    onFocus(event) {
        if (!this.focused) {
            this.focused = true;
            const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findItemByEventTarget(event.target) || this.findFirstItem() : this.findLastItem());
            if (event.relatedTarget !== null) this.focusedItem.set(focusedItem);
        }
    }

    onBlur(event) {
        const target = event.relatedTarget;

        if (this.focused && !this.el.nativeElement.contains(target)) {
            this.focused = false;
            this.focusedItem.set(null);
            this.searchValue = '';
        }
    }

    onItemToggle(event) {
        const { processedItem, expanded } = event;

        // Update the original item object's 'expanded' property
        if (processedItem.item) {
            processedItem.item.expanded = !processedItem.item.expanded;
        }

        // Recreate processedItems with updated 'expanded' states
        this.processedItems.set(this.createProcessedItems(this.items || [], 0, {}, ''));

        // Update activeItemPath
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
        if (expanded) {
            activeItemPath.push(processedItem);
        }
        this.activeItemPath.set(activeItemPath);

        // Update focusedItem
        this.focusedItem.set(processedItem);
    }

    onKeyDown(event) {
        const metaKey = event.metaKey || event.ctrlKey;

        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;

            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            case 'Space':
                this.onSpaceKey(event);
                break;

            case 'Enter':
                this.onEnterKey(event);
                break;

            case 'Escape':
            case 'Tab':
            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;

            default:
                if (!metaKey && isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }

                break;
        }
    }

    onArrowDownKey(event) {
        const processedItem = isNotEmpty(this.focusedItem()) ? this.findNextItem(this.focusedItem()) : this.findFirstItem();
        this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true });
        event.preventDefault();
    }
    onArrowUpKey(event) {
        const processedItem = isNotEmpty(this.focusedItem()) ? this.findPrevItem(this.focusedItem()) : this.findLastItem();

        this.changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true });
        event.preventDefault();
    }

    onArrowLeftKey(event) {
        if (isNotEmpty(this.focusedItem())) {
            const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);

            if (matched) {
                const activeItemPath = this.activeItemPath().filter((p) => p.key !== this.focusedItem().key);
                this.activeItemPath.set(activeItemPath);
            } else {
                const focusedItem = isNotEmpty(this.focusedItem().parent) ? this.focusedItem().parent : this.focusedItem();
                this.focusedItem.set(focusedItem);
            }

            event.preventDefault();
        }
    }

    onArrowRightKey(event) {
        if (isNotEmpty(this.focusedItem())) {
            const grouped = this.isItemGroup(this.focusedItem());

            if (grouped) {
                const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);

                if (matched) {
                    this.onArrowDownKey(event);
                } else {
                    const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItem().parentKey);
                    activeItemPath.push(this.focusedItem());

                    this.activeItemPath.set(activeItemPath);
                }
            }

            event.preventDefault();
        }
    }

    onHomeKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findFirstItem(), allowHeaderFocus: false });
        event.preventDefault();
    }

    onEndKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findLastItem(), focusOnNext: true, allowHeaderFocus: false });
        event.preventDefault();
    }

    onEnterKey(event) {
        if (isNotEmpty(this.focusedItem())) {
            const element = <any>findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && (<any>findSingle(element, '[data-pc-section="action"]') || findSingle(element, 'a,button'));

            anchorElement ? anchorElement.click() : element && element.click();
        }

        event.preventDefault();
    }

    onSpaceKey(event) {
        this.onEnterKey(event);
    }

    findNextItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);

        const matchedItem =
            index < this.visibleItems().length - 1
                ? this.visibleItems()
                      .slice(index + 1)
                      .find((pItem) => this.isValidItem(pItem))
                : undefined;
        return matchedItem || processedItem;
    }

    findPrevItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index > 0 ? findLast(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;

        return matchedItem || processedItem;
    }

    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;

        let matchedItem = null;
        let matched = false;

        if (isNotEmpty(this.focusedItem())) {
            const focusedItemIndex = this.visibleItems().findIndex((processedItem) => processedItem.key === this.focusedItem().key);

            matchedItem = this.visibleItems()
                .slice(focusedItemIndex)
                .find((processedItem) => this.isItemMatched(processedItem));
            matchedItem = isEmpty(matchedItem)
                ? this.visibleItems()
                      .slice(0, focusedItemIndex)
                      .find((processedItem) => this.isItemMatched(processedItem))
                : matchedItem;
        } else {
            matchedItem = this.visibleItems().find((processedItem) => this.isItemMatched(processedItem));
        }

        if (isNotEmpty(matchedItem)) {
            matched = true;
        }

        if (isEmpty(matchedItem) && isEmpty(this.focusedItem())) {
            matchedItem = this.findFirstItem();
        }

        if (isNotEmpty(matchedItem)) {
            this.changeFocusedItem({
                originalEvent: event,
                processedItem: matchedItem,
                allowHeaderFocus: false
            });
        }

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);

        return matched;
    }
}

/**
 * PanelMenu is a hybrid of Accordion and Tree components.
 * @group Components
 */
@Component({
    selector: 'p-panelMenu, p-panelmenu, p-panel-menu',
    imports: [PanelMenuList, RouterModule, TooltipModule, ChevronDownIcon, ChevronRightIcon, SharedModule],
    standalone: true,
    template: `
        @for (item of model; track item; let f = $first; let l = $last; let i = $index) {
            @if (isItemVisible(item)) {
                <div [class]="cn(cx('panel'), getItemProp(item, 'headerClass'))" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [class]="cn(cx('header', { item }), getItemProp(item, 'styleClass'))"
                        [ngStyle]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [attr.data-pc-section]="'header'"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div [class]="cx('headerContent')">
                            @if (!itemTemplate && !_itemTemplate) {
                                @if (!getItemProp(item, 'routerLink')) {
                                    <a [attr.href]="getItemProp(item, 'url')" [attr.tabindex]="-1" [target]="getItemProp(item, 'target')" [attr.title]="getItemProp(item, 'title')" [class]="cx('headerLink')" [attr.data-pc-section]="'headeraction'">
                                        @if (isItemGroup(item)) {
                                            @if (!headerIconTemplate && !_headerIconTemplate) {
                                                @if (isItemActive(item)) {
                                                    <ChevronDownIcon [styleClass]="cx('headerIcon')" />
                                                }
                                                @if (!isItemActive(item)) {
                                                    <ChevronRightIcon [styleClass]="cx('headerIcon')" />
                                                }
                                            }
                                            <ng-template *ngTemplateOutlet="headerIconTemplate || _headerIconTemplate"></ng-template>
                                        }
                                        @if (item.icon) {
                                            <span [class]="cn(cx('headerIcon'), item.icon)" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                        }
                                        @if (getItemProp(item, 'escape') !== false) {
                                            <span [class]="cx('headerLabel')">{{ getItemProp(item, 'label') }}</span>
                                        } @else {
                                            <span [class]="cx('headerLabel')" [innerHTML]="getItemProp(item, 'label')"></span>
                                        }
                                        @if (getItemProp(item, 'badge')) {
                                            <span [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))">{{ getItemProp(item, 'badge') }}</span>
                                        }
                                    </a>
                                }
                            }
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            @if (getItemProp(item, 'routerLink')) {
                                <a
                                    [routerLink]="getItemProp(item, 'routerLink')"
                                    [queryParams]="getItemProp(item, 'queryParams')"
                                    [routerLinkActive]="'p-panelmenu-item-link-active'"
                                    [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                                    [target]="getItemProp(item, 'target')"
                                    [class]="cx('headerLink')"
                                    [attr.tabindex]="-1"
                                    [fragment]="getItemProp(item, 'fragment')"
                                    [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                    [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                    [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                    [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                    [state]="getItemProp(item, 'state')"
                                    [attr.data-pc-section]="'headeraction'"
                                >
                                    @if (isItemGroup(item)) {
                                        @if (!headerIconTemplate && !_headerIconTemplate) {
                                            @if (isItemActive(item)) {
                                                <ChevronDownIcon [styleClass]="cx('headerIcon')" />
                                            }
                                            @if (!isItemActive(item)) {
                                                <ChevronRightIcon [styleClass]="cx('headerIcon')" />
                                            }
                                        }
                                        <ng-template *ngTemplateOutlet="headerIconTemplate || _headerIconTemplate"></ng-template>
                                    }
                                    @if (item.icon) {
                                        <span [class]="cn(cx('headerIcon'), item.icon)" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                    }
                                    @if (getItemProp(item, 'escape') !== false) {
                                        <span [class]="cx('headerLabel')">{{ getItemProp(item, 'label') }}</span>
                                    } @else {
                                        <span [class]="cx('headerLabel')" [innerHTML]="getItemProp(item, 'label')"></span>
                                    }
                                    @if (getItemProp(item, 'badge')) {
                                        <span [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))">{{ getItemProp(item, 'badge') }}</span>
                                    }
                                </a>
                            }
                        </div>
                    </div>
                    @if (isItemGroup(item)) {
                        <div
                            [class]="cx('contentContainer', { processedItem: item })"
                            [@rootItem]="getAnimation(item)"
                            (@rootItem.done)="onToggleDone()"
                            role="region"
                            [attr.id]="getContentId(item, i)"
                            [attr.aria-labelledby]="getHeaderId(item, i)"
                            [attr.data-pc-section]="'toggleablecontent'"
                        >
                            <div [class]="cx('content')" [attr.data-pc-section]="'menucontent'">
                                <p-panelMenuList
                                    [panelId]="getPanelId(i, item)"
                                    [items]="getItemProp(item, 'items')"
                                    [itemTemplate]="itemTemplate || _itemTemplate"
                                    [transitionOptions]="transitionOptions"
                                    [root]="true"
                                    [activeItem]="activeItem()"
                                    [tabindex]="tabindex"
                                    [parentExpanded]="isItemActive(item)"
                                    (headerFocus)="updateFocusedHeader($event)"
                                ></p-panelMenuList>
                            </div>
                        </div>
                    }
                </div>
            }
        }
    `,
    animations: [
        trigger('rootItem', [
            state(
                'hidden',
                style({
                    height: '0',
                    visibility: 'hidden'
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                    visibility: '*'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PanelMenuStyle],
    host: {
        '[class]': 'cx("root")',
        'data-pc-section': 'root',
        'data-pc-name': 'panelmenu'
    }
})
export class PanelMenu extends BaseComponent implements AfterContentInit {
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
     * Whether multiple tabs can be activated at the same time or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) multiple: boolean = false;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Current id state as a string.
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined = 0;

    @ViewChild('container') containerViewChild: ElementRef | undefined;
    /**
     * Template option of submenu icon.
     * @group Templates
     */
    @ContentChild('submenuicon', { descendants: false }) submenuIconTemplate: TemplateRef<any> | undefined;
    /**
     * Template option of header icon.
     * @group Templates
     */
    @ContentChild('headericon', { descendants: false }) headerIconTemplate: TemplateRef<any> | undefined;
    /**
     * Template option of item.
     * @group Templates
     */
    @ContentChild('item', { descendants: false }) itemTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _submenuIconTemplate: TemplateRef<any> | undefined;

    _headerIconTemplate: TemplateRef<any> | undefined;

    _itemTemplate: TemplateRef<any> | undefined;

    public animating: boolean | undefined;

    activeItem = signal<any>(null);

    _componentStyle = inject(PanelMenuStyle);

    ngOnInit() {
        super.ngOnInit();
        this.id = this.id || uuid('pn_id_');
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this._submenuIconTemplate = item.template;
                    break;

                case 'headericon':
                    this._headerIconTemplate = item.template;
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

    /**
     * Collapses open panels.
     * @group Method
     */
    collapseAll() {
        for (let item of this.model!) {
            if (item.expanded) {
                item.expanded = false;
            }
        }

        this.cd.detectChanges();
    }

    onToggleDone() {
        this.animating = false;
        this.cd.markForCheck();
    }

    changeActiveItem(event, item, index?: number, selfActive = false) {
        if (!this.isItemDisabled(item)) {
            const activeItem = selfActive ? item : this.activeItem && equals(item, this.activeItem) ? null : item;
            this.activeItem.set(activeItem);
        }
    }

    getAnimation(item: MenuItem) {
        return item.expanded ? { value: 'visible', params: { transitionParams: this.animating ? this.transitionOptions : '0ms', height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }

    getItemProp(item, name): any {
        return item ? resolve(item[name]) : undefined;
    }

    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }

    isItemActive(item) {
        return item.expanded;
    }

    isItemVisible(item) {
        return this.getItemProp(item, 'visible') !== false;
    }

    isItemDisabled(item) {
        return this.getItemProp(item, 'disabled');
    }

    isItemGroup(item) {
        return isNotEmpty(item.items);
    }

    getPanelId(index, item?) {
        return item && item.id ? item.id : `${this.id}_${index}`;
    }

    getHeaderId(item, index) {
        return item.id ? item.id + '_header' : `${this.getPanelId(index)}_header`;
    }

    getContentId(item, index) {
        return item.id ? item.id + '_content' : `${this.getPanelId(index)}_content`;
    }

    updateFocusedHeader(event) {
        const { originalEvent, focusOnNext, selfCheck } = event;
        const panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
        const header = selfCheck ? findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);

        header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    }

    changeFocusedHeader(event, element) {
        element && focus(element);
    }

    findNextHeader(panelElement, selfCheck = false) {
        const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
        const headerElement = findSingle(nextPanelElement, '[data-pc-section="header"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
    }

    findPrevHeader(panelElement, selfCheck = false) {
        const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
        const headerElement = findSingle(prevPanelElement, '[data-pc-section="header"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
    }

    findFirstHeader() {
        return this.findNextHeader(this.containerViewChild.nativeElement.firstElementChild, true);
    }

    findLastHeader() {
        return this.findPrevHeader(this.containerViewChild.nativeElement.lastElementChild, true);
    }

    onHeaderClick(event, item, index) {
        if (this.isItemDisabled(item)) {
            event.preventDefault();

            return;
        }

        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        if (!this.multiple) {
            for (let modelItem of this.model!) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }

        item.expanded = !item.expanded;
        this.changeActiveItem(event, item, index);
        this.animating = true;
        focus(event.currentTarget as HTMLElement);
    }

    onHeaderKeyDown(event, item, index) {
        switch (event.code) {
            case 'ArrowDown':
                this.onHeaderArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onHeaderArrowUpKey(event);
                break;

            case 'Home':
                this.onHeaderHomeKey(event);
                break;

            case 'End':
                this.onHeaderEndKey(event);
                break;

            case 'Enter':
            case 'Space':
                this.onHeaderEnterKey(event, item, index);
                break;

            default:
                break;
        }
    }

    onHeaderArrowDownKey(event) {
        const rootList = getAttribute(event.currentTarget, 'data-p-highlight') === true ? <any>findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;

        rootList ? focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }

    onHeaderArrowUpKey(event) {
        const prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
        const rootList = getAttribute(prevHeader, 'data-p-highlight') === true ? <any>findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;

        rootList ? focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
        event.preventDefault();
    }

    onHeaderHomeKey(event) {
        this.changeFocusedHeader(event, this.findFirstHeader());
        event.preventDefault();
    }

    onHeaderEndKey(event) {
        this.changeFocusedHeader(event, this.findLastHeader());
        event.preventDefault();
    }

    onHeaderEnterKey(event, item, index) {
        const headerAction = <any>findSingle(event.currentTarget, '[data-pc-section="headeraction"]');

        headerAction ? headerAction.click() : this.onHeaderClick(event, item, index);
        event.preventDefault();
    }
}
@NgModule({
    imports: [PanelMenu, SharedModule],
    exports: [PanelMenu, SharedModule]
})
export class PanelMenuModule {}
