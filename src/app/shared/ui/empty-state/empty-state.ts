import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import type { ICONS } from '../icons';

@Component({
  selector: 'app-empty-state',
  imports: [NgIcon],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
  host: {
    role: 'status',
    'aria-atomic': 'true',
  },
})
export class EmptyState {
  readonly text = input.required<string>();
  readonly icon = input.required<keyof typeof ICONS>();
}
