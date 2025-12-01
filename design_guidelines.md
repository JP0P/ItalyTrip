# Italy Trip Countdown Website - Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from Airbnb's vibrant travel aesthetic combined with playful countdown interfaces like New Year's celebration sites. This is a celebration page that should evoke excitement and wanderlust.

## Layout Structure

**Single-Page Experience** with three main sections:

1. **Hero Section (80vh)**
   - Full-width background image of iconic Italian scenery (Amalfi Coast, Tuscan countryside, or Roman architecture at golden hour)
   - Centered countdown display overlaying the image
   - Subtle animated elements (floating Italian-themed icons: pizza, vespa, coffee cup)

2. **Trip Details Section (natural height, py-20)**
   - Two-column grid (lg:grid-cols-2, single column on mobile)
   - Left: "Why Italy?" content with travel highlights
   - Right: Journey snapshot with key destinations

3. **Footer Section (py-12)**
   - Compact footer with departure info and travel tips

## Typography Hierarchy

**Font Selection**: Google Fonts
- Display: Playfair Display (700) - elegant, travel-magazine feel for countdown numbers
- Body: Inter (400, 600) - clean, modern for supporting text

**Type Scale**:
- Countdown numbers: text-8xl to text-9xl (responsive)
- Countdown labels: text-sm uppercase tracking-wide
- Section headings: text-4xl font-semibold
- Body text: text-lg leading-relaxed
- Small details: text-sm

## Spacing System

**Tailwind Units**: Consistently use 4, 8, 12, 16, 20, 24, 32
- Component spacing: space-y-8
- Section padding: py-20 desktop, py-12 mobile
- Card padding: p-8
- Element gaps: gap-4 or gap-8

## Component Library

### Countdown Display
- Four-unit grid (days, hours, minutes, seconds)
- Each unit: Large number above, small label below
- Glass-morphism effect: backdrop-blur-md with semi-transparent background
- Rounded-3xl containers with subtle shadow
- Animated number flip transitions (CSS transforms)

### Content Cards
- Rounded-2xl with subtle elevation
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Icon + heading + description structure
- Consistent padding p-8

### Interactive Elements
- Hero CTA button: Large (px-8 py-4), blurred background (backdrop-blur-sm bg-white/20)
- No hover states needed (as per constraint)
- Rounded-full for buttons

### Icons
- Heroicons via CDN (outline style)
- Size: w-8 h-8 for feature icons, w-6 h-6 for inline icons

## Images

**Primary Hero Image**: 
- Full-width, full-height (80vh) background image
- Italian landscape - vibrant, aspirational (sunset over Positano, Tuscan vineyards, or Venice canals)
- Slight darkening overlay (bg-black/20) for text legibility

**Supporting Images**: 
- 2-3 smaller images in trip details section (Italian food, landmarks, culture)
- Square or 3:2 aspect ratio, rounded-xl
- w-full h-64 object-cover

## Animations

**Minimal & Purposeful**:
- Countdown numbers: Smooth transition on update (transition-all duration-300)
- Floating icons: Subtle drift animation (translate-y, 3-4 second loop)
- Page load: Gentle fade-in for main elements (opacity transition)
- NO scroll-triggered animations, NO carousel effects

## Layout Behavior

**Responsive Breakpoints**:
- Mobile (base): Stack all content, countdown 2x2 grid
- Tablet (md): Begin multi-column layouts
- Desktop (lg): Full multi-column experience

**Vertical Rhythm**:
- Consistent section spacing with py-20
- Breathing room between components with space-y-8
- Max-width containers: max-w-7xl mx-auto px-4

## Accessibility
- Semantic HTML throughout
- ARIA labels for countdown units
- Sufficient contrast on overlay text
- Focus states on interactive elements (ring-2 ring-offset-2)

## Special Features

**Countdown Logic**:
- Real-time JavaScript countdown to May 12, 2026
- Update every second
- Show celebratory message when date arrives ("Buon Viaggio!")

**Italian Theme Integration**:
- Decorative Italian flag stripe element (thin horizontal bar with three sections)
- Italian phrases sprinkled throughout ("Ciao!", "Andiamo!", "Bellissimo!")
- Food and culture iconography

This is a joyful, anticipation-building experience that makes the wait exciting!