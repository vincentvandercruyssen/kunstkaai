+++
title = 'Cursus: Talstelsels'
date = 2025-09-01T00:00:00Z
draft = false
+++

## Inleiding

We gebruiken dagelijks het **decimale talstelsel**. Computers werken intern met **binaire getallen**, maar programmeurs gebruiken vaak ook **hexadecimale notatie** omdat die compacter is. Elk talstelsel werkt met **plaatswaarden** die telkens een **macht van de basis** zijn.

In deze cursus vind je de drie belangrijkste talstelsels:
- Decimaal (basis tien)
- Binair (basis twee)
- Hexadecimaal (basis zestien)

## Decimaal (basis 10)

Het decimale stelsel gebruikt de cijfers **0 tot 9**.

Elke positie is een macht van 10.

| Macht | Cijfer | Waarde         |
|-------|--------|----------------|
| 10⁶   | 0-9    | miljoen        |
| 10⁵   | 0-9    | honderdduizend |
| 10⁴   | 0-9    | tienduizend    |
| 10³   | 0-9    | duizend        |
| 10²   | 0-9    | honderd        |
| 10¹   | 0-9    | tien           |
| 10⁰   | 0-9    | een            |

#### Voorbeelden

- 253 = 2×100 + 5×10 + 3×1
- 7 = 7×1
- 184 = 1×100 + 8×10 + 4×1
- 3402 = 3×1000 + 4×100 + 0×10 + 2×1

## Binair (basis 2)

Het binaire stelsel gebruikt enkel de cijfers **0** en **1**.

Elke positie is een macht van 2.

{{< table_layoutfixed >}}
| Macht | Bit | Binair   | Decimaal |
|-------|-----|----------|----------|
| 2⁷    | 0/1 | 10000000 | 128      |
| 2⁶    | 0/1 | 01000000 | 64       |
| 2⁵    | 0/1 | 00100000 | 32       |
| 2⁴    | 0/1 | 00010000 | 16       |
| 2³    | 0/1 | 00001000 | 8        |
| 2²    | 0/1 | 00000100 | 4        |
| 2¹    | 0/1 | 00000010 | 2        |
| 2⁰    | 0/1 | 00000001 | 1        |

#### Voorbeelden

Maak een tabel van 128 tot en met 1 en bepaal zo het decimale getal.

{{< table_layoutfixed >}}
| DEC     | BIN | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---------|-----|-----|----|----|----|---|---|---|---|
| **24**  | →   | 0   | 0  | 0  | 1  | 1 | 0 | 0 | 0 |
| **46**  | →   | 0   | 0  | 1  | 0  | 1 | 1 | 1 | 0 |
| **125** | →   | 0   | 1  | 1  | 1  | 1 | 1 | 0 | 1 |
| **255** | →   | 1   | 1  | 1  | 1  | 1 | 1 | 1 | 1 |

Bijvoorbeeld 00101101 = 45, want 32 + 8 + 4 + 1  
(0×128 + 0×64 + 1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1)

## Hexadecimaal (basis 16)

Het hexadecimale stelsel gebruikt zestien symbolen, 0 tot en met 15:  
**0 1 2 3 4 5 6 7 8 9 A B C D E F** 

Elke positie is een macht van 16.

{{< table_layoutfixed >}}
| Macht | Symbool | Hexadecimaal | Decimaal  |
|-------|---------|--------------|-----------|
| 16⁶   | 0-F     | F000000      | 251658240 |
| 16⁵   | 0-F     | F00000       | 15728640  |
| 16⁴   | 0-F     | F0000        | 983040    |
| 16³   | 0-F     | F000         | 61440     |
| 16²   | 0-F     | F00          | 3840      |
| 16¹   | 0-F     | F0           | 240       |
| 16⁰   | 0-F     | F            | 15        |

#### Handige reeksen

#### 16⁰

| HEX | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 0A | 0B | 0C | 0D | 0E | 0F |
|-----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| DEC | 0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 10 | 11 | 12 | 13 | 14 | 15 |


#### 16¹

| HEX | 10 | 20 | 30 | 40 | 50 | 60 | 70  | 80  | 90  | A0  | B0  | C0  | D0  | E0  | F0  | FF  |
|-----|----|----|----|----|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| DEC | 16 | 32 | 48 | 64 | 80 | 96 | 112 | 128 | 144 | 160 | 176 | 192 | 208 | 224 | 240 | 255 |

#### 16²

| HEX | 100 | 200 | 300 | 400  | 500  | 600  | 700  | 800  | 900  | . . . | F00  |
|-----|-----|-----|-----|------|------|------|------|------|------|-------|------|
| DEC | 256 | 512 | 768 | 1024 | 1280 | 1536 | 1792 | 2048 | 2304 | . . . | 3840 |

#### Voorbeelden

- 0A = 0×16 + 10×1 = 10
- 1B = 1×16 + 11×1 = 27
- 2E = 2×16 + 14×1 = 46
- 7F = 7×16 + 15×1 = 127
- C8 = 12×16 + 8×1 = 200
- FF = 15×16 + 15×1 = 255

## Een byte

Maximumwaarde in één byte:
- Decimaal: **255**
- Hexadecimaal: **FF**
- Binair: **11111111**