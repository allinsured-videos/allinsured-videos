# Projeto Remotion dos Reels (@julioallinsured)

- `npm ci` dentro desta pasta.
- Renderizar (o download do navegador da Remotion é bloqueado no ambiente de nuvem, use o Chrome local):
  `npx remotion render <ID> out/<ID>.mp4 --is-production=false --browser-executable=/usr/bin/google-chrome --crf=20`
- Componentes reutilizáveis: `src/semana1/kit.tsx` (Bg, Bug, Kicker, H, P, Counter, BarChart, Item, Stamp, Outro).
- Vídeos da semana 1: `src/semana1/Videos.tsx`; registro em `src/Root.tsx`.
- Logo oficial: `public/logo-shield.png`. Cores: azul-marinho #313565 / #1F2247, laranja #F05C38. Fonte Montserrat.
- Vídeos publicados ficam em `semanaN/`; o link público é
  `https://raw.githubusercontent.com/allinsured-videos/allinsured-videos/main/semanaN/<arquivo>.mp4`
