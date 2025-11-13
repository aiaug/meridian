# Particle Zen Garden 🌸

**Neo-Tokyo Night Edition**

An interactive particle canvas application with cyberpunk aesthetics. Create mesmerizing neon particle patterns with multiple brush types and color palettes.

Built to showcase Meridian's project management and task workflow capabilities.

---

## Features

### 🎨 Multiple Brush Types
- **Flowing Trails** (∼) - Smooth following particles with elegant trails
- **Fireflies** (✦) - Glowing orbs with organic drift behavior
- **Neon Streaks** (⟿) - Speed-responsive trails with motion blur
- **Sakura Petals** (❀) - Physics-based falling particles with rotation

### 🌈 Color Palettes
- **Classic Neon** - Hot pink, electric blue, cyan
- **Vaporwave** - Purple, pink, cyan gradients
- **Matrix** - Neon green variations
- **Synthwave** - Purple, pink, orange
- **Ice** - Cool blues and whites
- **Ember** - Warm oranges and yellows

### ⚡ Keyboard Shortcuts
- `1-4` - Switch brush types
- `P` - Cycle through color palettes
- `C` - Clear canvas

### 💾 Persistent Preferences
Your last selected brush and palette are automatically saved to localStorage.

---

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Strict mode enabled
- **Tailwind CSS** - Utility-first styling
- **HTML Canvas API** - High-performance particle rendering

---

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## Project Structure

```
/app
  page.tsx              # Main page with state and keyboard handlers
  layout.tsx            # Root layout
  globals.css           # Global styles and Orbitron font

/components
  Canvas.tsx            # Canvas component with render loop
  BrushSelector.tsx     # Brush type picker UI
  PaletteSelector.tsx   # Color palette picker UI
  Controls.tsx          # Main control panel

/lib
  particles.ts          # Particle system and brush logic
  palettes.ts           # Color palette definitions
  types.ts              # TypeScript interfaces
```

---

## Design Philosophy

### Neo-Tokyo Night Aesthetic
- **Color Scheme**: Deep purple-black background (#0a0a0f) with vibrant neon accents
- **Typography**: Orbitron for headings (futuristic, geometric), system sans for UI
- **Visual Effects**: Neon glow effects, glowing borders, smooth animations
- **Inspiration**: Cyberpunk, Tokyo nightlife, retro-futurism

### Performance
- Particle limit: 5000 max (automatic cleanup)
- 60fps target with `requestAnimationFrame`
- Canvas fade effect for trail persistence
- Optimized rendering with shadow/glow effects

---

## Meridian Integration

This project was built using the Meridian task management system:

- **Task Brief**: `.meridian/tasks/TASK-001/TASK-001.yaml`
- **Approved Plan**: `.meridian/tasks/TASK-001/TASK-001-plan.md`
- **Development Log**: `.meridian/tasks/TASK-001/TASK-001-context.md`
- **Code Guidelines**: `.meridian/CODE_GUIDE.md` + `.meridian/CODE_GUIDE_ADDON_HACKATHON.md`

---

## Future Enhancements

Potential features for future versions:

- [ ] Save/share patterns via URL encoding
- [ ] Audio feedback (ambient sounds responding to interactions)
- [ ] Additional brush types (constellations, lightning, water ripples)
- [ ] Background patterns and textures
- [ ] Reduce motion accessibility option
- [ ] Performance mode for lower-end devices
- [ ] Export canvas as image
- [ ] Custom palette creator

---

## License

MIT

---

**Made with ⚡ using Meridian task management**
