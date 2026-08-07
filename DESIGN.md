---
name: Clinical Precision — The Braces & Crowns
colors:
  surface: '#F7FBFE'
  surface-dim: '#D3DAEE'
  surface-bright: '#FFFFFF'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F1F3FF'
  surface-container: '#EEF8FD'
  surface-container-high: '#E2E8FC'
  surface-container-highest: '#DCE2F6'
  on-surface: '#0B1220'
  on-surface-variant: '#475569'
  inverse-surface: '#0B1220'
  inverse-on-surface: '#F7FBFE'
  outline: '#D9EAF4'
  outline-variant: '#C3C6D3'
  surface-tint: '#0B4696'
  primary: '#0B4696'
  on-primary: '#FFFFFF'
  primary-container: '#EEF8FD'
  on-primary-container: '#0B4696'
  inverse-primary: '#4AC0EE'
  secondary: '#4AC0EE'
  on-secondary: '#0B1220'
  secondary-container: '#E0F2FE'
  on-secondary-container: '#0284C7'
  tertiary: '#1E293B'
  on-tertiary: '#FFFFFF'
  tertiary-container: '#F1F5F9'
  on-tertiary-container: '#334155'
  error: '#BA1A1A'
  on-error: '#FFFFFF'
  error-container: '#FFDAD6'
  on-error-container: '#93000A'
  border: '#D9EAF4'
  background: '#F7FBFE'
  on-background: '#0B1220'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.08'
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  card: 1.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 120px
---

# Brand & Style Guidelines — The Braces & Crowns

The design system for **THE BRACES & CROWNS** embodies a **Clinical Precision & Modern Elegance** aesthetic—combining medical hygiene with high-end SaaS digital refinement. Led by Orthodontic Specialist Dr. S. Prudhvi Das Reddy (MDS), the practice requires a visual identity that exudes trust, technical mastery, and patient comfort.

## Design Identity & Visual Pillars

1. **Clinical Precision:** Crisp 1px subtle borders (`#D9EAF4`), subtle dot grid textures, structured multi-column bento grids, and clear typographic hierarchy.
2. **Patient-Centered Warmth:** Smooth rounded cards (24px-28px radius), soft ice-blue surface tones (`#F7FBFE` & `#EEF8FD`), generous vertical padding, and calm color palette.
3. **Interactive Delight:** Micro-animations using custom cubic-bezier timing curves, a unified CTA arrow system (48px circular buttons with sliding arrow vectors), glassmorphic header blur, and floating hero feedback cards.

---

## Color System

The palette pairs high-contrast **Deep Navy** (`#0B4696`) for authority and primary actions with **Electric Sky Blue** (`#4AC0EE`) for accents and highlights. Soft ice background tints establish visual layering without feeling heavy or dark.

| Role | Color Name | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | Deep Clinical Navy | `#0B4696` | Main CTAs, active states, key headings, primary buttons |
| **Secondary Brand** | Sky Blue Accent | `#4AC0EE` | Hover states, glowing accents, highlight badges |
| **Dark Neutral** | Charcoal Navy | `#0B1220` | Primary body text, high-impact footers, deep hero text |
| **Ice Background** | Soft Ice Blue | `#F7FBFE` | Main page background canvas, calm baseline |
| **Surface Layer** | Light Cyan Surface | `#EEF8FD` | Container background for floating cards and badges |
| **Border / Divider** | Subtle Blue Border | `#D9EAF4` | 1px border lines for cards, inputs, and modal dividers |
| **Pure White** | Pure White | `#FFFFFF` | Top elevated cards, button arrows, modal surfaces |

---

## Typography

The design system pairs **Manrope** for strong geometric headings and titles with **Inter** for ultra-legible body text and UI labels.

* **Headline Font:** `Manrope, sans-serif` (Weights: 600, 700, 800)
* **Body Font:** `Inter, sans-serif` (Weights: 400, 500, 600)
* **Serif Accent:** `Instrument Serif, serif` (Italic accent text in hero heading)

### Scale Reference
- **Display XL:** 56px (Desktop) / 36px (Mobile) · Line-height: 1.08 · Weight: 800
- **Headline Large:** 32px (Desktop) / 24px (Mobile) · Line-height: 1.2 · Weight: 700
- **Headline Medium:** 24px · Line-height: 1.3 · Weight: 600
- **Body Large:** 18px · Line-height: 1.6 · Weight: 400
- **Body Medium:** 16px · Line-height: 1.6 · Weight: 400
- **Label Small:** 12px · Line-height: 1.0 · Weight: 600 · Letter-spacing: 0.05em (Uppercase)

