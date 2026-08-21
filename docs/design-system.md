# Imole Design System

> "Be the Light"  the visual language of **Imole-ai**, an AI life-skills coach for Nigerian children aged 8–16.
>
> Built for TiT 6.0 (EdTech). Every screen in the app draws exclusively from the tokens below — light screens on `bg-base`, deep navy for hero/landing, warm **cream, orange & cyan** accents.

---

## 1 · Colors

| Token                | RGB triplet       | Swatch                                                        |
| -------------------- | ----------------- | ------------------------------------------------------------- |
| `bg-base`            | `246 249 255`     | <span style="background:rgb(246 249 255);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `bg-surface`         | `240 244 252`     | <span style="background:rgb(240 244 252);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `bg-card`            | `255 255 255`     | <span style="background:rgb(255 255 255);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `bg-input`           | `248 250 253`     | <span style="background:rgb(248 250 253);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `text-primary`       | `0 36 68`         | <span style="background:rgb(0 36 68);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `text-secondary`     | `27 80 126`       | <span style="background:rgb(27 80 126);display:inline-block;width:64px;height:18px"></span> |
| `text-muted`         | `96 115 140`      | <span style="background:rgb(96 115 140);display:inline-block;width:64px;height:18px"></span> |
| `accent`             | `0 36 68`         | <span style="background:rgb(0 36 68);display:inline-block;width:64px;height:18px"></span> |
| `accent-soft`        | `231 235 248`     | <span style="background:rgb(231 235 248);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `accent-text`        | `255 255 255`     | <span style="background:rgb(255 255 255);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `periwinkle`         | `117 128 239`     | <span style="background:rgb(117 128 239);display:inline-block;width:64px;height:18px"></span> |
| `cyan`               | `0 206 222`       | <span style="background:rgb(0 206 222);display:inline-block;width:64px;height:18px"></span> |
| `orange`               | `255 138 0`       | <span style="background:rgb(255 138 0);display:inline-block;width:64px;height:18px"></span> |
| `peach`              | `255 228 219`     | <span style="background:rgb(255 228 219);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `navy`               | `0 36 68`         | <span style="background:rgb(0 36 68);display:inline-block;width:64px;height:18px"></span> |
| `bodyblue`           | `27 80 126`       | <span style="background:rgb(27 80 126);display:inline-block;width:64px;height:18px"></span> |
| `border`             | `210 220 231`     | <span style="background:rgb(210 220 231);display:inline-block;width:64px;height:18px"></span> |
| `success`            | `0 177 106`       | <span style="background:rgb(0 177 106);display:inline-block;width:64px;height:18px"></span> |
| `error`              | `226 65 65`       | <span style="background:rgb(226 65 65);display:inline-block;width:64px;height:18px"></span> |
| `streak`             | `255 138 0`       | <span style="background:rgb(255 138 0);display:inline-block;width:64px;height:18px"></span> |
| `streak-soft`        | `255 244 229`     | <span style="background:rgb(255 244 229);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `surface-hover`      | `236 240 248`     | <span style="background:rgb(236 240 248);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `ring`               | `117 128 239`     | <span style="background:rgb(117 128 239);display:inline-block;width:64px;height:18px"></span> |
| `navy-deep`          | `0 37 70`         | <span style="background:rgb(0 37 70);display:inline-block;width:64px;height:18px"></span> |
| `navy-dark`          | `2 22 40`         | <span style="background:rgb(2 22 40);display:inline-block;width:64px;height:18px"></span> |
| `cream`              | `255 244 230`     | <span style="background:rgb(255 244 230);border:1px solid #d2dce7;display:inline-block;width:64px;height:18px"></span> |
| `pink`               | `255 0 133`       | <span style="background:rgb(255 0 133);display:inline-block;width:64px;height:18px"></span> |

### Rules of thumb

- **Light screens** on `bg-base`; **dark sections** (PageHero, landing) on the navy family.
- **Accents** come from cream, orange and cyan — never purple or pink gradients.
- **Cards** are `bg-card` with a hairline `border` and a soft shadow.

---

## 2 · Typography

| Token          | Font            | Weight | Case     | Letter-spacing | Line-height |
| -------------- | --------------- | ------ | -------- | -------------- | ----------- |
| `display`      | Baloo 2         | 800    | uppercase| `-0.02em`      | `0.9`       |
| `h1` … `h4`    | Baloo 2         | 600    | normal   | normal         | `1.1`       |
| `body`         | Quicksand       | 400/600| normal   | normal         | `1.6`       |
| `label`        | Quicksand       | 600    | uppercase| `0.08em`       | `1.2`       |

```css
--font-display: "Baloo 2", cursive;
--font-heading: "Baloo 2", cursive;
--font-sans:    "Quicksand", system-ui, sans-serif;

.display-mega {
  font-family: var(--font-display);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
}
```

