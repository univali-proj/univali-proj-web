import { Component, DestroyRef, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Landing } from './landing';

/*
  Versão mobile da página inicial. Reaproveita toda a lógica de Landing e
  troca apenas o template e os estilos por uma apresentação pensada para
  toque: menu em tela cheia, alvos de toque generosos e leitura em coluna única.
*/
@Component({
  selector: 'app-landing-mobile',
  imports: [NgIcon],
  templateUrl: './landing-mobile.html',
  styleUrl: './landing-mobile.css',
})
export class LandingMobile extends Landing {
  constructor() {
    super();

    // O cabeçalho mobile é mais baixo; ajusta o deslocamento das âncoras
    const root = this.document.documentElement;
    const previousScrollPadding = root.style.scrollPaddingTop;
    root.style.scrollPaddingTop = '4.75rem';

    inject(DestroyRef).onDestroy(() => {
      root.style.scrollPaddingTop = previousScrollPadding;
      this.document.body.style.removeProperty('overflow');
    });
  }

  protected override toggleMenu(): void {
    super.toggleMenu();
    this.syncScrollLock();
  }

  protected override closeMenu(): void {
    super.closeMenu();
    this.syncScrollLock();
  }

  // Trava a rolagem do fundo enquanto o menu em tela cheia está aberto
  private syncScrollLock(): void {
    if (this.menuOpen()) {
      this.document.body.style.setProperty('overflow', 'hidden');
    } else {
      this.document.body.style.removeProperty('overflow');
    }
  }
}
