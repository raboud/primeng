import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    NgModule,
    numberAttribute,
    OnInit,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { focus, getFirstFocusableElement, uuid } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { StarFillIcon, StarIcon } from 'primeng/icons';
import { Nullable } from 'primeng/ts-helpers';
import { RatingRateEvent } from './rating.interface';
import { RatingStyle } from './style/ratingstyle';
import { BaseInput } from 'primeng/baseinput';

export const RATING_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
/**
 * Rating is an extension to standard radio button element with theming.
 * @group Components
 */
@Component({
    selector: 'p-rating',
    imports: [CommonModule, AutoFocus, StarFillIcon, StarIcon, SharedModule],
    standalone: true,
    template: `
        @if (!isCustomIcon) {
            @for (star of starsArray; track star; let i = $index) {
                <div [class]="cx('option', { star, value })" (click)="onOptionClick($event, star + 1)">
                    <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                        <input
                            type="radio"
                            value="0"
                            [attr.id]="nameattr"
                            [attr.name]="name()"
                            [attr.value]="modelValue()"
                            [attr.min]="min()"
                            [attr.minlength]="minlength()"
                            [attr.maxlength]="maxlength()"
                            [attr.disabled]="disabled()"
                            [attr.required]="required()"
                            [checked]="value === 0"
                            [disabled]="disabled()"
                            [readonly]="readonly"
                            [attr.aria-label]="starAriaLabel(star + 1)"
                            (focus)="onInputFocus($event, star + 1)"
                            (blur)="onInputBlur($event)"
                            (change)="onChange($event, star + 1)"
                            [pAutoFocus]="autofocus"
                        />
                    </span>
                    @if (!value || i >= value) {
                        @if (iconOffClass) {
                            <span [class]="cx('offIcon')" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" [attr.data-pc-section]="'offIcon'"></span>
                        }
                        @if (!iconOffClass) {
                            <StarIcon [ngStyle]="iconOffStyle" [styleClass]="cx('offIcon')" [attr.data-pc-section]="'offIcon'" />
                        }
                    }
                    @if (value && i < value) {
                        @if (iconOnClass) {
                            <span [class]="cx('onIcon')" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" [attr.data-pc-section]="'onIcon'"></span>
                        }
                        @if (!iconOnClass) {
                            <StarFillIcon [ngStyle]="iconOnStyle" [styleClass]="cx('onIcon')" [attr.data-pc-section]="'onIcon'" />
                        }
                    }
                </div>
            }
        } @else {
            @for (star of starsArray; track star; let i = $index) {
                <span (click)="onOptionClick($event, star + 1)" [attr.data-pc-section]="'onIcon'">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            }
        }
    `,
    providers: [RATING_VALUE_ACCESSOR, RatingStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-pc-name]': "'rating'",
        '[attr.data-pc-section]': "'root'"
    }
})
export class Rating extends BaseInput implements OnInit, ControlValueAccessor {
    /**
     * When present, changing the value is not possible.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean | undefined;
    /**
     * Number of stars.
     * @group Props
     */
    @Input({ transform: numberAttribute }) stars: number = 5;
    /**
     * Style class of the on icon.
     * @group Props
     */
    @Input() iconOnClass: string | undefined;
    /**
     * Inline style of the on icon.
     * @group Props
     */
    @Input() iconOnStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the off icon.
     * @group Props
     */
    @Input() iconOffClass: string | undefined;
    /**
     * Inline style of the off icon.
     * @group Props
     */
    @Input() iconOffStyle: { [klass: string]: any } | null | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Emitted on value change.
     * @param {RatingRateEvent} value - Custom rate event.
     * @group Emits
     */
    @Output() onRate: EventEmitter<RatingRateEvent> = new EventEmitter<RatingRateEvent>();
    /**
     * Emitted when the rating is cancelled.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Emitted when the rating receives focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /**
     * Emitted when the rating loses focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /**
     * Custom on icon template.
     * @group Templates
     */
    @ContentChild('onicon', { descendants: false }) onIconTemplate: Nullable<TemplateRef<any>>;
    /**
     * Custom off icon template.
     * @group Templates
     */
    @ContentChild('officon', { descendants: false }) offIconTemplate: Nullable<TemplateRef<any>>;
    /**
     * Custom cancel icon template.
     * @group Templates
     */
    @ContentChild('cancelicon', { descendants: false }) cancelIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    value: Nullable<number>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    public starsArray: Nullable<number[]>;

    isFocusVisibleItem: boolean = true;

    focusedOptionIndex = signal<number>(-1);

    nameattr: string | undefined;

    _componentStyle = inject(RatingStyle);

    _onIconTemplate: TemplateRef<any> | undefined;

    _offIconTemplate: TemplateRef<any> | undefined;

    _cancelIconTemplate: TemplateRef<any> | undefined;

    ngOnInit() {
        super.ngOnInit();
        this.nameattr = this.nameattr || uuid('pn_id_');
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'onicon':
                    this._onIconTemplate = item.template;
                    break;

                case 'officon':
                    this._offIconTemplate = item.template;
                    break;

                case 'cancelicon':
                    this._cancelIconTemplate = item.template;
                    break;
            }
        });
    }

    onOptionClick(event, value) {
        if (!this.readonly && !this.disabled()) {
            this.onOptionSelect(event, value);
            this.isFocusVisibleItem = false;
            const firstFocusableEl = <any>getFirstFocusableElement(event.currentTarget, '');

            firstFocusableEl && focus(firstFocusableEl);
        }
    }

    onOptionSelect(event, value) {
        if (!this.readonly && !this.disabled()) {
            if (this.focusedOptionIndex() === value || value === this.value) {
                this.focusedOptionIndex.set(-1);
                this.updateModel(event, null);
            } else {
                this.focusedOptionIndex.set(value);
                this.updateModel(event, value || null);
            }
        }
    }

    onChange(event, value) {
        this.onOptionSelect(event, value);
        this.isFocusVisibleItem = true;
    }

    onInputBlur(event) {
        this.focusedOptionIndex.set(-1);
        this.onBlur.emit(event);
    }

    onInputFocus(event, value) {
        if (!this.readonly && !this.disabled()) {
            this.focusedOptionIndex.set(value);
            this.onFocus.emit(event);
        }
    }

    updateModel(event, value) {
        this.writeValue(value);
        this.onModelChange(this.value);
        this.onModelTouched();

        if (!value) {
            this.onCancel.emit();
        } else {
            this.onRate.emit({
                originalEvent: event,
                value
            });
        }
    }

    starAriaLabel(value) {
        return value === 1 ? this.config.translation.aria.star : this.config.translation.aria.stars.replace(/{star}/g, value);
    }

    getIconTemplate(i: number): Nullable<TemplateRef<any>> {
        return !this.value || i >= this.value ? this.offIconTemplate || this._offIconTemplate : this.onIconTemplate || this.offIconTemplate;
    }

    writeValue(value: any): void {
        this.value = value;
        this.writeModelValue(value);
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    get isCustomIcon(): boolean {
        return !!(this.onIconTemplate || this._onIconTemplate || this.offIconTemplate || this._offIconTemplate || this.cancelIconTemplate || this._cancelIconTemplate);
    }
}

@NgModule({
    imports: [Rating, SharedModule],
    exports: [Rating, SharedModule]
})
export class RatingModule {}
