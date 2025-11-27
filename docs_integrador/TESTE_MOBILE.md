# Padrão Mobile (Drawer) - Guia de Teste e Documentação

## Objetivo
Substituir a abordagem anterior (sidebar sempre forçada visível com muitos `!important`) por um padrão móvel moderno e acessível: *drawer* (off-canvas) com botão hamburger, overlay e foco controlado.

## Arquivos Relevantes
- `templates/index.html`: Estrutura HTML com `<button id="drawerToggle">`, `<div id="drawerOverlay">` e atributos ARIA.
- `static/css/mobile_drawer.css`: Estilos específicos do drawer mobile (≤768px).
- `static/js/mobile.js`: Controle JS do drawer (abrir/fechar, foco, acessibilidade, sincronização tema escuro).
- `static/css/index.css`: Estilos globais desktop e responsividade geral.

## Remoções Importantes
- `static/css/mobile.css` foi **removido**.
- Timeout hacks, forçamentos de largura e cascatas com alta especificidade eliminados.
- Removido `backdrop-filter: blur()` do overlay para evitar texto borrado.

## Comportamento Esperado
1. Em larguras > 768px: Sidebar padrão desktop (colapso controlado por botão original `toggleBtn`). Hamburger oculto.
2. Em larguras ≤ 768px: Hamburger visível. Sidebar inicialmente fora da tela (`translateX(-100%)`).
3. Clique no hamburger:
   - `body` recebe classe `drawer-open`.
   - Sidebar desliza para dentro.
   - Overlay aparece (escurece fundo sem blur).
   - `aria-expanded` no botão muda para `true`.
4. Fechar drawer por:
   - Clique no overlay.
   - Pressionar `Esc`.
   - Clique em item de menu (exceto tema) → fecha automaticamente.
5. Foco:
   - Ao abrir: foco permanece no botão (mantém contexto).
   - Trap de foco ativo enquanto drawer estiver aberto (Tab circula dentro).
   - Ao fechar: foco enviado para `mainContent`.
6. Tema escuro: Mantém estilos existentes; hamburger e overlay adaptam cores.

## Acessibilidade
- Hamburger: `aria-label="Abrir menu"`, `aria-controls="sidebar"`, `aria-expanded` dinâmico.
- Sidebar: `role="navigation"`, `aria-label="Menu principal"`.
- Lista de itens: `<ul class="sidebar-menu" role="list">` com `<li role="listitem">`.
- Foco visível via `:focus-visible`.
- Trap de foco simples prevenindo fuga com `Tab`.

## Testes por Breakpoint
Use DevTools ou viewport resizing.

### 1024px (limite tablet landscape)
- Drawer não deve ativar (desktop layout). Hamburger oculto.
- Colapso da sidebar funciona via botão lateral original.

### 768px (limite mobile)
- Transição para modo mobile: hamburger aparece, sidebar inicia escondida.
- Abrir/fechar sem saltos de layout.

### 414px / 375px / 360px / 320px
Checklist:
- Hamburger totalmente visível (sem cortar).
- Scroll horizontal suave em `.sensors-grid`.
- Cards com snap (`scroll-snap-align:start`).
- Tabela `failures-table` faz scroll horizontal sem overflow lateral.
- Overlay não cobre a sidebar (z-index correto).
- Texto legível (tamanho ≥ 14px onde necessário).

### Altura baixa (≤500px landscape)
- Sidebar ainda utilizável: itens não ficam inacessíveis (scroll interno).
- Hamburger não sobreposto por conteúdo.

## Testes de Interação
1. Abrir drawer → pressionar `Tab` repetidamente: foco circula dentro.
2. Pressionar `Shift+Tab` no primeiro elemento → vai para último.
3. Pressionar `Esc` → drawer fecha e foco passa ao `mainContent`.
4. Clicar em item de menu (não tema) → drawer fecha.
5. Alternar tema em mobile → cores do hamburger e overlay adaptam-se.

## Testes de Estado Visual
- Sem blur nos itens da sidebar.
- Overlay opaco respeitando conteúdo por trás.
- Animação de ícone hamburger transformando em “X” (linhas giram).

## Possíveis Extensões Futuras
- Animação de foco inicial para primeiro item do menu ao abrir (opcional).
- Armazenar estado de último item selecionado para restaurar foco.
- Fechar via deslizar lateral (gesto touch) se necessário.

## Troubleshooting
| Sintoma | Causa Provável | Ação |
|--------|----------------|------|
| Menu ainda borrado | Cache antigo do CSS | Limpar cache/forçar recarregar (Ctrl+F5). |
| Overlay cobre menu | z-index modificado por outro CSS | Verificar se outro arquivo reintroduziu `z-index` > 1000. |
| Drawer não abre | ID incorreto no HTML | Conferir `drawerToggle`, `drawerOverlay` e `sidebar`. |
| Foco escapa do drawer | Novos elementos sem foco ajustado | Incluir no NodeList de focus trap (seletores). |

## Decisões de Design
- Evitar `!important` para facilitar manutenção (apenas residual em index.css legado).
- Usar `transform` para desempenho (GPU friendly). 
- Simplicidade sobre abstrações pesadas (sem frameworks). 

## Remoção Segura
`mobile.css` eliminado. Caso algum comportamento antigo seja necessário, consultar histórico de commits ou controle de versão externo.

## Verificação Final Rápida
```
Viewport <=768px:
[ ] Hamburger visível
[ ] Drawer abre / fecha fluido
[ ] Overlay não obscurece menu
[ ] Foco circula internamente
[ ] Esc fecha
[ ] Tema escuro adequado
```

---
Documentação concluída. Última atualização: 27/11/2025.
