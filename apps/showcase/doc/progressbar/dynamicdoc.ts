import { Code } from '@/domain/code';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'dynamic-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Value is reactive so updating it dynamically changes the bar as well.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast />
            <p-progressbar [value]="value" />
        </div>
        <app-code [code]="code" selector="progress-bar-dynamic-demo"></app-code>
    `,
    providers: [MessageService]
})
export class DynamicDoc implements OnInit, OnDestroy {
    private messageService = inject(MessageService);
    private cd = inject(ChangeDetectorRef);
    private ngZone = inject(NgZone);

    value: number = 0;

    interval: any;

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.interval = setInterval(() => {
                this.ngZone.run(() => {
                    this.value = this.value + Math.floor(Math.random() * 10) + 1;
                    if (this.value >= 100) {
                        this.value = 100;
                        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
                        clearInterval(this.interval);
                    }
                    this.cd.markForCheck();
                });
            }, 2000);
        });
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    code: Code = {
        basic: `<p-progressbar [value]="value" />`,
        html: `<div class="card">
    <p-toast />
    <p-progressbar [value]="value" />
</div>`,
        typescript: `import { Component, NgZone, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'progress-bar-dynamic-demo',
    templateUrl: './progress-bar-dynamic-demo.html',
    standalone: true,
    imports: [ProgressBar, ToastModule],
    providers: [MessageService]
})
export class ProgressBarDynamicDemo implements OnInit {
    value: number = 0;

    interval: any;

    constructor(private messageService: MessageService, private ngZone: NgZone) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.interval = setInterval(() => {
                this.ngZone.run(() => {
                    this.value = this.value + Math.floor(Math.random() * 10) + 1;
                    if (this.value >= 100) {
                        this.value = 100;
                        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
                        clearInterval(this.interval);
                    }
                });
            }, 2000);
        });
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}`
    };
}
