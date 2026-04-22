---
title: 'Assistive Technology: Braille Displays'
description: "Part of the Assistive Technologies primer series, this looks at Braille displays"
created: "2026-02-16T08:35:00.000Z"
pubDate: "2026-02-23T10:30:00.000Z"
author: "Śūnya"
image:
    src: "./headers/crepuscule-sign.jpg"
    alt: "A concrete boat shape sunk in mud, overgrown with grass"
    aspectRatio: "16:9"
    width: 3968
    height: 2240
tags: ["Accessibility", "POUR", "Assistive Technology"]
---

## Introduction

This article is part of a series exploring the assistive technologies (ATs) that people with disabilities use to interact with digital content. Remember the maxim, "Nothing about us without us" — these articles are not a replacement for real users with real challenges, but rather a set of guidelines to help you think about accessibility in your designs.

Imagine experiencing a book or website through your fingertips. While screen readers convert text to something you can hear, braille displays convert it into something you can touch, feel, and linger over — giving blind and deafblind people a tactile connection to words that's fundamentally different from listening. For many it's not an alternative to screen readers, it's their preferred or only way to read.

## What is a Braille Display?

A braille display (also called a refreshable braille display) is an electro-mechanical device that raises and lowers pins to form braille characters dynamically. As the user reads or navigates content, the pins refresh to display new text — hence "refreshable".

Braille displays typically feature:

- **Braille cells**: Usually 12 to 80 cells, each containing 6 or 8 pins that form characters
- **Routing buttons**: Buttons above each cell to move the cursor to that position
- **Navigation keys**: Controls for scrolling, navigating, and interacting
- **Input capabilities**: Many include a braille keyboard for typing

### Who Uses Braille Displays?

Braille displays are primarily used by:

- **People who are blind and read braille**: Especially those who learned braille as their primary literacy medium
- **Deafblind individuals**: When hearing is also impaired, braille may be the only way to access text
- **People who prefer reading to listening**: Some find reading faster, more precise, or less fatiguing than audio
- **People in situations where audio isn't appropriate**: Professional settings, libraries, bedrooms, public transport
- **People learning braille**: Students and adults adding braille literacy

Braille literacy among blind people varies (estimates suggest 10-15% of blind Americans read braille), but for those who do, a braille display is transformative. It's the difference between hearing the word "their" and knowing whether it's spelled t-h-e-i-r or t-h-e-r-e. Controlled at the reader's own pace and imagination. Users can "scan read", making it faster, more accurate, and more comfortable than listening to synthetic speech for hours on end.

### Common Braille Displays

