# Rajská Clinic — interaktivní prototyp rozšířeného webu (V2.0)

Klikatelný prototyp nového rozšířeného webu pro klienta **Rajská Clinic** (dermatologická
a estetická klinika, Praha 7). Slouží k **prezentaci klientovi** a k **validaci datového
modelu** před přenosem do Webflow CMS. Nejedná se o produkční web.

Vytvořila agentura **Debono Interactive**.

## Jak spustit

```bash
npm install
npm run dev
```

Prototyp poběží na `http://localhost:5173`.

Produkční build: `npm run build` (výstup ve složce `dist/`).

## Co prototyp ukazuje

| Stránka | URL | Obsah |
|---|---|---|
| Homepage | `/` | hero video placeholder s claimem + Google hodnocení, rolující pás „Můžete nás znát z", sekce zakladatelky s video medailonkem, „Nejoblíbenější služby" (taby Estetická medicína / Dermatologie, 4 karty + Zobrazit všechny služby), reference, tým jako horizontální slider, CTA box Dárkový voucher, rezervační formulář s kontaktním boxem |
| O nás | `/o-nas` | příběh MUDr. Lucie Rajské v kapitolách (studia → věda → estetika → klinika → média), milníky, video medailonek, citát + CTA |
| Služby | `/sluzby` | jednoduchý rozcestník: taby (Vše / Estetická medicína / Dermatologie / Plastická chirurgie) → karty služeb s „Řeší: …" → detail. Jedna úroveň, žádné mezistránky |
| Tým | `/tym` | plná mřížka všech členů týmu (Lékaři / Zázemí kliniky) |
| Ceník | `/cenik` | rozklikávací akordeon kategorií, fulltextové vyhledávání se zvýrazněním, pás „Nejčastěji hledáte" (horizontální scroll), přepínač Estetická medicína / Dermatologie, sticky CTA |
| Podstránka služby | `/sluzby/:slug` | šablona landing page: hero s fotkou ošetření, „Jak ošetření probíhá" (popis + video) hned v úvodu, benefity, před/po galerie, **automaticky propsaný ceník**, **automaticky vyfiltrovaný tým**, rezervační formulář s předvyplněnou službou a kontaktním boxem |
| Profil lékaře | `/tym/:slug` | foto, bio, video medailonek, **automatický výpis služeb** (reverzní vazba) |
| Demo CMS | plovoucí tlačítko „🔧 Demo CMS" | změna ceny položky / jména lékaře se okamžitě propíše na všechny stránky najednou |

