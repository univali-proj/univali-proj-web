# UnivaliProjWeb

Interface web (SPA) para o projeto de extensão da disciplina Programação Web da Universidade do Vale do Itajaí. Desenvolvido usando Angular 22.1 e Tailwind CSS.

## Desenvolvimento

Um passo-a-passo para as várias ferramentas usadas no desenvolvimento do projeto.

### Dependências

Requer [Node.js](https://nodejs.org/en/download) para iniciar o servidor e atualizar dependências.
Requer [Git](https://git-scm.com/install/) para atualizar suas mudanças.

### Colaboração

Criar uma [issue](https://github.com/univali-proj/univali-proj-web/issues) quando é preciso consertar um bug, adicionar novas features, etc. A partir disso, você pode criar uma branch a partir da issue criada.

Para visualizar sua nova branch, use `git fetch origin`, e então `git switch <nome-da-sua-branch>`.

Para mudanças, use `git add <nome-do-arquivo-mudado>`, ou `git add .` para todos os arquivos. Uma vez que os arquivos estejam na fila, use `git commit -m "<mensagem-curta-do-que-mudou>"`. 

Caso tenha usado em um arquivo errado ou acidentalmente, use `git restore --staged <nome-do-arquivo-errado>`. Isso não vai reverter suas mudanças locais, apenas não vai mandá-lo para o commit.

Commits ficam salvos apenas localmente. Para atualizar o repositório com um ou múltiplos commits, use `git push origin <nome-da-sua-branch>`, ou apenas `git push` caso já esteja na sua branch localmente.

**Cuidado com git push**. Certifique-se que está de fato na sua branch (`git branch` para verificar). Push diretamente na main pode causar problemas.

É geralmente uma boa ideia, no início do desenvolvimento, usar `git fetch origin` para verificar se houve mudanças na branch principal. Caso existam:

```bash
git switch main
git pull
git switch <nome-da-sua-branch>
git rebase origin/main
```

### Iniciando o servidor localmente

Para sincronizar seu computador com as dependências do projeto, use:

```bash
npm install
```

Isso certifica que sua máquina local está sincronizada com o `package-lock.json`. 

Para iniciar o servidor de desenvolvimento local, use:

```bash
npx ng serve
```

Quando o servidor estiver rodando, pode usar qualquer browser para navegar para `http://localhost:4200`. A aplicação vai recarregar automaticamente quando você modificar algum arquivo.

### Pull Request

Quando sua branch estiver pronta, seja por terminar de consertar um bug, terminar uma feature, etc use um [Pull Request](https://github.com/univali-proj/univali-proj-web/pulls) para pedir integração com a branch principal. Isso garante que a branch principal não receba várias mudanças de uma só vez.

## Produção e Vercel

O comando `npm run build` usa a configuração `production` por padrão. O Angular substitui
`src/env/environment.local.ts` por `src/env/environment.prod.ts` durante esse build.
Importe sempre o ambiente local no código; não é necessário detectar o domínio em tempo de execução.
O comando `npm start` continua usando o ambiente de desenvolvimento.

O arquivo `vercel.json` define o build de produção, a pasta de saída
`dist/univali-proj-web/browser` e o fallback para `index.html`, permitindo acessar rotas da SPA diretamente.
As configurações de ambiente são incorporadas ao JavaScript público durante o build: não inclua segredos.
A API de produção usa HTTPS para evitar bloqueio por conteúdo misto em páginas HTTPS.

### Requisições HTTP

O `HttpClient` está registrado globalmente. Injete `ApiService`, disponível em
`src/app/core/http/api.service.ts`, para requisições JSON com `get`, `post`, `put`, `patch` e `delete`.
Os métodos aceitam opções de cabeçalhos, parâmetros de consulta, contexto HTTP e credenciais.

```typescript
import { inject } from '@angular/core';
import { ApiService } from './core/http/api.service';

interface Product {
  id: number;
  name: string;
}

// Dentro de um componente ou serviço:
private readonly api = inject(ApiService);

loadProducts(): void {
  this.api.get<Product[]>('/products', { params: { page: 1 } }).subscribe({
    next: (products) => console.log('Produtos carregados:', products),
    error: (error: unknown) => console.error('Erro ao carregar produtos:', error)
  });
}
```

`buildApiUrl` une a URL base, o prefixo e o endpoint, normalizando as barras nas junções.
Assim, `/products`, `products` e `///products///` geram a mesma URL.
Passe endpoints relativos à API, não URLs absolutas. Para consultas, prefira a opção `params`.
No ambiente de produção, o resultado é `https://confitto-api.vercel.app/api/v1/products`.
O serviço retorna o `Observable` sem fazer `subscribe`, tratar erros ou tentar novamente;
o chamador controla `next`, `error` e os operadores RxJS.

## Documentação

A paleta fica em `tailwind.config.js`, carregada pelo CSS global com `@config`.
`brand-600` preserva `#FF669A` nos detalhes; botões usam bege e texto marrom para manter o contraste.
Ícones devem ser importados e registrados em `src/app/shared/ui/icons.ts`.

### Layout da aplicação

`MainLayout`, em `src/app/shared/ui/main-layout/main-layout.ts`, é independente da página
inicial. Ele recebe uma lista de itens da sidebar e projeta o conteúdo do componente que o utiliza.
No desktop, a sidebar permanece visível; no celular, o botão de menu abre uma gaveta.
O layout não inclui cabeçalho nem cria rotas.

```typescript
import { Component } from '@angular/core';
import { MainLayout, SidebarItem } from './shared/ui/main-layout/main-layout';

@Component({
  imports: [MainLayout],
  template: `
    <app-main-layout [items]="navigation">
      <h1>Minha conta</h1>
    </app-main-layout>
  `,
})
export class AccountPage {
  readonly navigation: readonly SidebarItem[] = [
    { type: 'section', label: 'Minha conta' },
    { type: 'link', label: 'Configurações', route: '/configuracoes', icon: 'matMenuRound', exact: true },
  ];
}
```

Os caminhos do exemplo devem corresponder às rotas da aplicação. Os ícones são opcionais e devem
estar registrados em `ICONS`. Use `exact: true` para destacar um link somente na rota exata;
por padrão, rotas filhas também mantêm o link destacado.

### Estado vazio

Importe `EmptyState`, de `src/app/shared/ui/empty-state/empty-state.ts`, no componente que
vai utilizá-lo e adicione-o à lista `imports`.

```html
<app-empty-state
  icon="matSearchOffRound"
  text="Nenhum resultado encontrado."
/>
```

Os inputs `text` e `icon` são obrigatórios. O ícone deve estar registrado em `ICONS`.
O componente centraliza o ícone acima do texto e usa os tons `brand-700` e `brand-800`
para manter a identidade visual e a legibilidade no fundo claro.
Quem o utiliza decide quando exibi-lo: somente após uma busca concluída com sucesso
e uma lista vazia, não durante o carregamento ou em caso de erro.

### Cabeçalho das páginas

Importe `PageHeader`, de `src/app/shared/ui/page-header/page-header.ts`, e adicione-o à lista
`imports` da página. Os inputs `title` e `description` são obrigatórios.
O componente não é inserido automaticamente no layout e não altera o cabeçalho da landing page.

```html
<app-page-header
  title="Produtos"
  description="Gerencie os produtos disponíveis no catálogo."
  primary-action-label="Novo produto"
  primary-action-icon="matAddRound"
  (primary-action)="openProductForm()"
/>
```

O input opcional `primary-action-label` exibe o botão de ação quando preenchido.
`primary-action-icon` também é opcional e aceita os ícones registrados em `ICONS`;
quando informado, aparece antes do texto. `primary-action` é um **output**, não uma função
recebida por input: vincule o evento ao método da página que deve executar a ação.
Sem rótulo, o botão não é renderizado. Em telas estreitas, a ação aparece abaixo do texto.

[Documentação do Angular](https://angular.dev/overview)

[Documentação do TypeScript](https://www.typescriptlang.org/docs/)

[Documentação do Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes)

[Documentação do Ng-Icons](https://ng-icons.github.io/ng-icons/docs/introduction)

[Ícones (Material Symbols)](https://ng-icons.github.io/ng-icons/browse?sets=material-symbols)