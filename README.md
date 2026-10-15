# Dar Zellige — QR Menu

> A mobile-first QR menu for a Moroccan restaurant on the Aïn Diab corniche in Casablanca: real dish photography, an editorial carte, swipeable bottom sheets, a live order and full French / English / Arabic support with right-to-left layout.

![Dar Zellige desktop screenshot](docs/screenshot.png)

<p align="center"><img src="docs/mobile.png" alt="Dar Zellige welcome screen on mobile" width="300" /></p>

## The redesign

The first version used a procedural 3D tajine and hand-drawn SVG plates. It read as a demo, not a restaurant. This version is art-directed around **real photography**: every dish on the menu is shown as it is served, and the interface steps back to let the food carry the page.

- **Welcome screen** — a photograph of the house lamb tajine with prunes, almonds and sesame on a zellige table, with a slow scale-in; on phones it fills the upper half and fades into the forest ground, on wide screens it sits on the end side behind a column scrim so the type sits on a clean ground. Restaurant name, table number, opening hours, language switch and one saffron call to action. Entering the menu lifts the photo away like a curtain.
- **A carte, not a feed** — each chapter has its own layout so the page reads like a printed menu:
  - *Entrées, Grillades, Boissons*: text-led rows with a square photo at the end.
  - *Tajines*: the house signature as a large 4:3 feature, then rows.
  - *Couscous*: a horizontal, snap-scrolling gallery of 3:4 portraits (a three-up grid on desktop).
  - *Douceurs*: a two-column grid of square tiles.
  - Between couscous and grills, a full-bleed band of a carved cedar riad ceiling with one line of house philosophy and a scroll-linked parallax.
- **Dish sheet** — tapping a dish morphs its photo from the card into a large header image (`layoutId` shared-element transition), with drag-to-dismiss, a rolling quantity stepper and live price.
- **Order bar and order sheet** — springs in once something is added; editable quantities with photo thumbnails, a note for the kitchen, total in MAD and a confirmation state.
- **Desktop** — the phone-width menu sits beside a fixed ambience column whose photograph cross-fades with the chapter you are reading (riad hall, lamb tajine, couscous, cedar ceiling, chebakia, mint tea), with a subtle scroll-linked scale.
- **FR / EN / AR** — every dish, description and label is translated; Arabic switches the document to `dir="rtl"`, swaps to Amiri (display) and Cairo (text) and mirrors the layout with Tailwind logical properties (`ps-`, `pe-`, `start-`, `end-`).

## Design system

