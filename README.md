# NOIR TABACARIA

Site estático, mobile-first e compatível com GitHub Pages.

## Estrutura
- `index.html` — página principal + tela independente de maioridade.
- `css/style.css` — identidade visual completa.
- `js/app.js` — configuração, catálogo, filtros, favoritos e lógica de idade.
- `imagens/` — imagens locais substituíveis.

## Configuração rápida

Abra `js/app.js` e altere somente o objeto `CONFIG` no início:

```js
const CONFIG = {
  nome: "NOIR TABACARIA",
  whatsapp: "5500000000000",
  instagram: "@sua_tabacaria",
  cidade: "Sua cidade",
  endereco: "Seu endereço aqui",
  horario: "Seg–Sáb · 09h–19h",
  idadeMinima: 18,
  idadeCookieDias: 30,
  mapaUrl: "https://www.google.com/maps/search/?api=1&query=Sua+cidade"
};
```

Os produtos ficam no array `PRODUCTS`, logo abaixo. Para trocar uma imagem, mantenha exatamente o nome do arquivo dentro de `imagens/`.

## Imagens
Todos os arquivos da pasta `imagens/` são placeholders locais. O site não depende de imagens externas para funcionar.

## Maioridade
A confirmação é salva em `localStorage` pelo número de dias definido em `idadeCookieDias`. O conteúdo fica bloqueado antes da confirmação.

## Favoritos
Favoritos são armazenados somente no navegador em `localStorage`.

## GitHub Pages
1. Crie um repositório.
2. Envie todos os arquivos mantendo a estrutura de pastas.
3. Ative GitHub Pages para a branch principal.
4. Abra a URL publicada.

Não há backend, banco de dados ou etapa de instalação.

## Observação sobre este pacote
Este pacote foi preparado como **catálogo informativo com controle de maioridade**. Ele não inclui checkout, carrinho de compra ou automação de pedidos de produtos de tabacaria.
