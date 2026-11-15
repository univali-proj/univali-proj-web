import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener, inject, input, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ICONS } from '../icons';

export type SidebarItem =
  | { type: 'section'; label: string }
  | { type: 'link'; label: string; route: string; icon?: keyof typeof ICONS; exact?: boolean };

@Component({
  selector: 'app-main-layout',
  imports: [NgIcon, NgTemplateOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  readonly items = input.required<readonly SidebarItem[]>();

  private readonly document = inject(DOCUMENT);
  private readonly drawer = viewChild.required<ElementRef<HTMLDialogElement>>('drawer');
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private previousBodyOverflow: string | null = null;

  protected readonly drawerOpen = signal(false);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.restoreBodyOverflow());
  }

  protected openDrawer(): void {
    const drawer = this.drawer().nativeElement;
    if (drawer.open) {
      return;
    }

    drawer.showModal();
    if (this.previousBodyOverflow === null) {
      this.previousBodyOverflow = this.document.body.style.overflow;
    }
    this.document.body.style.overflow = 'hidden';
    this.drawerOpen.set(true);
  }

  protected closeDrawer(): void {
    this.drawer().nativeElement.close();
  }

  protected onDrawerClosed(): void {
    if (this.drawer().nativeElement.open) {
      return;
    }

    this.drawerOpen.set(false);
    this.restoreBodyOverflow();
    const button = this.menuButton().nativeElement;
    if (button.getClientRects().length) {
      button.focus();
    }
  }

  @HostListener('window:resize')
  protected onResize(): void {
    if (this.drawer().nativeElement.open && this.document.defaultView?.matchMedia('(min-width: 64rem)').matches) {
      this.closeDrawer();
    }
  }

  private restoreBodyOverflow(): void {
    if (this.previousBodyOverflow !== null) {
      this.document.body.style.overflow = this.previousBodyOverflow;
      this.previousBodyOverflow = null;
    }
  }
}