| Role | Value |
| --- | --- |
| Display | [Playfair Display SC](https://fonts.google.com/specimen/Playfair+Display+SC) — high-contrast small caps, the voice of a printed carte |
| Text | [Karla](https://fonts.google.com/specimen/Karla) — a humanist grotesque that stays legible at 14px on a phone in a dim room |
| Arabic | [Amiri](https://fonts.google.com/specimen/Amiri) for display, [Cairo](https://fonts.google.com/specimen/Cairo) for text |
| Forest (ink of dark grounds) | `#102A24` / `#0B1D19` — the green glaze of zellige tiles |
| Paper | `#F4EDE1` with `#FBF7EF` for raised surfaces |
| Ink / ink-soft | `#1C1A16` / `#575045` (≥ 4.5:1 on paper) |
| Accent (one only) | Saffron `#E6B04F`, used for the primary action, the active tab and the order count |

Fonts are self-hosted through `@fontsource`, so the menu renders correctly on restaurant Wi-Fi without a third-party request. The only graphic device is an eight-pointed *khatam* star drawn from zellige tilework.

**Motion** — purposeful and quiet: staggered reveals on entry, scroll-linked parallax on the ceiling band and desktop panel, a `layoutId` underline that glides between category tabs, shared-element photo transitions into the dish sheet, and stiff springs (no bounce) on sheets. Everything respects `prefers-reduced-motion` via `MotionConfig reducedMotion="user"` and a CSS fallback.

**Accessibility** — 44px minimum touch targets, visible focus rings (forest on paper, saffron on dark grounds), Escape closes sheets and focus returns to the trigger, every image has alt text and a reserved aspect-ratio box so nothing shifts while photos load.

## Tech stack

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173 (open it on your phone via the network URL)
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Project structure

```
public/photos/            # dish + ambience photography, credits.json
src/
├── components/
│   ├── Welcome.jsx       # full-bleed photo splash, language switch, CTA
│   ├── Menu.jsx          # header, scroll-spy tabs, per-chapter layouts, order bar
│   ├── DishCard.jsx      # row / feature / portrait / tile variants, tags, quick add
│   ├── Photo.jsx         # aspect-ratio photo box with layoutId support
│   ├── SidePanel.jsx     # desktop ambience column that follows the chapter
│   ├── QuoteBand.jsx     # parallax cedar-ceiling band
│   ├── BottomSheet.jsx   # reusable drag-to-dismiss sheet
│   ├── DishSheet.jsx     # dish detail with large photo + quantity
│   ├── OrderSheet.jsx    # order review + confirmation
│   ├── Footer.jsx        # address, hours, photo credits
│   ├── LangSwitch.jsx    # FR / EN / AR segmented control
│   └── Mark.jsx          # khatam star mark
├── context/AppContext.jsx  # language, RTL, order state
├── data/
│   ├── menu.js           # 20 dishes in 3 languages, prices in MAD, photo focal points
│   └── i18n.js           # UI strings
├── App.jsx
└── main.jsx
```

## Photo credits

All photographs come from [Wikimedia Commons](https://commons.wikimedia.org/) under free licences; the full list with links is in [`public/photos/credits.json`](public/photos/credits.json) and is shown in the app footer. Photos are cropped for layout.

| File | Author | Licence | Source |
| --- | --- | --- | --- |
| `harira.jpg` | -ani | FAL | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Harira_vegetarisch.jpg) |
| `zaalouk.jpg` | Arnaud 25 | CC0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Zaalouk_01.jpg) |
| `briouates.jpg` | Christian Muise | CC BY-SA 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moroccan_food-02.jpg) |
| `salade.jpg` | مصطفى ملو | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moroccan_Salad_2.jpg) |
| `tajine-poulet.jpg` | Emna Mizouni | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Chicken_Tajine_1.jpg) |
| `tajine-agneau.jpg` | Marco Almbauer | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moroccan_tajine_with_meat.jpg) |
| `tajine-kefta.jpg` | Mzximvs VdB from Brussels, belgium | CC BY-SA 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Tajine_kefta_(8348397161).jpg) |
| `tajine-legumes.jpg` | 16:9clue | CC BY 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Vegetable_Tajine_(5342012559).jpg) |
| `couscous-royal.jpg` | OthmaneEL | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moroccan_couscous_at_Zephyr_Marrakech_-_Hôtel.jpg) |
| `couscous-tfaya.jpg` | Moncif Ait Ahmed | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Le_Couscous_marocain.JPG) |
| `couscous-legumes.jpg` | Rainer Zenz | CC BY-SA 3.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Couscous-1.jpg) |
| `kefta.jpg` | Samira hiba | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Plat_brochette_Kefta.jpg) |
| `mechoui.jpg` | Lucyin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mechwi_noices.JPG) |
| `poisson.jpg` | E4024 | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Grilled_sardines.jpg) |
| `chebakia.jpg` | Lucyin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ary_chebbakiya_bouchnikha_بو_شنيخة.jpg) |
| `orange.jpg` | marikoiv | CC BY 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Orange_salad-01.jpg) |
| `pastilla-lait.jpg` | Bex.Walton | CC BY 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Pastilla_au_poulet_et_sucre_glace.jpg) |
| `the.jpg` | Alpha | CC BY-SA 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mint_Tea_at_Moroccan_Soup_Bar.jpg) |
| `avocat.jpg` | Jameswasswa | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ovacado_juice_in_a_drinking_glass.jpg) |
| `nousnous.jpg` | Touzrimounir | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Café_crème_1.jpg) |
| `hero-table.jpg` | Abdou A. A. from Stockholm, Sw | CC BY-SA 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moroccan_cuisine_mix.jpg) |
| `riad-ceiling.jpg` | C messier | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bahia_palace_celing_1205.jpg) |
| `riad-hall.jpg` | C messier | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Room_in_Bahia_Palace_1328.jpg) |
| `feast.jpg` | Indiana Younes | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Tajine_de_poulet_aux_olives_(Maroc).jpg) |

## Author

**Zakaria Dabella** — UI/UX designer & web developer based in Casablanca, Morocco.

- Portfolio: [zakaria-dabella-portfolio.vercel.app](https://zakaria-dabella-portfolio.vercel.app/)
- GitHub: [@zakaria10-dabella](https://github.com/zakaria10-dabella)

## License

Code: [MIT](LICENSE) © 2026 Zakaria Dabella. Photographs remain under their respective licences listed above.
