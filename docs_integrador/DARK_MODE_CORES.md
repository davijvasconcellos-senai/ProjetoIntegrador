# 🎨 Sistema de Cores - Modo Escuro
## PredictivePulse - Visualização de Dados

## 📊 Paleta de Cores Otimizada

### Cores de Fundo
```css
--dark-bg-primary: #0d1117    /* Fundo principal escuro */
--dark-bg-secondary: #161b22  /* Fundo de cards e seções */
--dark-bg-tertiary: #21262d   /* Fundo de elementos elevados */
--dark-bg-elevated: #2d333b   /* Fundo de elementos em destaque */
```

### Cores de Texto
```css
--dark-text-primary: #e6edf3    /* Texto principal (alta legibilidade) */
--dark-text-secondary: #8b949e  /* Texto secundário */
--dark-text-muted: #6e7681      /* Texto menos importante */
```

### Cores para Visualização de Dados

#### Cores Primárias (Alta Visibilidade)
- **Azul**: `#58a6ff` - Informação, dados neutros, links
- **Verde**: `#3fb950` - Sucesso, valores positivos, crescimento
- **Amarelo**: `#d29922` - Atenção, alertas moderados
- **Laranja**: `#f0883e` - Avisos importantes
- **Vermelho**: `#f85149` - Erros, falhas, valores críticos
- **Roxo**: `#bc8cff` - Dados especiais, categorias alternativas
- **Rosa**: `#ff7eb6` - Destaque, categorias únicas
- **Ciano**: `#39c5cf` - Informação secundária, subtítulos

#### Cores Secundárias (Backgrounds e Bordas)
- **Azul Suave**: `#1f6feb`
- **Verde Suave**: `#238636`
- **Amarelo Suave**: `#9e6a03`
- **Laranja Suave**: `#bd561d`
- **Vermelho Suave**: `#da3633`
- **Roxo Suave**: `#8957e5`
- **Rosa Suave**: `#db61a2`
- **Ciano Suave**: `#2ea043`

## 🎯 Uso por Contexto

### Status e Estados
```css
/* Sucesso / OK / Ativo */
color: var(--data-green);
background: var(--overlay-green);

/* Aviso / Atenção */
color: var(--data-yellow);
background: var(--overlay-yellow);

/* Erro / Falha / Crítico */
color: var(--data-red);
background: var(--overlay-red);

/* Informação / Neutro */
color: var(--data-blue);
background: var(--overlay-blue);
```

### Cards de Sensores
- Fundo: `var(--dark-bg-tertiary)`
- Borda: `var(--dark-border-default)`
- Hover: `var(--data-blue)` com glow
- Valores: `var(--data-blue)` com text-shadow

### Tabelas de Dados
- Cabeçalho: `var(--dark-bg-tertiary)` com texto `var(--data-cyan)`
- Linhas: `var(--dark-bg-secondary)`
- Hover: `var(--dark-bg-tertiary)`
- Bordas: `var(--dark-border-muted)`

### Badges de Status
```css
/* Falha */
.status-badge.falha {
    background: var(--overlay-red);
    color: var(--data-red);
    border: 1px solid var(--data-red-soft);
}

/* Resolvida */
.status-badge.resolvida {
    background: var(--overlay-green);
    color: var(--data-green);
    border: 1px solid var(--data-green-soft);
}

/* Ativa */
.status-badge.ativa {
    background: var(--overlay-yellow);
    color: var(--data-yellow);
    border: 1px solid var(--data-yellow-soft);
}
```

### Gráficos e Visualizações
```css
/* Gradientes disponíveis */
--gradient-success: linear-gradient(135deg, #3fb950 0%, #2ea043 100%);
--gradient-warning: linear-gradient(135deg, #d29922 0%, #f0883e 100%);
--gradient-danger: linear-gradient(135deg, #f85149 0%, #da3633 100%);
--gradient-info: linear-gradient(135deg, #58a6ff 0%, #1f6feb 100%);
--gradient-neutral: linear-gradient(135deg, #8b949e 0%, #6e7681 100%);
```

## 📈 Diretrizes de Acessibilidade

### Contraste
Todas as cores foram escolhidas para garantir:
- **Contraste mínimo**: 4.5:1 (WCAG AA)
- **Contraste ideal**: 7:1 (WCAG AAA) quando possível
- **Texto em fundo escuro**: Sempre cores claras e vibrantes

### Legibilidade
- Fontes mínimas: 14px para texto, 12px para labels
- Text-shadow sutil em valores importantes
- Bordas sutis para separação visual

### Diferenciação
- Não depender apenas de cor (usar ícones + texto)
- Estados interativos claramente visíveis
- Hover states com transições suaves

## 🎨 Exemplos de Uso

### Card de Sensor
```html
<div class="sensor-card">
    <h4>Temperatura</h4>
    <div class="sensor-value">25.5°C</div>
    <div class="sensor-graph"></div>
</div>
```

### Badge de Status
```html
<span class="status-badge falha">Falha</span>
<span class="status-badge resolvida">Resolvida</span>
<span class="status-badge ativa">Ativa</span>
```

### Progress Bar
```html
<div class="progress-bar">
    <div class="progress-fill success" style="width: 75%"></div>
</div>
```

### Stat Card com Destaque
```html
<div class="stat-card highlight-blue">
    <div class="metric-label">Produtividade</div>
    <div class="metric-value up">+15%</div>
</div>
```

## 🔧 Customização

Para adicionar novas cores ao sistema:

1. Defina a variável CSS:
```css
body.dark-mode {
    --data-custom: #hexcode;
    --data-custom-soft: #hexcode;
    --overlay-custom: rgba(r, g, b, 0.15);
}
```

2. Use nas classes:
```css
.custom-element {
    color: var(--data-custom);
    background: var(--overlay-custom);
}
```

## 📱 Responsividade

As cores mantêm os mesmos valores em todas as resoluções, garantindo consistência visual em:
- Desktop (> 1024px)
- Tablet (769px - 1024px)
- Mobile (< 768px)

## 🌓 Transição Suave

Todos os elementos têm transição automática ao alternar entre modo claro e escuro:
```css
transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
```

## 🎯 Boas Práticas

1. **Use variáveis CSS**: Sempre prefira `var(--data-blue)` ao invés de hex direto
2. **Overlays para backgrounds**: Use `--overlay-*` para fundos de badges e cards
3. **Gradientes para gráficos**: Prefira gradientes para elementos visuais grandes
4. **Contraste adequado**: Teste sempre a legibilidade
5. **Consistência**: Use as mesmas cores para contextos similares

## 🔍 Referências

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [GitHub Dark Theme](https://primer.style/design/foundations/color)
- [Material Design Dark Theme](https://material.io/design/color/dark-theme.html)

---

**Versão**: 1.0  
**Data**: Novembro 2025  
**Desenvolvido para**: PredictivePulse - Sistema de Monitoramento Inteligente
