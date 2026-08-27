# Calm Scroll visual thesis

## Direction: neo-brutalist motion utility

Calm Scroll should feel like a physical emergency stop for a restless page: immediate, inspectable, and trustworthy. The interface borrows the blunt labeling, exposed fasteners, and hard boundaries of an industrial control panel, then tempers them with an off-white reading surface and a quiet blue “stable” state. It avoids both wellness pastels and generic accessibility-dashboard polish. Decoration only explains detection, intervention, or the contrast between a noisy page and a steady one.

## Palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| Paper | `#F6F2E8` | `#171918` | page background |
| Panel | `#FFFDF7` | `#242725` | raised controls |
| Ink | `#171918` | `#F8F4EA` | primary text and hard rules |
| Muted ink | `#555751` | `#C4C7C0` | supporting copy |
| Stop yellow | `#FFD447` | `#FFD447` | primary action and inspection labels |
| Stable blue | `#155EEF` | `#7BA4FF` | enabled state and focus |
| Safe green | `#137A4B` | `#69D49D` | successful freeze state |
| Caution orange | `#B54708` | `#FFB36B` | partial or unsupported states |
| Fault red | `#B42318` | `#FF8A80` | errors only |

All text/background pairs meet WCAG AA; state is always named and never communicated by color alone. The site follows the operating-system light/dark preference. The extension popup is deliberately light-only so its safety-label colors stay consistent across browser chrome; its background is explicitly painted.

## Type and spacing

Headlines and control labels use the local system grotesk stack (`Arial Black`, `Arial`, sans-serif): blunt, compact, and available without a font request. Reading copy uses `Georgia`, `Times New Roman`, serif for calmer long-form scanning. Interface metadata uses the system monospace stack. The scale is 14 / 16 / 20 / 28 / 48 / 72px, with body text never below 16px on the site. Spacing follows a 4px base: 4, 8, 12, 16, 24, 32, 48, 64.

## Layout and interaction grammar

- Thick 2–3px rules are functional boundaries, not decorative card borders.
- Controls are square-cornered with an offset hard shadow that collapses on press.
- A diagonal hatch means “motion detected”; a solid blue field means “stable now.”
- The primary popup control is a large physical toggle with a sentence describing its current outcome.
- Motion sources are reported as plain counts—autoplay media, animated elements, fixed/sticky layers—so the intervention remains inspectable.
- On phones the page drops the side annotations and stacks the before/after illustration below the promise. There are no fixed bars.

## Motion policy

The product removes motion rather than showcasing it. UI feedback uses only a 120ms press translation and a 160ms color change. There are no entrance animations, looping effects, smooth scrolling, parallax, or auto-advance. Under `prefers-reduced-motion: reduce`, all transitions are removed. The extension’s injected stable mode disables CSS transitions, animations, smooth scrolling, scroll snap, parallax-like transforms, and autoplay where safely possible.

## Original asset plan and provenance

The hero is a single editorial cutaway of a browser page clamped into a stable reading frame, with loose animated layers on the left and aligned text strips on the right. It is explanatory rather than atmospheric. Interface icons are hand-authored SVG/CSS geometric marks; the generated raster is not used as an icon or proof of capability.

**Prompt sheet**

- Subject: a web page being mechanically steadied inside a browser-like reading frame; restless layered panels at left become aligned, still paper strips at right.
- World/materials: neo-brutalist editorial illustration, cut paper, black registration marks, steel clips, printed halftone texture.
- Light/lens: flat studio light, orthographic three-quarter view, crisp edges, generous negative space.
- Palette words: warm newsprint, carbon black, safety yellow, signal blue, restrained green.
- Negative list: people, faces, medical symbols, logos, brands, readable text, gradients, glassmorphism, glossy 3D, watermark, illegible pseudo-type.

**Generation record**

- Tool/model: Factory Azure image deployment via `/opt/fleet/lib/gen-image.sh` (`factory-image`).
- Date: 2026-08-27.
- Intended file: `assets/src/calm-scroll-hero.png`, optimized to responsive WebP/AVIF in the site public assets.
- License/provenance: original AI-generated asset commissioned for Calm Scroll; no source image or third-party artwork used.
- Final prompt: “Neo-brutalist editorial cut-paper illustration for a browser accessibility extension. An abstract web page is held steady inside a stout black reading frame. On the left, three loose page layers and offset blocks suggest parallax and motion; they pass through a safety-yellow mechanical clamp; on the right they become aligned, quiet warm-white paper strips with crisp black rules and one signal-blue control block. Flat studio light, orthographic three-quarter composition, coarse printed halftone and tactile paper fibers, high contrast, warm newsprint background, carbon black, safety yellow, signal blue, tiny restrained green accents, large clear shapes, no people, no faces, no medical symbols, no browser or company logos, no readable text, no letters, no watermark, no gradients, no glossy 3D, no glassmorphism.”