| Display | Cells | Features | Price Range |
| --------- | ------- | ---------- | ------------- |
| [Focus Blue](https://www.freedomscientific.com/products/blindness/) | 14, 40, 80 | Full-featured, perkins keyboard | £1,500-£6,000+ |
| [Brailliant](https://store.humanware.com/hus/brailliant-bi-40x-braille-display.html) | 14, 20, 32, 40 | Compact, versatile | £1,000-£3,500 |
| [Orbit Reader](https://www.orbitresearch.com/product/orbit-reader-20/) | 20 | Affordable, portable | ~£500 |
| [Mantis Q40](https://www.aph.org/product/mantis-q40/) | 40 | QWERTY keyboard + braille | £2,500+ |
| [Braille Edge](https://selvasblv.com/products/) | 40 | Perkins keyboard, notetaker | £2,500+ |

The cost of braille displays remains a significant barrier — consider needing to spend £1,500-£9,000 just to read the web the way you prefer. Many users rely on funding bodies, employers, or educational institutions to access this basic literacy tool, and for some, it simply remains out of reach.

## How Braille Displays Work

### Connection With Screen Readers

Braille displays work in conjunction with screen readers. The screen reader:

1. Interprets screen content
2. Sends text to the braille display
3. Receives input from the display's buttons and keyboard

**Common pairings:**

- JAWS + Focus/Brailliant displays
- NVDA + most USB or Bluetooth displays
- VoiceOver + many displays (Apple has excellent braille support)

Users can typically use speech and braille simultaneously, getting audio for overview and braille for detail.

### Converting Content to Braille

When content is sent to a braille display:

1. **Text characters** are converted to braille cells
2. **Grade 1 or Grade 2 braille** is used (Grade 2 uses contractions for common words)
3. **Spacing and formatting** are represented according to braille conventions
4. **Non-text content** (images, videos) is described or indicated by alt text

A 40-cell display can present about 40 characters at once — roughly half a sentence. Users scroll their fingers horizontally to read more, then advance and go back to the lines above and below as they construct the context and meaning from the text.

### Braille Grades

**Grade 1 (Uncontracted)**
Each letter corresponds to one braille cell. "The" = three cells.

**Grade 2 (Contracted)**
Uses contractions for common words and letter combinations. "The" = one cell (⠮). This is faster to read but requires learning additional symbols.

**Computer braille**
A standardised 8-dot system that can represent all 256 ASCII characters in a single cell, often used for programming and technical content.

### Navigation

Braille display users navigate using:

- **Panning keys**: Move left/right through the current line
- **Line navigation**: Move up/down between lines
- **Routing buttons**: Move cursor directly to a character
- **Object navigation**: Move between UI elements (like headings, buttons)
- **Input commands**: Keyboard shortcuts via the braille keyboard

Navigation with braille is often slower than listening to speech at high speed, but it offers greater precision and control, as well as reducing the linearity of the experience.

## What This Means for Understanding and Navigation

### Structural Communication

As highlighted in [accessibility techniques article](./accessibility-techniques.md), logical order and proper semantic HTML markup are essential. For braille display users, this extends to:

**Heading structure**: Users rely on headings to navigate efficiently. Proper heading levels (H1-H6) allow jumping between sections rather than reading everything linearly.

**Lists**: Properly marked lists are announced and presented with appropriate braille indicators. Fake lists (using lines of text with bullet characters) lose this semantic meaning.

**Tables**: Table structure is communicated through specific braille patterns and navigation. Proper use of `<th>` and `scope` allows users to understand relationships between cells.

**Images**: Braille displays use the alt text and other text alternatives. For example, a "bin" icon button - with a **good text alternative** ("Delete email address 1"), they immediately understand what it does; a missing or bad alt text, at best no idea, at worst, confused!

Decorative images should have empty alt (`alt=""`) and appropriate aria attribute (aria-hidden or `role="presentation"`) so braille users aren't interrupted by meaningless text.

### Linear Experience

Like screen reader users, braille display users experience content mostly linearly, but with differences. Braille users can easily pan backward to re-read a word, scan ahead for familiar letter patterns, and develop an almost spatial sense for where they are on their 40 or 80 cells. It's a bit like how touch-typists know where their fingers are on the keyboard without looking.

But that doesn't mean visual-only cues work. The "Add another" pattern from our techniques article? When that new field appears, if there's no text announcing it, the braille user has no way to know anything changed. Their fingers are still on the same cells, reading the same content. Changes must announce themselves.

1. **Use semantic HTML**: Headings, lists, tables, landmarks — all communicate structure to braille display users.

2. **Write quality alt text**: Be concise but meaningful. Describe function, not just appearance.

3. **Maintain proper heading hierarchy**: Skipping levels (H1 to H3) disrupts navigation and mental models.

### Things That Help

Rather than a prescriptive checklist, think about these principles as ways to make text clearer and more consistent for people reading character by character:

1. **Use semantic HTML**: When you properly mark up headings, lists, tables, and landmarks, braille users get special indicators that help them understand structure at a glance (or a touch). A heading isn't just bigger text — it's a navigational landmark.

2. **Write quality alt text**: When someone's fingers reach an image and all they get is "DSC_0847.jpg," that's not helpful. Describe what the image does or means, not just what it looks like. Be concise but meaningful.

3. **Maintain proper heading hierarchy**: Jumping from H1 to H3 is like skipping chapters in a book. Braille users rely on that structure to build mental maps and navigate efficiently.

4. **Mind your text quality**: That spelling error you might gloss over? A braille user experiences it letter by letter. Inconsistent punctuation, random formatting, extra spaces — all of it is tangible and distracting when you're reading with your fingers.

5. **Provide text equivalents for non-text content**: Icons, images, diagrams — if there's no text description, there's nothing for a braille display to show. The user's fingers just stop on blank cells.

6. **Use proper table markup**: Tables are complex enough to navigate by touch without having to guess which cells are headers. Proper `<th>` elements and scope attributes let users understand relationships between the data they're reading.

7. **Keep labels close to their controls**: When a label is far from its input field, braille users navigating linearly may lose the connection between them — especially on a 40-cell display showing half a sentence at a time.

8. **Consider downloadable formats**: For complex documents with intricate formatting or tables, offering a PDF or Word document might render more usefully in braille or braille notation software.

### Things That Hurt

Some patterns create real barriers that make content partially or completely inaccessible to braille users:

1. **Images of text**: When text is embedded in an image, braille displays have nothing to show. That inspirational quote in a fancy font? That screenshot of code? That chart with text labels? All invisible to braille unless you provide equivalent text.

2. **Visual formatting without semantic meaning**: Bold might look important, but unless you use `<strong>` or `<em>` to add semantic emphasis, braille displays may not convey the distinction. The visual formatting doesn't transfer to touch.

3. **Text that only works when spoken**: Abbreviations and shorthand that sound fine ("Dr." as "doctor") can be confusing in braille. Consider how text reads character by character, not just when synthesized into speech.

4. **Unicode symbols as functional elements**: Using ⬆, ✓, or ❌ as buttons or bullets might work visually, but they can render unpredictably in braille — sometimes as the symbol, sometimes as generic description text, sometimes as nothing.

5. **Assuming speech-only access**: It's common to test accessibility with a screen reader's speech output but never check the braille display. This means braille-specific issues — confusing abbreviations, odd spacing, nonsensical alt text — go unnoticed.

6. **Hidden text that's meant for screen readers**: Using `aria-label` or visually hidden text can create confusion when braille users expect to see something that sighted users see, but the braille output differs from the visual. Be careful about when you provide different text for different modalities

## Testing Your Interfaces

### Without a Braille Display

You can check many braille-relevant issues without actual hardware:

1. **Test with a screen reader**: NVDA or VoiceOver will show you the text that would be sent to braille
2. **Screen readers often have a "Braille Viewer"**: Shows simulated braille output on screen
3. **Check accessible names**: These become the braille text for interactive elements
4. **Review heading structure**: Browser extensions show heading hierarchy
5. **Verify alt text**: Inspect images to see what would be sent to braille

### Testing Checklist

- [ ] All images have appropriate alt text
- [ ] Heading structure is logical and hierarchical
- [ ] Lists are marked up properly
- [ ] Tables have headers and scope attributes
- [ ] No text is embedded in images
- [ ] Accessible names are concise and clear
- [ ] Content makes sense when read character by character
- [ ] Formatting conveys meaning semantically, not just visually

## Multi-Sensory Experience

People rarely fit neatly into single categories. Braille display users often have overlapping needs and switch between modalities depending on context. Many people listen to speech for quick overviews and switch to braille when they need precision — spelling a name, reading code, checking punctuation. Something like skimming versus close reading. Equally, some people with low vision use both a magnifier and a braille display, perhaps viewing visual layout while reading detailed text in braille. Some read in braille but type on a standard keyboard, or vice versa, depending on what's most efficient for the task.

In situations where sound isn't appropriate or possible — during meetings, in quiet spaces, on public transport — braille provides silent, private access to information.

This multi-modal usage reinforces a key point: interfaces should work consistently whether content is accessed via speech, braille, or visual display. When these modalities present contradictory information, users are left wondering which is correct.

## Further reading

- [W3C WAI: tools and techniques](https://www.w3.org/WAI/people-use-web/tools-techniques/)
- [WebAIM: Visual Disabilities - Braille](https://webaim.org/articles/visual/blind)
- [RNIB: reading and writing](https://www.rnib.org.uk/living-with-sight-loss/assistive-aids-and-technology/reading-and-writing/)
- [NVDA User Guide: Braille](https://www.nvaccess.org/files/nvda/documentation/userGuide.html#Braille)
- [Apple: Braille Displays and VoiceOver](https://support.apple.com/en-gb/guide/voiceover/welcome/mac)
- [UEB Online: Unified English Braille](https://www.uebonline.org/)
- [My article on eye trackers](./at-eye-trackers.md)
- [My article on keyboard navigation](./at-keyboard-navigation.md)
- [My article on screen readers](./at-screen-readers.md)
- [My article on screen magnifiers](./at-screen-magnifiers.md)
- [My article on switch access](./at-switch-access.md)
- [My article on voice control](./at-voice-control.md)
