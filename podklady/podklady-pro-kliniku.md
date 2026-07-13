# Podklady a otázky pro RAJSKÁ Clinic

Podklad k prototypu nového webu (https://debonocz.github.io/Rajska-Clinic-V2.0/).
Vše, co potřebujeme od kliniky, na jednom místě. Připravila agentura Debono Interactive.

## 1. Obrazové materiály a videa (checklist)

Obecné požadavky: fotografie v nejvyšším dostupném rozlišení (min. delší strana 2000 px), bez filtrů a výrazných úprav, jednotné světlo. U dvojic před/po stejný úhel, pozadí i světlo. Videa ideálně 4K nebo 1080p, na šířku 16:9, medailonky 30–90 s. U všech fotografií pacientů potřebujeme písemný souhlas s publikací.

### Fotografie
- [ ] **Portréty týmu** — 11× (na výšku 4:5, jednotný styl): MUDr. Lucie Rajská, Ph.D., MUDr. Barbora Grillová, MUDr. Vladěna Charvátová, MUDr. Kryštof Kudláček, MUDr. Natália Havlíček, MUDr. Zuzana Ťulpová, MUDr. Marie Efanová, MUDr. Barbora Formánková, Bc. Anna Flachsová, Bc. Romana Balušková, Klára Nováková
- [ ] **Foto průběhu ošetření** — 12× (na šířku, ke každé službě 1 hlavní): Botulotoxin, Výplně kyselinou hyaluronovou, Niťový lifting, Bioremodelace a biorevitalizace, Mezoterapie a mikrojehličkování, Chemický peeling, Preventivní dermatologie, Všeobecná dermatologie, Dětská dermatologie, Laserové ošetření CO2, Epilace, Plastická chirurgie
- [ ] **Před / po dvojice** — celkem 60 fotografií (30 dvojic): Botulotoxin (4 dvojic), Výplně kyselinou hyaluronovou (4 dvojic), Niťový lifting (3 dvojic), Bioremodelace a biorevitalizace (3 dvojic), Mezoterapie a mikrojehličkování (3 dvojic), Chemický peeling (3 dvojic), Laserové ošetření CO2 (4 dvojic), Epilace (3 dvojic), Plastická chirurgie (3 dvojic)
- [ ] **Prostory kliniky** — 6× (recepce, čekárna, 2× ošetřovna, laserová ordinace, detail interiéru)
- [ ] **Dárkový voucher** — 1× produktová fotografie
- [ ] **Portrét MUDr. Rajské pro stránku O nás** — 1× + 5 doprovodných fotografií ke kapitolám příběhu (archiv: studia, věda, ošetření, tým, média)

### Videa
- [ ] **Hero video** — prostory kliniky / atmosféra, 15–30 s, beze zvuku (smyčka na úvodní stránce)
- [ ] **Video medailonky služeb** — 3×: Botulotoxin, Výplně kyselinou hyaluronovou, Plastická chirurgie
- [ ] **Video medailonky lékařů** — 3×: MUDr. Lucie Rajská, Ph.D., MUDr. Vladěna Charvátová, MUDr. Barbora Formánková
- [ ] **Video medailonek O nás** — MUDr. Rajská o filozofii kliniky (1–2 min)

### Otázky k materiálům
- Máte již profesionální fotografie, nebo domluvíme focení? (doporučujeme 1 focení: tým + prostory + průběhy ošetření)
- Souhlasy pacientů k před/po fotografiím — kolik dvojic reálně máte k dispozici?
- Loga médií v pásu „Můžete nás znát z“ — přebíráme ze současného webu, potvrďte prosím aktuálnost seznamu.

## 2. Ceník — struktura pro Webflow CMS + CSV k importu

Navrhujeme **2 CMS kolekce** (viz přiložené CSV soubory připravené k importu):

**Kolekce „Ceník – kategorie“** (`cenik-kategorie.csv`, 24 položek): Name, Slug, Oblast (Estetická medicína / Dermatologie / Obě), Popis, Poznámka, Akce – titulek, Akce – text (slevové boxy), Klíčová slova pro vyhledávání, Pořadí.

**Kolekce „Ceník – položky“** (`cenik-polozky.csv`, 125 položek): Name, Slug, Cena (textově, formát „3 700,-“), Skupina / poznámka k ceně (např. „Plná dávka“, „RTY“), Kategorie (reference na kolekci kategorií — při importu se mapuje přes Name/Slug), Pořadí v kategorii, Zvýraznit jako balíček.

Vazby: Služba → multi-reference na Kategorie ceníku (ceny se automaticky propisují na podstránky služeb). Ceny jsou textové pole, aby šly zapsat rozsahy („od 1 500,-“, „2 000,-/1 000,-“).

### Otázky k ceníku
- Je přiložený ceník (24 kategorií, 125 položek) finální a kompletní? Zkontrolujte prosím zejména nové položky: pocení (11/12 tis.), mezoterapie vlasové pokožky, chemické peelingy.
- Platí všechny slevové akce (balíčky 3 ošetření −10 %, epilace 6 ošetření −10 %, IPLASE Cream)?
- „Histologické vyšetření 2 000-“ a „Žilky kolem nosu 2000 - 2500,-“ — sjednotit formát cen?
- Popis hydroxyapatitu obsahuje překlep „lifnitgu“ (převzato ze současného webu) — opravíme na „liftingu“?

## 3. Kontrola služeb (viz `sluzby-ke-kontrole.csv`)

Web nyní obsahuje **12 služeb** ve 3 oblastech:

- **Estetická medicína**: Botulotoxin, Výplně kyselinou hyaluronovou, Niťový lifting, Bioremodelace a biorevitalizace, Mezoterapie a mikrojehličkování, Chemický peeling
- **Dermatologie**: Preventivní dermatologie, Všeobecná dermatologie, Dětská dermatologie, Laserové ošetření CO2, Epilace
- **Plastická chirurgie**: Plastická chirurgie

Prosíme o kontrolu v přiloženém CSV (sloupce SPRÁVNĚ? a POZNÁMKA KLINIKY):
- Jsou v seznamu **všechny služby**, které chcete nabízet? Nechybí něco (např. plazmaterapie, PRP, odstranění tetování…)? Není tam naopak něco navíc?
- **Garanti služeb** — navrhli jsme je podle specializací, potvrďte prosím u každé služby.
- **Kdo kterou službu provádí** (vazba lékař ↔ služba) — určuje, kdo se zobrazí v sekci „Váš tým pro tuto službu“.
- **Rychlá fakta** (délka / anestezie / rekonvalescence / výdrž výsledku) — vyplnili jsme dle běžné praxe, **vyžadují odbornou korekci** u každé služby.
- **Plastická chirurgie** — texty jsou pracovní návrh (⚠ označeno v prototypu). Potřebujeme od MUDr. Formánkové seznam konkrétních zákroků, které se budou nabízet, a ceník.
- U epilace prosím doplňte **typ přístroje/technologie** (na webu ho neuvádíme).

## 4. Texty k odborné korekci

- Kroky „Jak ošetření probíhá“ a sekce „Rekonvalescence“ u všech 12 služeb — návrh copy, potřebuje projít lékařem.
- Stránka **O nás** — příběh MUDr. Rajské je sestaven z veřejných zdrojů. Zkontrolovat fakta (zejména rok založení kliniky — uvádíme 2023 — a formulace o certifikacích a grantu).
- Prodejní claimy služeb („Vyhlazení vrásek, které nikdo nepozná…“) — odsouhlasit tón.

## 5. Ostatní

- **Reference na úvodní stránce** — v prototypu jsou ilustrační. Dodáte 3 reálné recenze (se souhlasem klientů), nebo propojíme s Google recenzemi?
- Odkazy na **Instagram a Facebook** — potvrdit správné profily (rajskaclinic / dr.lucierajska).
- **Recepce v kontaktním boxu** — zobrazujeme Kláru Novákovou s indikací „online“. Souhlasí? Má být dostupnost napojena na otevírací dobu?
- **GDPR text** u rezervačního formuláře a kam mají poptávky chodit (e-mail / rezervační systém?).
- Průměrná čekací doba „nejdříve za 14 dní“ — stále platí?
