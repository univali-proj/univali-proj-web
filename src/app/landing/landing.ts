import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { environment } from '../../env/environment.local';

@Component({
  selector: 'app-landing',
  imports: [NgIcon],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  private readonly document = inject(DOCUMENT);
  private readonly header = viewChild<ElementRef<HTMLElement>>('header');
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly contactField = viewChild<ElementRef<HTMLTextAreaElement>>('contactField');
  private lastScrollPosition = 0;
  private scrollDirection = 0;
  private scrollDistance = 0;

  protected readonly menuOpen = signal(false);
  protected readonly headerHidden = signal(false);
  protected readonly contactMessage = signal('');
  protected readonly contactError = signal(false);
  protected readonly navigation = [
    { id: 'inicio', label: 'Início' },
    { id: 'bolos', label: 'Nossos bolos' },
    { id: 'sobre', label: 'Sobre a Confitto' },
    { id: 'encomendas', label: 'Como encomendar' },
    { id: 'contato', label: 'Contato' },
  ];
  protected readonly previews = ['01', '02', '03'];
  protected readonly steps = ['01', '02', '03'];

  @HostListener('window:scroll')
  protected onScroll(): void {
    const position = Math.max(0, this.document.defaultView?.scrollY ?? 0);
    const delta = position - this.lastScrollPosition;
    this.lastScrollPosition = position;

    if (position <= 80 || this.menuOpen() || this.hasHeaderFocus()) {
      this.headerHidden.set(false);
      this.scrollDistance = 0;
      return;
    }

    const direction = Math.sign(delta);
    if (direction !== this.scrollDirection) {
      this.scrollDistance = 0;
      this.scrollDirection = direction;
    }
    this.scrollDistance += Math.abs(delta);
    if (this.scrollDistance >= 8) {
      this.headerHidden.set(direction > 0);
    }
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    this.headerHidden.set(false);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected revealHeader(): void {
    this.headerHidden.set(false);
  }

  @HostListener('document:keydown.escape')
  protected dismissMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu();
      this.menuButton()?.nativeElement.focus();
    }
  }

  protected openProducts(): void {}

  protected updateContactMessage(message: string): void {
    this.contactMessage.set(message);
    if (message.trim()) {
      this.contactError.set(false);
    }
  }

  protected openContact(): void {
    const message = this.contactMessage().trim();
    if (!message) {
      this.contactError.set(true);
      this.contactField()?.nativeElement.focus();
      return;
    }

    // O wa.me exige apenas dígitos no número, em formato internacional
    const number = environment.contactNumber.replace(/\D/g, '');
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    this.document.defaultView?.open(url, '_blank', 'noopener,noreferrer');
  }

  private hasHeaderFocus(): boolean {
    return this.header()?.nativeElement.contains(this.document.activeElement) ?? false;
  }
}
