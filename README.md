# 🦷 THE BRACES & CROWNS - Modern Dental Clinic Landing Page

A high-fidelity, ultra-responsive landing page designed for **"THE BRACES & CROWNS"** dental clinic in Ameerpet, Hyderabad. Inspired by premium healthcare SaaS designs and modern dental websites, this project delivers clean visual storytelling, high conversion structure, interactive treatment drawers, and smooth scrolling interactions.

---

## 🎨 Brand System & Palette

- **Deep Blue (`#0B4696`)**: Primary CTAs, brand highlights, and structural emphasis.
- **Bright Sky Blue (`#4AC0EE`)**: Gradient accents, icons, and interactive elements.
- **White (`#FFFFFF`)**: Primary clean card surfaces and readable contrast.
- **Soft Ice Background (`#F7FBFE`)**: Primary canvas background.
- **Light Blue Surface (`#EEF8FD`)**: Section background alternation and card surfaces.
- **Dark Text (`#0B1220`)**: Headings & primary body copy.
- **Secondary Text (`#475569`)**: Subtitles, muted labels, and secondary details.
- **Soft Border (`#D9EAF4`)**: Card borders and subtle dividers.
- **Selective Gradient**: `linear-gradient(135deg, #0B4696 0%, #4AC0EE 100%)`
- **Typography**: `Manrope` (Headings) + `Inter` (Body & UI)

---

## ✨ Features & Included Sections

1. **Header**: Sticky glassmorphic header with clinic logo, navigation links, primary CTA, and a responsive mobile menu drawer.
2. **Hero Section**: Asymmetrical split layout with floating trust badges ("Digital Planning", "Orthodontist-Led Care"), compact stat card, and direct Call/WhatsApp triggers.
3. **Trust & Credibility Strip**: Horizontal feature strip highlighting clinical standards and patient commitments.
4. **Bento Benefits Grid**: Modular bento card layout mixing 3D scanning highlights, 100% digital alignment stats, clear aligner options, and patient comfort features.
5. **About Section**: Overlapping staggered image cards with clinical philosophy and Dr. Prudhvi's approach.
6. **Services Grid**: 6 core treatment cards (Orthodontics, Clear Aligners, Implants, Cosmetic, General, Smile Makeovers) with interactive procedure drawers ("Learn More").
7. **Doctor Spotlight**: Comprehensive profile of **Dr. S. Prudhvi Das Reddy, MDS** (Orthodontist & Dentofacial Specialist) with focus area chips.
8. **Treatment Journey**: 4-step structured process (Consultation → Clinical Evaluation → Personalised Plan → Guided Treatment).
9. **Technology Showcase**: Digital dentistry bento cards highlighting 3D intraoral scanning, digital smile assessment, and clear aligner workflows.
10. **Why Choose Us**: 6-card value proposition matrix covering evidence-based care, clear communication, and long-term oral health focus.
11. **Smile Gallery Preview**: Filterable case preview (Braces, Clear Aligners, Smile Makeovers) with before/after visualizers and case disclaimers.
12. **Testimonial Section**: Verified patient feedback cards with avatars, locations, and treatment tags.
13. **FAQ Accordion**: Interactive accordion covering the top 6 patient questions with smooth open/close states.
14. **Final CTA Banner**: Deep blue background with soft radial glow accents and dual booking/WhatsApp buttons.
15. **Footer**: 4-column layout with Ameerpet clinic address, contact info (`dasreddyprudhvi@gmail.com`), operating hours, quick links, and medical disclaimer.
16. **Interactive Modals & Utilities**:
    - **Booking Consultation Modal**: Step-by-step appointment request form with date/time picker and instant confirmation.
    - **Service Detail Modal**: Interactive procedure drawer with key clinical benefits.
    - **Mobile Sticky Action Bar**: Fixed bottom action bar on mobile for Quick Call, WhatsApp, and Booking.
    - **Lenis Smooth Scroll**: Silky smooth physics-based scrolling.

---

## 📁 Repository Structure

```
dental-v1/
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Dependencies and build scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind theme & design tokens
├── vite.config.js              # Vite server & build configuration
├── src/
│   ├── App.jsx                 # Main layout & section orchestrator
│   ├── main.jsx                # React root renderer
│   ├── index.css               # Base Tailwind directives & custom utilities
│   ├── data/
│   │   └── clinicData.js       # Structured mock clinic data & images
│   └── components/
│       ├── Header.jsx          # Sticky glass navigation
│       ├── Hero.jsx            # Asymmetrical hero banner
│       ├── TrustStrip.jsx      # Horizontal credibility bar
│       ├── BentoBenefits.jsx   # Modular benefit cards
│       ├── AboutSection.jsx    # Intro & clinical story
│       ├── ServicesSection.jsx # 6 core treatments grid
│       ├── DoctorSection.jsx   # Doctor spotlight card
│       ├── TreatmentJourney.jsx# 4-step interactive timeline
│       ├── TechnologySection.jsx # Digital dentistry showcase
│       ├── WhyChooseUs.jsx     # Value proposition matrix
│       ├── SmileGallery.jsx    # Filterable before/after preview
│       ├── TestimonialsSection.jsx # Patient reviews
│       ├── FAQSection.jsx      # Accordion questions
│       ├── FinalCTASection.jsx # Deep blue conversion section
│       ├── Footer.jsx          # 4-column footer
│       ├── BookingModal.jsx    # Appointment request modal
│       ├── ServiceModal.jsx    # Procedure details drawer
│       └── MobileStickyBar.jsx # Fixed bottom bar for mobile
```

---

## 🛠️ Installation & Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `yarn`

### Step 1: Clone the Repository
```bash
git clone https://github.com/itsyourpriyansu-cloud/dental-test.git
cd dental-test
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or `http://localhost:3001`).

### Step 4: Build for Production
```bash
npm run build
```
The optimized bundle will be generated inside the `dist/` directory.

### Step 5: Preview Production Build
```bash
npm run preview
```

---

## 📊 Performance Metrics & Tech Stack

- **Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.4 + Custom Design Tokens
- **Icons**: Lucide React
- **Animations & Interaction**: Framer Motion 11 + Lenis Smooth Scroll
- **Production Build Size**: ~33 KB CSS (compressed: ~6 KB) | ~261 KB JS (compressed: ~71 KB)
- **Responsive Viewports**: Tested for Mobile (375px), Tablet (768px), and Desktop (1440px)
