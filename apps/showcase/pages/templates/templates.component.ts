import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'templates',
    standalone: false,
    templateUrl: './templates.component.html'
})
export class TemplatesComponent {
    private titleService = inject(Title);
    private metaService = inject(Meta);

    constructor() {
        this.titleService.setTitle('Angular Application Templates - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'PrimeNG Angular application templates.' });
    }
}