---

## 3 · Spacing scale

Spacing is expressed in `rem`. Use the scale — don't invent steps.

| Step | Value | Step | Value |
| ---- | ----- | ---- | ----- |
| `1`  | 1rem  | `4`  | 4rem  |
| `1.5`| 1.5rem| `5`  | 5rem  |
| `2`  | 2rem  | `6`  | 6rem  |
| `3`  | 3rem  |      |       |

---

## 4 · Radii

| Token | Value   | Usage            |
| ----- | ------- | ---------------- |
| `sm`  | .75rem  | badges, pills    |
| `md`  | 1rem    | inputs           |
| `lg`  | 1.25rem | cards (tighter)  |
| `xl`  | 1.5rem  | cards            |
| `2xl` | 2rem    | primary buttons, cards |
| `pill`| 999px   | avatars, pills   |

---

## 5 · Motion

All motion is subtle and reduced-motion aware (`prefers-reduced-motion` disables it).

| Keyframe      | Effect                                              |
| ------------- | --------------------------------------------------- |
| `enter`       | fade-in + translateY(12px)                          |
| `slide-up`    | fade-in + translateY(8px)                           |
| `fade-in`     | opacity 0 → 1                                       |
| `float`       | gentle translateY(-14px) loop                       |
| `streak-pop`  | scale 1 → 1.2 → 1 (streak milestones)               |
| `shimmer`     | diagonal sheen sweep (skeletons, marquee)           |
| `twinkle`     | star opacity pulse                                  |
| `wobble`      | subtle rotate jiggle                                |
| `ring-pop`    | scale 1 → 1.4 → 1 (correct answers)                 |
| `swing-in`    | rotate(-6deg) + translateY(24px) → settle, spring   |

```css
@keyframes streak-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes swing-in {
  0%   { transform: rotate(-6deg) translateY(24px); opacity: 0; }
  60%  { transform: rotate(1.5deg) translateY(-2px); opacity: 1; }
  100% { transform: rotate(0deg) translateY(0); }
}
```

---

## 6 · Components

Every component below is rendered in the live **[UI kit](../ui-kit/index.html)**.

### Button

Rounded `2xl`, `font-heading`, bold, `px-5 py-3`. Variants:

| Variant   | Spec                                                          |
| --------- | ------------------------------------------------------------- |
| `primary` | `bg-accent` · `text-accent-text` · hover `bg-navy-deep`       |
| `secondary`| `bg-accent-soft` · `text-accent`                              |
| `outline` | `border border-border` · hover `border-accent/30 bg-accent-soft/50` |
| `outline--light` | `border-white/45` · `text-white` · hover `bg-white/10` (dark surfaces) |
| `ghost`   | `text-accent` · hover `bg-accent-soft`                        |
| `orange`    | `bg-orange` · `text-[#00213f]`                                  |
| `danger`  | `bg-error` · `text-white`                                     |

Sizes: `sm` (px-3 py-2 text-xs) · `md` (px-4 py-2.5 text-sm) · `lg` (px-5 py-3 text-sm).

```html
<button class="inline-flex items-center gap-2 rounded-2xl bg-accent px-5 py-3
  font-heading text-sm font-bold text-accent-text transition hover:bg-navy-deep">
  Get started
</button>
```

### Card

`bg-card` · `border border-border` · `rounded-2xl` · `shadow-sm`. Wrapped in `CardContent` with `p-5`.

### Badge

`rounded-full px-2.5 py-1 text-xs font-bold`. Tones: `accent`, `orange`, `streak`, `success`.

### Input & Textarea

`rounded-xl border border-border bg-bg-input px-4 py-2.5 text-sm`,
focus: `border-accent/40 ring-2 ring-ring/30`. Labeled with the `label` type style.

### Avatar

Initials, sizes 8–14 (32–56px), color wheel, `rounded-2xl`.

### Skeleton

`rounded-xl bg-surface-hover animate-pulse` — for loading cards, rows and lines.

### Toast

Fixed to the bottom, `rounded-2xl`, success/error icon + message, auto-dismiss.

### PageHero

Navy gradient (`bg-landing-hero`, `#002d54 → #03162a`), eyebrow label, Baloo title,
subtitle, action button and decorative chips.

### SectionHeader

Tone dot (`navy`/`orange`/`cyan`/`peach`) + title + subtitle + optional action.

### Spinner

`animate-spin`, `text-accent`.

### StatCard

Icon + value + label. Solid tone variants: `orange`, `cyan`, `peach`.

### StreakBadge

Flame icon + day count on a `cream` background, `rounded-full`.

### LanguagePill

`rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase`.

---