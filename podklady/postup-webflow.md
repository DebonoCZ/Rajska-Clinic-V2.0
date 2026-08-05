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
