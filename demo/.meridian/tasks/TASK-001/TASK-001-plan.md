# Implementation Plan  TASK-001
**Approved:** 2025-11-12
**Status:** Approved by user

---

## Particle Zen Garden - Neo-Tokyo Night Edition

### What We're Building
Interactive canvas app where mouse/touch creates flowing neon particle trails with cyberpunk aesthetics.

### Tech Stack
- Next.js 14 App Router + TypeScript (strict)
- Tailwind CSS for UI controls
- HTML Canvas API for particle rendering
- Local storage for user preferences

### Features

#### 1. Multiple Brush Types
- **Flowing Trails**: Smooth following particles with trail effect
- **Fireflies**: Glowing orbs with random drift behavior
- **Neon Streaks**: Speed-based trails that respond to cursor velocity
- **Sakura Petals**: Physics-based falling particles with rotation

#### 2. Color Palette Presets
- **Classic Neon**: Hot pink + electric blue + cyan
- **Vaporwave**: Purple + pink + cyan gradients
- **Matrix**: Neon green variations
- **Synthwave**: Purple + pink + orange
- Monochrome variants

### Visual Design (Neo-Tokyo Night)
- Deep purple-black background (#0a0a0f)
- Futuristic fonts (Orbitron for headings, clean sans for UI)
- Neon glow effects on particles and active controls
- Cyberpunk-inspired UI with glowing borders
- Smooth motion with custom easing

### Implementation Steps

1. **Initialize Project**
   - Set up Next.js with TypeScript + Tailwind
   - Configure custom fonts (Orbitron)
   - Set up project structure

2. **Build Core Particle System**
   - Create Canvas component with full viewport sizing
   - Implement particle class with position, velocity, lifecycle
   - Set up render loop with requestAnimationFrame
   - Add mouse/touch event handlers

3. **Implement 4 Brush Types**
   - Create brush behavior system
   - Flowing Trails: particles follow cursor with interpolation
   - Fireflies: add random drift and glow
   - Neon Streaks: calculate velocity for streak length
   - Sakura Petals: add gravity, rotation, gentle sway

4. **Create Color Palette System**
   - Define palette interface and presets
   - Build PaletteSelector component
   - Implement palette application to particles
   - Add localStorage persistence

5. **Build Control Panel**
   - BrushSelector with icons/previews
   - PaletteSelector with color swatches
   - Clear button
   - Settings panel (particle count, fade speed)
   - Apply Neo-Tokyo styling (glows, borders)

6. **Add Polish & Features**
   - Keyboard shortcuts (C, 1-4, P)
   - Smooth UI animations
   - Particle glow effects matching palette
   - Mobile touch optimization
   - localStorage for user preferences

7. **Testing & Documentation**
   - Test all brushes and palettes
   - Verify performance (60fps target)
   - Test keyboard shortcuts
   - Mobile touch testing
   - Update README with features and shortcuts

### Project Structure
```
/app
  page.tsx              # Main page with canvas
/components
  Canvas.tsx            # Canvas component with render loop
  BrushSelector.tsx     # Brush type picker
  PaletteSelector.tsx   # Color palette picker
  Controls.tsx          # Control panel wrapper
/lib
  particles.ts          # Particle system and brush logic
  palettes.ts           # Color palette definitions
  types.ts              # TypeScript interfaces
/tailwind.config.ts     # Custom theme for Neo-Tokyo aesthetic
```

### Success Criteria
-  Smooth 60fps particle rendering
-  All 4 brush types working with distinct behaviors
-  Color palette switching with persistence
-  Keyboard shortcuts functional
-  Mobile touch support
-  Neo-Tokyo cyberpunk aesthetic achieved
-  Build passes typecheck and lint

---

**Plan approved and frozen. Changes require user approval.**
