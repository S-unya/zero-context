---
title: "Assistive Technology: Screen Readers"
description: "Part of the Assistive Technologies primer series, this looks at screen readers"
created: "2026-02-17T08:35:00.000Z"
pubDate: "2026-02-23T10:30:00.000Z"
author: "Śūnya"
image:
    src: "./headers/crepuscular-path.jpg"
    alt: "An arched, stone tunnel in a forest"
    aspectRatio: "16:9"
    width: 3968
    height: 2240
tags: ["Accessibility", "POUR", "Assistive Technology"]
---

## Introduction

This article is part of a series exploring how people with disabilities actually interact with digital content. Remember the maxim, "Nothing about us without us" — these articles aren't a substitute for learning from real users with real challenges, but they can help you start thinking more deeply about accessibility.

If you've ever watched a screen reader user, you've probably been struck by how fast the synthesised voice speaks — almost incomprehensibly fast to the untrained ear. That speed isn't showing off; it's necessity. Screen reader users have trained themselves to process audio at rates that would give most of us headaches because navigating by ear is simply slower than navigating by eye. Every inefficiency in your interface compounds.

## What is a Screen Reader?

A screen reader is software that translates visual interfaces into audio (synthesised speech) or tactile output (braille displays). For someone who is blind, has low vision, or has certain cognitive or learning disabilities, it's how they experience the digital world.

But it's worth understanding what a screen reader actually does. It's not simply reading text aloud — though that's part of it. A screen reader interprets the *structure* of a page: "Heading level 2, Navigation, list with 5 items, link, Home." It announces what things *are*, not just what they say. It provides dozens of commands for jumping between headings, landmarks, links, form fields, and tables — because listening through an entire page linearly would be unbearable.

This means screen readers are heavily dependent on what you, as a designer or developer, tell them about your interface. Properly structured, semantic HTML makes a page navigable. Missing or incorrect semantics make it a maze.

### Common Screen Readers

