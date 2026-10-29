# Life Sculp — Identidade visual

Apresentação interativa da identidade visual da Life Sculp, em português, com os logos originais em SVG, mockups, animações de rolagem e layouts responsivos.

## Executar localmente

Requer Node.js. Não há dependências externas para instalar.

```sh
npm run dev
```

Abra http://127.0.0.1:4173 no navegador.

## Validar

```sh
npm run build
```

O comando verifica a sintaxe JavaScript, os arquivos referenciados, os links internos e a integridade básica da apresentação. O site é estático: a pasta `dist/` já contém os arquivos prontos para hospedagem.

## Estrutura

- `dist/index.html`: conteúdo completo da apresentação.
- `dist/styles.css`: identidade visual, responsividade e animações.
- `dist/app.js`: navegação, revelações, cópia de cores e ampliação de imagens.
- `dist/assets/`: SVGs originais, imagens WebP e pacote de logos para download.
- `source-assets/`: mockups PNG fornecidos para o projeto.
- `DESIGN.md`: análise da referência, decisões de design e mapeamento dos assets.
- `.openai/hosting.json`: configuração da hospedagem privada no Sites, sem credenciais.

## Tipografia e aplicações

O lettering original está preservado nos SVGs. Como os arquivos das fontes Eternal Spring e Made Tommy não foram fornecidos, os textos da apresentação usam Georgia e Arial, identificadas como substitutas na própria página.

Os mockups e estudos digitais são aplicações ilustrativas da identidade visual.
