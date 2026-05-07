---
name: Clinical Minimalism
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  h1:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
  gutter: 1.5rem
  margin: 2rem
---

## Brand & Style

This design system is built on the principles of **Clinical Minimalism**. It prioritizes clarity, efficiency, and emotional calm to serve both patients and healthcare providers. The brand personality is professional and authoritative yet remains approachable through soft geometry and generous whitespace. 

By utilizing a "less lines" philosophy, the interface reduces cognitive load, allowing users to focus on critical health data without visual noise. The aesthetic draws from modern corporate reliability but softens the edges to create a welcoming, trustworthy digital environment.

## Colors

The palette is rooted in medical semiotics. **Medik Blue** serves as the primary action color, signaling intelligence and stability. **Care Teal** is used for secondary actions, health indicators, and success states, evoking a sense of wellness and healing. 

**Hospital White** provides a sterile, high-clarity canvas that ensures the interface feels breathable. Typography is set in **Clinical Slate** to ensure maximum legibility and WCAG AA/AAA compliance against the light background.

## Typography

The design system utilizes **Inter** for all applications. It is chosen for its exceptional tall x-height and numerical clarity, which are vital for reading medical dosages and appointment times. 

A strict hierarchical scale ensures that patient information is scannable. Headlines use a tighter letter-spacing and heavier weights to anchor sections, while body text maintains a generous line-height to prevent eye fatigue during long reading sessions.

## Layout & Spacing

This design system employs a **fixed grid model** for desktop (12 columns) and a fluid model for mobile. The spacing philosophy is based on a 4px baseline grid to ensure mathematical harmony across all components.

Layouts should favor "negative space" to separate information groups rather than physical dividers. Margins are intentionally wide to center the user’s focus on the content, creating an efficient and uncluttered user journey.

## Elevation & Depth

To achieve the "less lines" objective, this design system replaces heavy borders with **ambient shadows**. Depth is used purposefully to indicate interactivity and hierarchy.

- **Level 0 (Surface):** The background layer, used for the main canvas.
- **Level 1 (Card):** Soft, diffused shadows (0px 4px 20px rgba(30, 41, 59, 0.05)) used for primary content containers.
- **Level 2 (Interaction):** Slightly deeper shadows used for hovered states or dropdown menus.
- **Focus States:** High-contrast 3px solid rings in Medik Blue with a 2px offset are required for all keyboard navigation, ensuring the system meets global accessibility standards.

## Shapes

The shape language is defined by a **Rounded** aesthetic. A baseline radius of 8px (0.5rem) is applied to standard components like buttons and input fields, while larger containers like cards utilize 16px (1rem). 

These rounded corners soften the clinical nature of the product, making the software feel more "human" and less institutional, while still maintaining a professional structure.

## Components

### Buttons
Primary buttons use a solid Medik Blue fill with white text. Secondary buttons utilize a Care Teal ghost style or subtle grey fill. All buttons feature 8px rounded corners and a subtle transition on hover.

### Cards
Cards are the primary container. They must have no borders, utilizing the Level 1 ambient shadow for definition. Padding inside cards should be generous (min 24px) to maintain the minimalist feel.

### Input Fields
Inputs use a soft Hospital White background that is slightly darker than the main surface to create a "well" effect. Borders are avoided unless the field is in an error state (using a soft red) or a focus state.

### Lists & Data
Medical data lists should use alternating row backgrounds (zebra striping) at very low opacity instead of horizontal lines to maintain the "less lines" aesthetic.

### Accessibility (A11Y)
All interactive elements must include a high-contrast focus ring. Icons should always be accompanied by text labels or ARIA descriptions to ensure the system is navigable by all users regardless of ability.