import { Component, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import type { ICONS } from '../icons';

@Component({
  selector: 'app-page-header',
  imports: [NgIcon],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly primaryActionLabel = input<string | undefined>(undefined, { alias: 'primary-action-label' });
  readonly primaryActionIcon = input<keyof typeof ICONS | undefined>(undefined, { alias: 'primary-action-icon' });
  readonly primaryAction = output<void>({ alias: 'primary-action' });
}