---

## Layout & Container Grid

* **Maximum Container Width:** 1280px (centered with auto margins)
* **Desktop Padding:** 32px - 64px
* **Mobile Padding:** 16px - 20px
* **Section Gap:** 80px to 120px vertical spacing between sections
* **Grid Spacing System:** 8px base rhythm (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)

---

## Elevation & Depth

* **Base Canvas:** Soft Ice (`#F7FBFE`)
* **Layer 1 (Containers):** `#EEF8FD` surface with `1px solid #D9EAF4` border
* **Layer 2 (Elevated Cards):** Pure White (`#FFFFFF`) with soft shadow `0 12px 32px -8px rgba(11, 70, 150, 0.08)`
* **Layer 3 (Floating Modals & Sticky Nav):** Glassmorphic `#ffffffd9` with `backdrop-filter: blur(12px)` and shadow `0 10px 30px -14px rgba(11, 18, 32, 0.18)`

---

## Component Specifications

### 1. Header & Navigation (`.hnav`)
- **Position:** Sticky top with smooth entrance animation (`translateY(-20px)` to `0`).
- **Background:** White glassmorphic blur with 1px bottom border (`#D9EAF4`).
- **Logo:** `images/logo-transparent.webp` (height 60px desktop / 36px mobile).
- **Navigation Links:** Pill hover background (`#EEF8FD`), font weight 600, color `#0B1220`.
- **Primary Header CTA:** Deep navy button with circular white arrow icon.

### 2. Universal CTA Arrow System (`.cta-arrow` & `.cta-btn`)
- **Primary CTA (`.cta-btn--primary`):** Solid navy `#0B4696`, white text, 9999px pill border-radius.
- **Secondary CTA (`.cta-btn--secondary`):** Soft ice background `#EEF6FF`, 1px border `#D5E4F5`, dark navy text.
- **Arrow Icon (`.cta-arrow`):** 48px pure white circle with 20px icon `#0B4696`. Hover triggers `scale(1.05)` on circle and `translateX(3px)` on vector icon.

### 3. Hero Redesign (`.hero2`)
- **Background:** High-res doctor-patient treatment image (`images/dentist-hero.png`) with layered radial gradient overlay.
- **Heading:** High-impact Manrope typography with italic serif highlight ("*precisely engineered care.*").
- **Floating Info Cards:** Multi-column floating cards highlighting Doctor-Led Care, Digital Smile Design, and Flexible Appointments.

### 4. Treatment Bento Grid & Services (`#treatments`)
- **Grid Layout:** 3 columns (desktop) / 2 columns (tablet) / 1 column (mobile).
- **Cards:** Equal-height cards with 13rem image container, badge overlays, and hover elevation (`translateY(-4px)`).
- **Service Detail Modal:** Accessible modal with treatment overview, procedure steps, duration, and direct booking triggers.

### 5. Doctor Spotlight (`.ds`)
- **Grid:** 42% media column / 58% content column with 64px gap.
- **Media Frame:** 28px rounded corner image container with floating identity pill badge ("Dr. S. Prudhvi Das Reddy - Orthodontist & Dentofacial Specialist").
- **Credentials Grid:** Soft blue cards detailing MDS degree, 12+ years experience, and 5,000+ smile transformations.

### 6. Interactive Technology Journey (`.tj`)
- **Interactive Step Switcher:** Step-by-step digital treatment workflow (3D Intraoral Scanning, AI Alignment Simulation, Custom Orthodontic Appliances, Retainer Care).
- **Motion:** Fade-in content transitions and progress indicator.

### 7. Transformation Gallery (`#transformations`)
- **Before/After Comparison:** Interactive slider or side-by-side clinical case studies showing orthodontic alignment, porcelain crowns, and clear aligner results.

### 8. Appointment Booking Modal (`#booking-modal`)
- **Overlay:** Backdrop dark overlay with animated centered modal box.
- **Form Controls:** Clean 8px-12px rounded input fields with `#D9EAF4` border, focus ring `#4AC0EE`, and clear step selection.

### 9. Footer (`.footer`)
- **Background:** Dark Charcoal Navy (`#0B1220`) with light contrast text (`#FFFFFF` & `#94A3B8`).
- **Sections:** Clinic details, working hours, interactive map link, emergency contact line, copyright notices.
