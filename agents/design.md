# UKMFT Blue Murder Design System

## Mission

Menciptakan panduan antarmuka (UI) berbasis token yang siap diimplementasikan untuk website publik UKMFT Blue Murder, dioptimalkan untuk konsistensi, aksesibilitas, dan performa yang cepat dengan pendekatan mode gelap (Dark Mode) yang estetik.

## Brand

* Product/brand: UKMFT Blue Murder
* URL: [Situs Utama UKM]
* Audience: Mahasiswa Fakultas Teknik, calon anggota (Open Recruitment), dan penikmat seni.
* Product surface: Website Front-Office / CMS Public Site

## Style Foundations

* Visual style: Creative portfolio, dark-mode default, estetik, visual-heavy (menonjolkan aset foto/video karya).
* Main font style: font.family.primary="Plus Jakarta Sans", font.family.stack="Plus Jakarta Sans", sans-serif, font.size.base=16px, font.weight.base=400, font.lineHeight.base=24px
* Typography scale: font.size.xs=12px, font.size.sm=14px, font.size.md=16px, font.size.lg=18px, font.size.xl=20px, font.size.2xl=24px, font.size.3xl=32px
* Color palette:
* color.surface.base=#011F6D (Navy gelap untuk background utama)
* color.surface.muted=#045497 (Biru medium untuk surface/kartu sekunder)
* color.text.primary=#FFFFFF (Putih untuk teks utama di atas gelap)
* color.text.secondary=#5189C6 (Biru terang untuk teks pendukung/subjudul)
* color.accent.primary=#FFAA4D (Kuning/Oranye untuk CTA, tombol, dan highlight interaktif)


* Spacing scale: space.1=4px, space.2=8px, space.3=16px, space.4=24px, space.5=40px
* Radius/shadow/motion tokens: Memanfaatkan efek glassmorphism (blur) dengan transisi animasi scroll yang halus untuk mendukung nuansa seni.

## Accessibility

* Target: WCAG 2.2 AA
* Keyboard-first interactions required (terutama pada navigasi galeri karya dan form pendaftaran).
* Focus-visible rules required (menggunakan outline dengan warna color.accent.primary atau #FFAA4D).
* Contrast constraints required (memastikan rasio teks terhadap background Navy gelap lolos uji kontras).

## Writing Tone

Concise, confident, implementation-focused, dan bernuansa kreatif/artistik.

## Rules: Do

* Use semantic tokens (contoh: bg-surface-base, text-accent-primary), not raw hex values, in component guidance.
* Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
* Component behavior should specify responsive and edge-case handling (sangat penting untuk grid masonry pada galeri seni).
* Interactive components must document keyboard, pointer, and touch behavior.
* Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't

* Do not allow low-contrast text or hidden focus indicators.
* Do not introduce one-off spacing or typography exceptions di luar skala Plus Jakarta Sans yang sudah ditentukan.
* Do not use ambiguous labels or non-descriptive actions (misal: gunakan "Lihat Karya Tari" alih-alih hanya "Klik Sini").
* Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow

1. Restate design intent in one sentence (Menghadirkan pengalaman visual yang dramatis dan elegan untuk portofolio seni).
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior (Kartu Divisi, Modal Galeri, Form Rekrutmen).
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure

* Context and goals.
* Design tokens and foundations (Plus Jakarta Sans & Navy-Orange Palette).
* Component-level rules (anatomy, variants, states, responsive behavior).
* Accessibility requirements and testable acceptance criteria.
* Content and tone standards with examples.
* Anti-patterns and prohibited implementations.
* QA checklist.

## Component Rule Expectations

* Include keyboard, pointer, and touch behavior (dukungan swipe/touch untuk slider galeri di mobile).
* Include spacing and typography token requirements.
* Include long-content, overflow, and empty-state handling (misalnya tampilan saat belum ada event atau artikel blog yang dipublikasikan).
* Include known page component density: buttons (CTA Daftar/Kontak), links (Navigasi Divisi/Hashtag), lists (Jadwal Latihan), cards (Profil Pengurus), galleries (Portofolio Seni).

## Quality Gates

* Every non-negotiable rule must use "must".
* Every recommendation should use "should".
* Every accessibility rule must be testable in implementation.
* Teams should prefer system consistency over local visual exceptions.