Na konci každé stránky je navíc **galerie prostor kliniky** („Prohlédněte si, jak to u nás
vypadá") a v rezervačním bloku **kontaktní box** s telefonem, e-mailem, adresou, ordinačními
hodinami a recepční (foto + indikace online).

## Datový model — mapa JSON → budoucí Webflow CMS kolekce

Veškerý obsah žije **výhradně** v JSON souborech ve složce `/data`. Komponenty nemají
žádný obsah natvrdo v JSX. Každý JSON odpovídá jedné budoucí CMS kolekci:

### `data/doctors.json` → kolekce **Tým**

| Pole JSON | Webflow pole | Typ |
|---|---|---|
| `slug` | Slug | Slug |
| `name` | Name | Plain text |
| `title` | Pozice (např. „Lékař všeobecné dermatologie") | Plain text |
| `photo` | Fotografie | Image *(v prototypu placeholder)* |
| `bio` | Medailonek (2–3 věty) | Rich/Plain text |
| `instagram` | Instagram | Link |
| `hasVideoMedallion` | Má video medailonek | Switch |
| `serviceSlugs` | Služby, které provádí | **Multi-reference → Služby** |

### `data/services.json` → kolekce **Služby**

| Pole JSON | Webflow pole | Typ |
|---|---|---|
| `slug` | Slug | Slug |
| `name` | Name | Plain text |
| `category` | Oblast (Estetická medicína / Dermatologie / Plastická chirurgie) | Option |
| `heroClaim` | Prodejní claim | Plain text |
| `shortDescription` | Krátký popis | Plain text |
| `benefits` | Benefity (odrážky) | Rich text / multi-pole |
| `beforeAfter` | Galerie před/po | Multi-image *(v prototypu jen počet placeholder dvojic)* |
| `pricelistCategoryIds` | Kategorie ceníku | **Multi-reference → Ceník (kategorie)** |
| `hasVideoMedallion` | Má video medailonek | Switch |
| `problems` | Krátké štítky „Řeší: …" na kartě služby | Plain text (CSV) |
| `garantDoctorId` | Garant ošetření (CTA box s lékařem) | **Reference → Tým** |
| `quickFacts` | Rychlá fakta: délka / anestezie / rekonvalescence / výsledek | 4× Plain text |
| `solves` | „S čím vám ošetření pomůže" (odrážky) | Rich text / multi-pole |
| `forWhom` | „Pro koho je vhodné" (odrážky) | Rich text / multi-pole |
| `steps` | „Jak ošetření probíhá" — číslované kroky (titulek + text) | Rich text, nebo samostatná kolekce Kroky s referencí na Službu |
| `aftercare` | Rekonvalescence: text + tipy „Na co po ošetření myslet" | Rich text |

### `data/pricelist.json` → kolekce **Ceník**

Ve Webflow doporučujeme dvě kolekce: **Kategorie ceníku** a **Položky ceníku**
(položka má referenci na kategorii). V prototypu jsou položky vnořené v kategorii:

| Pole JSON | Webflow pole | Typ |
|---|---|---|
| `categories[].id` | Slug kategorie | Slug |
| `categories[].name` | Name | Plain text |
| `categories[].description` | Popis kategorie | Plain text |
| `categories[].note` | Informační poznámka pod kategorií (upozornění, doporučení) | Plain text |
| `categories[].promo` | Akční box (titulek + text) — slevy za balíčky, množstevní slevy; zvýrazněný zlatý box | 2× Plain text |
| `categories[].keywords` | Klíčová slova pro vyhledávání (synonyma — „botox", „laser") | Plain text (CSV) |
| `categories[].items[].name` | Název položky | Plain text |
| `categories[].items[].price` | Cena (formát „3 700,-" jako na webu) | Plain text |
| `categories[].items[].priceNote` | Poznámka k ceně (např. „Plná dávka" / „Baby botulotoxin") | Plain text |
| `sections` | Rozdělení kategorií na Estetickou medicínu / Dermatologii | Option / reference |

**Data ceníku jsou reálná** — extrahovaná ze současné stránky `/cenik` produkčního webu
(24 kategorií, 125 položek, včetně poznámek o slevách za balíčky).

Ceník má navíc pole `popularSearches` — kurátorovaný seznam zkratek „Nejčastěji hledáte"
(label + hledaný výraz), který se ve Webflow povede jako malá samostatná kolekce.

### `data/site.json` → globální nastavení (Webflow „Site settings" / samostatná kolekce)

Navigace, hero claim, kontakty (adresa, telefon, e-mail, ordinační hodiny, fakturační
údaje), pás log „Můžete nás znát z" (`pressLogos`), Google hodnocení (`googleRating`),
sekce zakladatelky (`aboutFounder`), dárkový voucher (`voucher`), galerie prostor
(`gallery`), recepční v kontaktním boxu (`receptionist`), reference na homepage.

### `data/about.json` → kolekce **O nás** (kapitoly příběhu)

Hero, kapitoly příběhu (eyebrow + titulek + text + foto), milníky (rok + text), citát
a video medailonek. Fakta čerpána z veřejných zdrojů (Estheticon, lucierajska.cz,
inhair.cz) — **před spuštěním nechat zkontrolovat klinikou** (zejména rok založení
kliniky a formulace o certifikacích).

## Design tokeny

`src/styles/tokens.css` — extrahováno z produkčního webu (Webflow API, 07/2026):

- **Barvy:** primární bronzová `#8F7D6B`, sekundární béžovo-zlatá `#BBA18E`, zlatá z loga
  `#A48965`, téměř černá `#1B1B1B`, bílé pozadí
- **Typografie:** nadpisy serif **Essonnes** (v prototypu zastupuje Playfair Display,
  načítá se z Google Fonts), tělový text **Lexend**
- **Tvary:** hranatá estetika — tlačítka i karty s `border-radius: 0` jako na produkci
- **Tlačítko „Domluvit konzultaci":** bronzové pozadí, bílý text, hover do černé

## Co je placeholder (a co je reálné)

**Placeholder (šedé bloky se štítkem):**
- všechny fotografie (lékaři, služby, před/po dvojice)
- všechna videa (hero video, video medailonky lékařů i služeb)
- odeslání rezervačního formuláře (pouze simulovaný success stav)
- reference na homepage (ilustrační texty)
- texty služby **Plastická chirurgie** — nová oblast, označeno „⚠ vyžaduje korekci odborníkem"
- prodejní texty služeb (claim, popis, benefity) — návrh copy k odsouhlasení
- vazby lékař ↔ služba (`serviceSlugs`) — rozděleno dle specializací, k potvrzení klinikou

**Reálná data z produkčního webu:**
- kompletní ceník (kategorie, položky, ceny, poznámky o slevách)
- jména, tituly a role celého týmu
- kontakty, ordinační hodiny, fakturační údaje
- hero claim „Estetika bez nadsázky – přirozenost bez kompromisu."
- barevná paleta a typografická hierarchie

## Struktura komponent

```
src/
├── components/    Nav, Footer, Accordion, PriceTable, ServiceCard, DoctorCard,
│                  BeforeAfter, BookingForm, StickyCta, CmsDemoPanel, Placeholders, Highlight
├── pages/         HomePage, PricelistPage, ServicePage, DoctorPage, NotFoundPage
├── context/       CmsContext (simulace CMS — jediný zdroj dat pro celý web)
├── styles/        tokens.css, base.css, components.css, pages.css
└── utils/         search.js (fulltext bez diakritiky + zvýraznění shod)
```
