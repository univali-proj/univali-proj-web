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

## Documentação

[Documentação do Angular](https://angular.dev/overview)
[Documentação do TypeScript](https://www.typescriptlang.org/docs/)