| Screen Reader | Platform | Cost |
| --------------- | ---------- | ------ |
| [JAWS (Job Access With Speech)](https://www.freedomscientific.com/products/software/jaws/) | Windows | Paid (subscription or perpetual license) |
| [NVDA (NonVisual Desktop Access)](https://www.nvaccess.org/) | Windows | Free, open source |
| [VoiceOver](https://www.apple.com/accessibility/vision/) | macOS, iOS, iPadOS | Built-in, free |
| [TalkBack](https://support.google.com/accessibility/android/answer/6283677) | Android | Built-in, free |
| [Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1) | Windows | Built-in, free |
| [Orca](https://wiki.gnome.org/Projects/Orca) | Linux (GNOME) | Free, open source |

## How Screen Readers Are Used

### Two Modes of Interaction

Screen readers typically switch between two modes, and understanding this helps explain some otherwise puzzling behaviours:

**Browse mode** (sometimes called virtual mode) is for reading and navigating. The screen reader builds a virtual representation of the page, and users move through it using arrow keys and shortcuts. Press H to jump to the next heading. Press K to jump to the next link. Press D for the next landmark. The user is exploring *your model* of the page. On touchscreen devices, the user can also run their finger over the screen, and the reader will announce what is below their finger.

**Forms mode** (sometimes called focus mode) is for interacting. When users enter a text field or interact with a custom widget, keystrokes need to go to the application rather than being interpreted as navigation commands. The screen reader steps back and lets the browser handle input.

The switch between modes can be automatic or manual, depending on the screen reader and user preferences. But the key insight is this: in browse mode, users experience your page as a stream of announced content. In forms mode, they're trusting that the interactive elements work correctly.

### How Users Actually Navigate

Experienced screen reader users rarely listen to a page from start to finish. That would be like reading a newspaper by starting at the top-left corner and reading every word to the bottom-right. Instead, they navigate strategically:

- **Heading navigation**: Pressing H to jump between headings, quickly scanning the page structure. This is why heading hierarchy matters so much — headings are the primary navigation mechanism.
- **Landmark navigation**: Jumping between semantic regions (header, main, nav, footer) to orient themselves.
- **Element-specific shortcuts**: Moving directly to links, buttons, form fields, tables, or lists.
- **Search**: Finding specific text when they know what they're looking for.
- **Linear reading**: Used selectively, for content that needs to be read carefully.

If your page structure is logical, users can find what they need efficiently. If it's not — if headings skip levels, or there are no landmarks, or interactive elements lack accessible names — every task becomes a trudge through irrelevant content.

### Common Keyboard Shortcuts (NVDA/JAWS)

| Action | NVDA | JAWS |
| -------- | ------ | ------ |
| Start reading | Insert + Down Arrow | Insert + Down Arrow |
| Stop reading | Ctrl | Ctrl |
| Next heading | H | H |
| Previous heading | Shift + H | Shift + H |
| List all headings | Insert + F7 | Insert + F6 |
| Next link | K | Tab (unvisited) |
| Next button | B | B |
| Next form field | F | F |
| Next landmark | D | R |

## What This Means for Design and Development

### The Loss of Visual Context

Sighted users have enormous contextual advantages they rarely think about. You can see what's near something, what colour it is, whether it's prominent or subtle, where it sits in the layout. You can glance at a page and understand its structure in a second.

Screen reader users experience content in sequence — one element at a time, announced by synthesised speech. They can't see that a delete button sits next to a specific email field; they can only hear what the button is called. They can't see that an error message appeared in red at the top of the form; they only know about it if it's announced.

This makes two things critical: **logical order** and **explicit context**.

Content must be arranged so that each element makes sense when you encounter it — not when you can see the whole page at once. If a heading comes *after* some of the content it labels, sighted users will connect them visually. Screen reader users will hear the content first, without context, then hear the heading.

Consider the ["Add another" pattern](./accessibility-techniques.md): when a user activates a button to add a new field, where does focus go? If it stays on the button, the user might not realise anything happened — the new field exists, but they have no way of knowing. If focus moves to the new field, is there enough context for them to understand what just changed? These aren't edge cases; they're the central questions of accessible interaction design.

### Naming is Everything

Screen reader users can't see your interface — they hear what you've told the browser about it through semantic HTML and appropriate labelling. Every interactive element needs an accessible name that:

- Clearly describes its purpose
- Works without visual context (no "click here" or "this")
- Matches the visible label (for [voice control users](./at-voice-control.md) who also rely on these names)

A bin icon might be visually obvious, but to a screen reader user it's just "button" unless you've provided a name like "Delete email address 1." Without that name, the user knows something is there and can be clicked — but not what it does.

### When Content Changes

Static pages are relatively straightforward. The real challenges emerge when content updates dynamically — and that's most modern interfaces.

Screen reader users can't see a new field appearing, an error message flashing, or a status updating. They need to be told. This happens through:

- **Live regions**: Page areas that automatically announce when their content changes. Use sparingly — too many announcements are overwhelming.
- **Focus management**: Moving focus to new content, which naturally prompts the screen reader to announce it.
- **Status roles**: Using `role="status"` or `role="alert"` for transient messages.

The balance is delicate. Not enough announcements leaves users unaware of changes. Too many creates a cacophony of competing voices. Think about what a user *needs* to know, and tell them that — no more.

## Practical Guidance

### What Works

1. **Semantic HTML**: Headings, lists, buttons, links, and landmarks aren't just good practice — they're the navigation infrastructure screen reader users depend on. A page of `<div>` elements with click handlers is a featureless plain.

2. **Accessible names for everything interactive**: Every button, link, and form field needs a programmatic name. Use `<label>`, `aria-label`, `aria-labelledby`, or visible text content — but make sure something is there.

3. **Logical reading order**: The DOM order should match the visual order **and** provide context as elements are encountered. CSS can rearrange visuals, but screen readers follow the DOM.

4. **Thoughtful focus management**: When users trigger changes, move focus to where they need to be. Don't leave them stranded at a button after its action has moved the action elsewhere.

5. **Judicious announcements**: Use live regions for genuinely important updates, but recognise that every announcement competes for attention. Users can only process so much audio.

6. **Real testing with real screen readers**: Automated tools catch structural problems, but they can't tell you what the experience actually feels like. Spend time with NVDA, VoiceOver, or JAWS.

### What Breaks Things

1. **Relying on visual proximity**: If something visually appears connected — some text near a field, a delete button next to its item — that connection needs to be programmatic too. Screen readers can't see proximity.

2. **Empty or missing names**: A button with no text, no aria-label, and no accessible name is announced as "button." The user knows something is there but has no idea what it does.

3. **Breaking keyboard patterns**: Screen readers rely on keyboard interaction. If something looks like a button but isn't focusable, or doesn't respond to Enter/Space, it's broken for screen reader users.

4. **Hiding content incorrectly**: If you need content for screen reader users but not sighted users, use `.visually-hidden` classes — not `display: none` or `visibility: hidden`, which hide from everyone.

5. **Silent dynamic changes**: When content updates without announcement or focus change, screen reader users simply don't know. That new error message, that added field, that changed status — invisible to them.

## Testing Your Interfaces

### Try It Yourself

The most valuable thing you can do is actually use a screen reader. It's uncomfortable at first — the interface suddenly feels alien, the speech is disorienting, and tasks that take seconds with a mouse take minutes. That discomfort is instructive.

NVDA is free and runs on Windows. VoiceOver is built into every Mac, iPhone, and iPad. Turn one on and try to complete a real task on your interface. Don't cheat by looking at the screen while you do it — that defeats the purpose.

### Quick Testing Checklist

- [ ] Can you navigate all interactive elements using only the keyboard?
- [ ] Do all form fields have visible, associated labels?
- [ ] Is the heading structure logical and hierarchical?
- [ ] Do images have appropriate alt text (or are decorative images hidden)?
- [ ] Are error messages announced when they appear?
- [ ] Does focus move logically after interactions?
- [ ] Are ARIA live regions used appropriately for dynamic updates?

If you're frustrated after a few minutes, pay attention to that frustration. It's a small sample of what daily users experience — and a signal that something needs work.

### Resources for Testing

- [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)
- [VoiceOver Getting Started Guide](https://support.apple.com/en-gb/guide/voiceover/welcome/mac)
- [Deque University Screen Reader Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/)
- [WebAIM Screen Reader User Survey](https://webaim.org/projects/screenreadersurvey10/)

## Further Reading and Citations

- [W3C WAI: How People with Disabilities Use the Web](https://www.w3.org/WAI/people-use-web/)
- [WebAIM: Designing for Screen Reader Compatibility](https://webaim.org/techniques/screenreader/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Léonie Watson: The difference between keyboard navigation and screen readers](https://tink.uk/the-difference-between-keyboard-and-screen-reader-navigation/)
- [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [My article on braille displays](./at-braille-displays.md)
- [My article on eye trackers](./at-eye-trackers.md)
- [My article on keyboard navigation](./at-keyboard-navigation.md)
- [My article on screen magnifiers](./at-screen-magnifiers.md)
- [My article on switch access](./at-switch-access.md)
- [My article on voice control](./at-voice-control.md)
