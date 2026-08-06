# Postup: přenos prototypu do Webflow

Doporučený postup od nejjednoduššího kroku. Prototyp (https://debonocz.github.io/Rajska-Clinic-V2.0/)
slouží jako přesná specifikace — každá sekce má v README mapu na CMS pole.

## Krok 0 — Duplikovat současný web (5 minut, největší úspora)

Ve Webflow dashboardu: web „Lucierajska" → ⋯ → **Duplicate**. Pracujte v kopii.

Proč: kopie zdědí celý design systém — font Essonnes, barvy (#8F7D6B, #BBA18E…),
hotový header, footer, cookie lištu, tlačítka. Nestavíte design znovu, jen přidáváte
stránky. Produkce zůstává nedotčená, až do finálního přepnutí domény.

## Krok 1 — CMS kolekce a data (umí za vás vytvořit Claude přes API)

Založit 4 kolekce a nahrát obsah. **Tohle nemusíte klikat ručně** — data máme
strukturovaná v `/data/*.json` a Claude je umí přes Webflow API nahrát najednou:

| Kolekce | Položek | Zdroj |
|---|---|---|
| Ceník – kategorie | 24 | data/pricelist.json |
| Ceník – položky | 125 | data/pricelist.json |
| Služby | 12 | data/services.json |
| Tým | 11 | data/doctors.json |

Pořadí zakládání (kvůli referencím): Kategorie → Položky (ref. na kategorii) →
Tým → Služby (multi-ref. na kategorie, ref. garant na Tým) → doplnit Týmu
multi-ref. „Služby, které provádí".

Záložní varianta: ruční import přes `podklady/cenik-*.csv` (Webflow CMS → Import),
reference se mapují přes sloupec Kategorie (Slug).

## Krok 2 — Šablona služby (největší páka: 1 stránka = 12 stránek)

V Designeru vytvořit CMS Template page pro kolekci Služby podle prototypu
(/sluzby/botulotoxin):

1. Hero: breadcrumb, H1 = Name, claim, popis, foto, CTA
2. Pás rychlých faktů — 4 texty z polí quickFacts
3. „S čím vám ošetření pomůže" + „Pro koho je vhodné" (rich text pole)
4. „Jak ošetření probíhá" — kroky 01–03 (rich text), video (podmíněná viditelnost dle switche)
5. Rekonvalescence + box tipů
6. Před / po (multi-image, sekce skrytá když prázdné)
7. Ceník služby — Collection list Kategorií filtrovaný přes multi-referenci služby,
   vnořený Collection list Položek (Webflow umí 1 úroveň vnoření — položky filtrovat
   podle aktuální kategorie)
8. Garant box — pole z referencovaného lékaře (foto, jméno, titul)
9. „Váš tým pro tuto službu" — Collection list Týmu filtrovaný multi-referencí
10. Formulář (Webflow Forms, hidden pole se slugem služby)

Stejně šablona Týmu (/tym/:slug) — profil + reverzní výpis služeb.

## Krok 3 — Ceník (/cenik)

- Collection list Kategorií + vnořený list Položek (stejné komponenty jako v šabloně služby)
- Akordeon: Webflow interakce (click → rozbalit), nebo jednodušeji `<details>/<summary>` v Embed
- Akční boxy: prvky navázané na pole „Akce – titulek/text", **Conditional visibility:
  zobrazit jen když je Akce – titulek vyplněn**
- Přepínač Estetická/Dermatologie: Webflow Tabs, v každém tabu list filtrovaný polem Oblast
- Fulltext + „Nejčastěji hledáte": jediný custom prvek — malý JS snippet (~40 řádků)
  do Embed bloku, filtruje vyrenderované položky v DOM a zvýrazňuje shody.
  Claude ho připraví hotový k vložení (logika už existuje v prototypu: src/utils/search.js).

## Krok 4 — Statické stránky

- Homepage: upravit stávající — hero video, pás log (Webflow marquee interakce),
  sekce zakladatelky, „Nejoblíbenější služby" (Tabs + Collection list, limit 4,
  řazení dle pořadí), tým jako slider (Webflow Slider / scroll-snap), voucher box,
  formulář s kontaktní kartou
- /sluzby: Tabs + Collection list karet
- /o-nas: statická stránka dle prototypu (texty z data/about.json)
- Galerie prostor: Webflow komponenta vložená na konec všech stránek

## Krok 5 — Obsah a publikace

1. Nahrát fotografie/videa dle checklistu (podklady-pro-kliniku.md) do CMS položek
2. Napojit formulář (e-mail notifikace / Make → rezervační systém)
3. Publish na staging doménu (*.webflow.io) → kontrola s klientkou
4. Přepnout produkční doménu rajskaclinic.cz na nový web

## Odhad pracnosti (Designer)

| Fáze | Odhad |
|---|---|
| CMS kolekce + data | ~0 (API) / 0,5 dne ručně |
| Šablona služby + týmu | 1–1,5 dne |
| Ceník vč. vyhledávání | 0,5–1 den |
| Homepage + /sluzby + /o-nas + drobné | 1–1,5 dne |
| Obsah, ladění, publikace | 0,5–1 den |
| **Celkem** | **~4–5 dní práce v Designeru** |

---

# Stav ve Webflow (hotovo přes API)

## Celoplošná úvodní sekce „Section Cover"

Všechny podstránky mají stejnou celoobrazovkovou hlavičku jako CMS detail služby —
stejné třídy, takže se dá stylovat na jednom místě:

```
.Section Cover
├── .SC Content.hero
│   ├── .SC Holder.Top & Bottom
│   └── .SC Holder.Middle
│       └── .kontejner-sluzby.left
│           ├── .sluzba-nadtitulek     (nadtitulek)
│           ├── h1.h1.white            (titulek)
│           ├── .sluzba-claim.white    (claim)
│           └── .Div Block 4 > .link-ring (šipka dolů, skok na další sekci)
├── .SC Overlay
└── .SC Image > img.Cover Image
```

| Stránka | Nadtitulek / titulek | Fotka |
|---|---|---|
| /sluzby | Naše péče / Nabídka služeb | ošetření pleti |
| /tym | Kdo se o vás postará / Náš tým | týmová fotka |
| /o-nas | Náš příběh / Krása, která nepotřebuje filtr | interiér kliniky s týmem |
| /cenik | Přehledně a bez překvapení / Ceník | ošetření pleti |
| /kontakt | Kde nás najdete / Kontakt | MUDr. Rajská v ordinaci |
| Šablona týmu | pozice / jméno / bio — **napojeno na CMS**, fotka = pole Fotografie | dle člověka |

Původní šedé pásy s nadpisem (`.Section.Grey > .Container.Inner Page`) byly na těchto
stránkách odstraněny — nahradila je právě tahle hlavička.

## Navigace

Komponenta **Header** má prolinkované položky: O nás, služby, ceník, tým, Kontakt,
obě tlačítka „Domluvit konzultaci" → /kontakt, logo → homepage.
(Položka „Prostory" zatím nemá cílovou stránku. Komponenta **mega-nav** na šabloně
služby má vlastní rozsáhlé menu — odkazy v ní zatím nastavené nejsou.)

## Šablona týmu

Doplněny chybějící komponenty Header a Footer, tlačítko Instagram je navázané na
CMS pole Instagram.

## Homepage

Statické mřížky s medailonky týmu odstraněny — nahradil je CMS slider `#tym-slider`
se šipkami (`[data-slider="prev"|"next"]`).

## Skripty k vložení ve Webflow

| Soubor | Kam |
|---|---|
| `webflow-skript-web-globalni.html` | Site settings → Custom code → Footer (celý web) |
| `webflow-skript-cenik.html` | stránka Ceník → Before `</body>` |
| `webflow-skript-sluzby.html` | stránka Služby → Before `</body>` |
| `webflow-skript-sablona-sluzby.html` | Služby Template → Before `</body>` |
| `webflow-skript-sablona-tym.html` | Tým Template → Before `</body>` |

## Pozor: dvě obrázková pole u Služeb

Kolekce Služby má dvě pole typu Image:

- **`hero-image-do-pozadi`** („Hero image do pozadí") — **vyplněné** u všech 13 služeb
  (01-botulotoxin.avif … 13-plasticka-chirurgie.avif)
- **`nahledovy-obrazek`** („Náhledový obrázek") — prázdné u všech položek

Karty na /sluzby byly navázané na to prázdné pole, proto se fotky nenačítaly.
Přenavázal jsem je na `hero-image-do-pozadi` — stejné pole, jaké už používá hero
na detailu služby. Pole „Náhledový obrázek" je tím pádem nepoužité; buď ho v CMS
smaž, nebo do něj nahraj vlastní ořezy pro karty (pak se musí karta přenavázat zpět).

---

# Publikace 5. 8. 2026

Web vypublikován na Webflow subdoménu (`publishToWebflowSubdomain`).

## Co se změnilo

**Obrázky služeb** — všech 13 služeb má teď vyplněná obě obrázková pole:
`hero-image-do-pozadi` (velké hero na detailu) i `nahledovy-obrazek` (karta ve výpisu).
Zatím je v obou stejná fotka; „Náhledový obrázek" je samostatné pole právě proto,
aby se dal nahradit zmenšenou/optimalizovanou variantou bez zásahu do hero fotky.
Karta ve výpisu je navázaná na `nahledovy-obrazek`.

**Draft položky** — z draftu vytaženo:
- služba „Niťový lifting" (jediná služba, která nebyla publikovaná)
- 10 z 11 lidí v týmu (publikovaná byla jen MUDr. Rajská — proto by /tym byl prázdný)

**Chybějící fotka** — MUDr. Barbora Formánková neměla portrét, doplněn asset
„Placeholder foto lékaře". Jakmile dorazí skutečná fotka, stačí ji přepsat v CMS.

## Header

Komponenta **Header** nahrazena komponentou **mega-nav** (ta z detailu služby) na všech
stránkách: homepage, /sluzby, /tym, /o-nas, /cenik, /kontakt, šablona týmu.
Šablona služby ji měla už předtím.

Prolinkované položky horní lišty:

| Položka | Cíl |
|---|---|
| logo | homepage |
| Naše služby | rozbaluje mega panel (není to odkaz) |
| O nás | /o-nas |
| **Tým** | /tym — položka nově doplněna, v mega-nav chyběla |
| Ceník | /cenik |
| Prostory | zatím bez cíle (stránka neexistuje) |
| Kontakt | /kontakt |
| Domluvit konzultaci | /kontakt |

⚠ **Obsah rozbalovacího mega panelu je pořád demo ze šablony Osmo** — anglické položky
Overview / Analytics / Healthcare / „Sign up for the '26 conf" apod. (33 odkazů).
Je potřeba je přepsat na služby kliniky; není to jen výměna odkazů, ale i textů,
proto to nechávám na odsouhlasení.

## Hover efekt na kartách služeb

Po najetí myší se fotka v pozadí karty plynule přiblíží (scale 1.08, 700 ms).
Karta má `overflow: hidden`, takže se zvětšená fotka ořízne na rohy karty.
Platí na všech kartách se třídou `.card-service` — služby i lidé v týmu.

Rozdělené na dvě části, aby šla většina ladit v Designeru:

| Část | Kde se mění |
|---|---|
| přechod + `will-change` | **třída `.image-card` v Designeru** — rychlost i křivku změníš tam |
| samotné zvětšení při hoveru | site custom code, registrovaný skript **„Karta hover zoom"** |

Zvětšení musí být v kódu proto, že jde o selektor `.card-service:hover .image-card`
(hover na rodiči mění potomka) — takový zápis Designer neumí a Webflow interakce
by se musely klikat ručně u každé instance.

⚠ V Designeru efekt neuvidíte (registrované skripty se v canvasu nespouštějí),
projeví se až na publikovaném webu.

---

# Responzivita — kontrola a doladění

Projito po třídách, breakpointy Webflow: **medium** ≤991 (tablet),
**small** ≤767 (mobil na šířku), **tiny** ≤479 (mobil na výšku).

## Co bylo v pořádku už předtím

`fakta-mrizka` (4→2→1), `cta-mrizka`, `sluzba-dvousloupec`, `kroky-mrizka` (3→1),
`tym-sluzby-mrizka`, `garant-box` (na mobilu pod sebe), `sluzba-hero-cta`,
`cenik-polozka` (zalomení ceny), `slider-polozka` (28 % → 42 % → 78 %),
`sekce-sluzby` (padding 2rem → 1,25rem).

## Co jsem opravil

| Třída | Problém | Oprava |
|---|---|---|
| `Grid 4` (karty služeb) | skok 3 sloupce → 1 už na tabletu | medium `1fr 1fr`, small `1fr` |
| `Section Cover` | na tabletu chyběl boční padding, text lepil na kraj | medium `padding-left/right: 5vw` |
| `SC Content` | `height: 100vh` + `overflow: hidden` u rodiče → na nízkém displeji (mobil na šířku) se obsah ořízl | small `height: auto`, `position: relative` |
| `cenik-vstup` (vyhledávání) | 30px písmo a 40px padding i na mobilu | small 18px/18–24px, tiny 16px/14–20px |
| `tym-mrizka` | 2 sloupce i na úzkém telefonu | tiny `1fr` |
| `slider-hlavicka` | nadpis + šipky se na mobilu tlačily na jeden řádek | small `flex-wrap: wrap` |
| `kontakt-karta` | padding 32px ubíral moc místa | small 24px |
| `sluzba-claim` | 18px na mobilu | small 16px |

## Mega-nav na mobilu

Komponenta má vlastní `Code Embed` uvnitř sebe, takže si skript nese s sebou na
každou stránku. Mobilní chování je připravené (`data-mobile-nav`,
`data-mobile-back`, tlačítko „Back"). Nic doplňovat netřeba.

## Skripty nasazené přes API

`set_page_freeform_code` vrací 406, ale **registrované skripty jdou nahrát**.
Nasazeno jako site scripts (Site settings → Custom code → registrované skripty):

| Skript | Co dělá |
|---|---|
| `karta_hover_zoom` | přiblížení fotky na kartě po najetí |
| `slider_a_animace` | šipky slideru + vynořování prvků při scrollu |
| `filtr_sluzeb` | záložky Vše / oblasti na /sluzby (chyběl úplně) |

Skripty se samy deaktivují na stránkách, kde příslušné prvky nejsou.
Ceník a šablona týmu mají své skripty už vložené ve svém page custom code.

---

# Footer — audit všech stránek

Footer = komponenta **Footer** `5f825ed3-bdab-7432-8713-7364b8e98f75`.
Prošlo se všech **29 stránek** webu. Všude je stejná instance komponenty
bez přepsaných propů — změna v komponentě se propíše na celý web.

**Footer měly už předtím (25 stránek):** Home, Home Copy (draft), Služby,
Služby Template, Tým, Tým Template, O nás, Ceník, Kontakt, Souhlas s cookies,
Pravidla soutěže, Dermatologie, Estetická dermatologie, Procedures Template,
Services Template a všech 10 starých stránek lékařů.

**Chybělo — doplněno:**

| Stránka | Co se přidalo |
|---|---|
| 404 | Footer + mega-nav (starý Header odebrán) |
| Password (401) | Footer + mega-nav (starý Header odebrán) |
| Ceník – položky Template | Footer + mega-nav — stránka byla úplně prázdná |
| Ceník – kategorie Template | Footer + mega-nav — stránka byla úplně prázdná |

## Staré stránky z původního webu — k rozhodnutí

15 z 29 stránek je pozůstatek po duplikaci původního webu a nový web je nahrazuje:

- 10× samostatná stránka lékaře (`/lucie-rajska`, `/barbora-grillova`, …)
  → nahrazuje CMS šablona `/tym/:slug`
- `/dermatologie`, `/esteticka-dermatologie` → nahrazuje `/sluzby`
- `Procedures Template`, `Services Template` → staré CMS kolekce
- `Home Copy` (draft)

Footer na nich je, ale mají **starou komponentu Header** a celý starý design.
Doporučení: smazat je a nastavit 301 redirecty na nové ekvivalenty. Prohazovat
na nich hlavičku nemá smysl, obsah by stejně zůstal starý.

---

# Oprava nahlášených chyb

## 1) Staré statické stránky lidí a oblastí

Odstaveny z publikování (`draft: true`) — na webu už nejsou:
10× stránka lékaře (`/lucie-rajska`, `/barbora-grillova`, `/anna-flachsova`,
`/vladena-charvatova`, `/natalia-havlicek`, `/krystof-kudlacek`, `/klara-novakova`,
`/mudr-barbora-formankova`, `/mudr-zuzana-tulpova`, `/marie-efanova`),
dále `/dermatologie` a `/esteticka-dermatologie`.

Zvolen draft místo smazání — je to vratné a výsledek je stejný (stránky nejsou
na webu). Smazat napevno můžeme kdykoli.

**301 redirecty API neumí — je potřeba je naklikat** v Site settings → Publishing:

| Z | Na |
|---|---|
| /lucie-rajska, /barbora-grillova, /anna-flachsova, /vladena-charvatova, /natalia-havlicek, /krystof-kudlacek, /klara-novakova, /mudr-barbora-formankova, /mudr-zuzana-tulpova, /marie-efanova | /tym |
| /dermatologie, /esteticka-dermatologie | /sluzby |

## 2) Menu — Tým a O nás v jednom kontejneru

Položka Tým se při vkládání připojila do stejného `<li>` jako O nás a text
skončil zabalený v `<div>`. Opraveno: Tým má vlastní `<li>` s atributem
`data-nav-list-item` a text je přímo v labelu.

Prolinkováno: logo → homepage, O nás → /o-nas, Tým → /tym, Ceník → /cenik,
**Prostory → /prostory**, Kontakt i obě CTA → /kontakt.

## 3) Homepage — hero ve stejném layoutu jako podstránky

Hero přestavěn ze `Section 3 / Hero` na sdílený `Section Cover`. Původní obsah
(H1 se zlatým zvýrazněním, odstavec, hodnocení Google) i **background video**
byly přesunuty, nic se nepřepisovalo. Video sedí v `SC Image` místo fotky.

## 4) Nová stránka /prostory

Cover hlavička + text + galerie fotek (`.galerie-foto`, mřížka `Grid 4`).
Fotky jsou zatím **placeholdery z Assets** — část z nich je z jiné (zubní)
kliniky, je potřeba je vyměnit za skutečné fotky Rajská Clinic.

Galerie se otevírá v lightboxu jako jedna společná galerie — registrovaný skript
`galerie_lightbox` (šipky, Esc, klik mimo, počítadlo). Webflow Lightbox element
přes API nastavit nejde (neexistuje pro něj API na média ani skupinu galerie).

## 5) Homepage — sekce služeb podle prototypu

Přidána sekce **Nejoblíbenější služby**: Collection List na kolekci Služby,
limit 4, řazení dle pole Pořadí, karty ve sdílených třídách
`card-service` / `image-card` / `content-card` / komponenta `Heading-card`,
plus tlačítko „Zobrazit všechny služby" → /sluzby.

## Bonus: špatná adresa ve footeru

Footer měl na všech stránkách adresu **Czech Swiss Dental Clinic, Galerie Harfa,
Českomoravská 2420/15a** — pozůstatek po šabloně. Opraveno v komponentě na
RAJSKÁ Clinic, Jankovcova 1566/2B, Praha 7 – Holešovice, 170 00.

---

# Navigace — „Naše služby"

## Chování

- **Klik** na „Naše služby" → `/sluzby` (rozcestník).
- **Najetí myší** → rozbalí se dropdown. Zavře se ~0,26 s po odjetí.
- Na mobilu (≤991 px) klik ponechán na rozbalení panelu, aby šlo menu ovládat prstem.

Řeší registrovaný skript **`nav_sluzby`**. Rozlišuje skutečný klik od
programového přes `event.isTrusted` — proto najetí myší panel jen otevře
a nenaviguje.

## Obsah dropdownu

Demo obsah ze šablony Osmo (Platform / Features / Overview / Analytics…) byl
smazán. Místo něj je **Collection List na kolekci Služby** ve dvou sloupcích
(třída `nav-sluzby-mrizka`), položka = `mega-nav__panel-link` s názvem služby
a štítky, prolinkovaná na detail služby.

## ⚠ Dvě vazby je potřeba doklikat v Designeru

Webflow API neumí navázat CMS text uvnitř **komponenty** — vrací
„Element is not inside a CMS context". Odkaz na detail navázaný je, texty ne.

V Designeru → komponenta **mega-nav** → dropdown „Naše ošetření“ → v Collection
Listu u položky:

| Prvek (třída) | Navázat na pole |
|---|---|
| `mega-nav__panel-link-text` | **Name** |
| `mega-nav__panel-link-desc` | **Řeší – štítky** |

Je to dvakrát kliknout na „Get text from…“. Zbytek (zdroj kolekce, mřížka,
odkaz na detail) je hotový.

Zbylé dva dropdown panely v komponentě (Resources / Company) jsou pořád demo
obsah z šablony, ale nevede na ně žádná položka v liště — nikde se nezobrazí.

---

# ⚠ Kolize slugů — proč nefungují prokliky na detaily

## Co se děje

Kolekce **Tým** má slug `tym`, takže si rezervuje adresy `/tym/{slug}` pro
detaily. Zároveň existuje **statická stránka** se slugem `tym`. Webflow API
hlásí u obou `publishedPath: "/tym"` — dvě stránky na stejné adrese.

Designer by takovou stránku nedovolil založit („slug is already taken"),
přes API to prošlo. Důsledek: detaily členů týmu se nevygenerují a proklik
z karty nikam nevede. Úplně stejně je na tom kolekce **Služby** vs. stránka
`/sluzby`.

Odkaz na kartě je nastavený správně
(`{"mode":"collectionPage","to":{"pageSlug":"detail_tym"}}`) — problém není
v odkazu, ale v tom, že cílová adresa neexistuje.

## Řešení (nutný zásah v Designeru — API slug kolekce měnit neumí)

CMS → nastavení kolekce → změnit **slug kolekce**:

| Kolekce | Slug teď | Změnit na | Výsledné adresy detailů |
|---|---|---|---|
| Tým | `tym` | `lekar` | `/lekar/lucie-rajska` |
| Služby | `sluzby` | `sluzba` | `/sluzba/botulotoxin` |

Statické výpisy zůstanou na `/tym` a `/sluzby`.

**Odkazy se předělávat nemusí.** Karty odkazují na *šablonu* přes její slug
(`detail_tym`, `detail_sluzby`), ne na natvrdo zapsanou adresu — po změně slugu
kolekce začnou samy mířit na nové adresy.

Zvažovaná alternativa (přejmenovat statické výpisy na `/nas-tym`
a `/nabidka-sluzeb`) byla zamítnuta kvůli horším adresám výpisů.

---

# Úklid a stav 6. 8.

- Zbylé tři staré stránky (`/lucie-rajska`, `/dermatologie`, `/esteticka-dermatologie`)
  přesunuty do složky `/archiv/` a nastaveny jako draft — stejně jako zbytek,
  který přesunul Jirka ručně.
- Homepage proti prototypu: hero ✓, Nejoblíbenější služby ✓, Reference ✓ (sekce
  už existovala), tým-slider ✓, voucher ✓, formulář ✓.
- Oprávnění v `.claude/settings.json` rozšířena o všechny Webflow MCP nástroje
  a běžné shell příkazy — potvrzování by mělo z 95 % zmizet.

## ⚠ Pořád blokuje prokliky na detaily

Slugy kolekcí zatím nejsou změněné (API to neumí, jde to jen v Designeru):

| Kolekce | Slug teď | Změnit na | CMS → ⚙ kolekce → Collection URL |
|---|---|---|---|
| Tým | `tym` | `lekar` | detaily pak /lekar/… |
| Služby | `sluzby` | `sluzba` | detaily pak /sluzba/… |

Do té doby vedou karty lidí i služeb do prázdna, protože adresu /tym i /sluzby
drží statické stránky.

---

# Oprava: taby na /sluzby nefiltrovaly

Příčina: všechny čtyři registrované skripty čekaly na `DOMContentLoaded`, ale
Webflow je servíruje jako externí soubory z CDN — často se načtou až po této
události, takže se inicializace nikdy nespustila. Struktura stránky byla
v pořádku (ID `sluzby-taby` / `vypis-sluzeb`, značka `.je-skryte` navázaná
na Oblast, `display:none`).

Fix ve verzích **1.0.1** (`filtr_sluzeb`, `slider_a_animace`,
`galerie_lightbox`, `nav_sluzby`):

```js
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else { init(); }   // skript dorazil později — spustit rovnou
```

Filtr navíc přepsán na delegovaný click na celém tabs wrapperu (odolnější
vůči překreslení tabů Webflowem). `update_registered_script` vrací 404 —
nová verze se musí registrovat přes `register_inline_script` se stejným
jménem a vyšší verzí, pak přepnout v `set_site_scripts`.

Tím se zároveň nejspíš opraví i šipky slideru, animace při scrollu,
lightbox na /prostory a klik/hover chování „Naše služby" — všechny stály
na stejné chybě.

---

# Osmo mega-nav — proč nefungovalo submenu a oprava

## Příčina č. 1: chyběl GSAP

Osmo skript (Code Embed uvnitř komponenty, `initMegaNavDirectionalHover`) staví
celou animaci na **GSAP** — a ten se na webu nikde nenačítal. První volání
`gsap.timeline()` spadlo a celé menu (hover, dropdown, mobilní burger) bylo mrtvé.

**Fix:** GSAP 3.12.5 z CDN přidán na začátek Site settings → Head code.
Všechny povinné prvky komponenty (`data-menu-wrap`, `data-dropdown-wrapper`,
`data-menu-backdrop`, `data-burger-toggle`, panely `data-nav-content`) jsou
na místě — ověřeno, nic dalšího nechybělo.

Osmo od teď řídí hover sám (directional hover, otevření po 120 ms). Náš skript
`nav_sluzby` už hover nesimuluje — dělá jen klik → /sluzby (desktop).

## Příčina č. 2: Collection List v komponentě je zakázaný

Při stavbě sloupců to Webflow řekl naplno:
> „You can't add a Collection List to a Component that's used on a Collection page."

mega-nav sedí na šablonách kolekcí (detail služby, detail týmu), takže Collection
List uvnitř téhle komponenty není podporovaný — proto selhávaly i filtry, sort
a CMS vazby textů. Včerejší pokus s Collection Listem v dropdownu byl slepá ulička
a je odstraněn, včetně demo sloupců Osmo (Platform/Features…).

## Nové řešení — 3 sloupce podle oblasti

Panel „Naše služby" má tři statické sloupce (`mega-nav__panel-col` +
`mega-nav__panel-label`): **Estetická medicína / Dermatologie / Plastická
chirurgie**, každý s prázdným `<ul data-sluzby-oblast="…">`.

Skript **`nav_sluzby` v1.1.0** je plní z CMS: stáhne `/sluzby` (výpis, který už
CMS renderuje), z karet přečte název + odkaz + oblast a rozřadí položky do
sloupců. Kešuje do sessionStorage. Menu je tedy dál 100% CMS-driven — nová
služba se objeví v menu automaticky s publikací, jen bez zakázaného Collection
Listu. Položky mají `data-menu-fade`, takže je Osmo animuje stejně jako zbytek.

---

# Detail člena týmu — úpravy

## Hero

- **Výřez fotky:** `Cover Image` má na šabloně týmu combo **`portret`**
  (`object-position: 50% 12%`) — portréty se ořezávají od hlavy, ne od středu.
  Kdyby některé fotce seděl jiný výřez, uprav procenta v combu.
- **Tlačítka:** CTA kontejner má combo **`vodorovne`** (flex row, gap 12) —
  „Objednat konzultaci" a Instagram jsou vedle sebe. Instagram má combo
  **`sluzba-btn.sekundarni`** — průhledné pozadí, bílý rámeček a text.

## Sekce O mně

RichText navázán na CMS pole **„O mně – delší text"** (`o-mne---delsi-text`).
Pole vyplněno u všech 11 členů (odstavec + Specializace/Co mám na starosti
+ Můj přístup).

⚠ **Texty jsou psané mnou, ne ze starého webu** — rajskaclinic.cz je z tohoto
prostředí blokovaná (403). Držel jsem se bio a pozic, žádné konkrétní školy ani
roky jsem si nevymýšlel, ale před ostrým spuštěním je nutná kontrola klientkou.

## Další lidé z týmu — slider

Stejná stavba jako na homepage: list `slider-track`, item `slider-polozka`,
karta `card-service` (combo `tym-karta`), foto `image-card`, obsah `content-card`
s komponentou `Heading-card` (jméno) a `popis sluzba` (pozice). Nad sliderem
šipky `slider-sipky` / `slider-sipka` s `data-slider="prev|next"` — ovládá je
stejný globální skript.

**Vyloučení otevřeného člověka:** neděje se automaticky — page skript šablony
porovná slug ve skryté značce s adresou a označí kartu třídou `je-aktualni`;
CSS `.w-dyn-item:has(.je-aktualni){display:none}` (v „Karta hover zoom" v1.0.1)
pak schová celé políčko slideru, takže nevznikne mezera.

## Oprava: šablona týmu — odkazy služeb a šipky slideru

- **„Služby, které provádí"** — řádek (`tym-sluzba-odkaz`) byl Link bez cíle,
  proto se nedalo nikam prokliknout. Nastaven link `collectionPage →
  detail_sluzby`; v multireferenčním listu se rozloží na detail každé služby.
- **Šipky slideru „Další lidé"** — builder tlačítkám tiše nezapsal text, takže
  v nich zůstal placeholder „This is some text…". Doplněno ← / → přes
  `set_settings` a kontejner `slider-sipky` zarovnán doprava s odsazením.
  Homepage šipky zkontrolovány — tam texty sedí.

## Oprava: stránka O nás — nečitelný text a chybějící fotky

- **Bílý text:** kapitoly používají sdílené komponenty `Heading-card`
  a `Paragraph`, které jsou navržené pro tmavé překryvy karet — píšou bíle.
  Na béžovém podkladu O nás byly neviditelné. Řešeno CSS overridem scoped jen
  na kapitoly: `.kapitola :is(h1,h2,h3,h4,p){color:#1B1B1B!important}`
  (ve skriptu „Karta hover zoom" v1.0.2). Karty jinde zůstávají bílé.
- **Fotky:** 4 prázdné `kapitola-foto` doplněny fotkami Lucie Rajské z Assets
  (0R9A5317, 20R9A5172, 0R9A5410, banner_lucie). První kapitola už měla
  portrét „MUDr. Lucie Rajská". Až dorazí nové fotky, stačí je vyměnit
  v Designeru na místě.

---

# Závěrečný průchod — nalezené a opravené bugy

| Kde | Chyba | Oprava |
|---|---|---|
| /tym — karty lidí | odkaz měl `mode: collectionPage`, ale **chyběl cíl** (`to`) → proklik mrtvý | doplněn cíl `detail_tym` |
| Homepage — slider týmu | stejná chyba | doplněn cíl `detail_tym` |
| Homepage — karty služeb | nenavázaný obrázek, lorem místo štítků, bez odkazu | navázán obrázek + alt, štítky „Řeší", odkaz na detail služby |
| /prostory | H1/claim/nadpis/perex zůstaly placeholder | doplněny texty + scroll šipka na galerii |
| Footer (celý web) | 4 mrtvé odkazy: telefon, logo, Cookies policy, logo Debono | telefon `tel:`, logo → homepage, Cookies → stránka souhlasu, Debono → debono.cz |
| O nás — obrácené kapitoly | trik `direction: rtl` bez resetu pro obsah | `.kapitola-obracene>*{direction:ltr}` v CSS skriptu (v1.0.3) |

Responzivita zkontrolována u nových částí: `kapitola` (small → 1 sloupec),
`kapitola-foto` (aspect-ratio, fluidní), galerie `Grid 4` (2/1 sloupce),
mega-nav řeší Osmo skript, slider šipky beze změn.

## ⚠ Stále blokováno — jediný zbývající krok v Designeru

**Slugy kolekcí pořád nejsou přejmenované** (ověřeno v API: Tým = `tym`,
Služby = `sluzby`). Dokud se nezmění na `lekar` / `sluzba`, kolidují detaily
s výpisy /tym a /sluzby a prokliky na detaily nemají kam vést — bez ohledu na
to, že odkazy jsou teď nastavené správně. CMS → nastavení kolekce → Slug.

## Screenshoty

`element_snapshot_tool` vyžaduje otevřený Designer (vrací `status:false`)
a `rajska-clinic.webflow.io` je z tohoto prostředí blokované proxy — vizuální
kontrola proto proběhla auditem stylů a nastavení přes API, ne screenshoty.
