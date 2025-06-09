import { Component, inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'footer',
    standalone: false,
    template: `
        <div class="flex w-full justify-end mt-4">
            <p-button type="button" label="Cancel" icon="pi pi-times" (click)="closeDialog({ buttonType: 'Cancel', summary: 'No Product Selected' })"></p-button>
        </div>
    `
})
export class Footer {
    ref = inject(DynamicDialogRef);

    closeDialog(data) {
        this.ref.close(data);
    }
}
