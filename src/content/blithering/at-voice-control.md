---
title: "Assistive Technology: Voice Control"
description: "Part of the Assistive Technologies primer series, this looks at voice control"
created: "2026-02-18T08:35:00.000Z"
pubDate: "2026-02-23T10:30:00.000Z"
author: "Śūnya"
image:
    src: "./headers/stairs-inside.jpg"
    alt: "Wooden stairs in shadow"
    aspectRatio: "16:9"
    width: 3968
    height: 2240
tags: ["Accessibility", "POUR", "ATs", "Assistive Technology", "voice control"]
---

## Introduction

This article is part of a series exploring how people with disabilities actually interact with digital content. Remember the maxim, "Nothing about us without us" — these articles aren't a substitute for learning from real users with real challenges, but they can help you start thinking more deeply about accessibility.

Imagine using your voice to do everything your hands normally do on a computer. "Click Submit." "Scroll down." "Type: Hello, how are you." For most people, this sounds futuristic or maybe hugely frustrating. For someone who can't use a mouse or keyboard — whether due to paralysis, severe RSI, or a condition like ALS — their voice might be the only bridge between them and the digital world.

## What is Voice Control?

Voice control software lets people operate their devices entirely through spoken commands. At its simplest, you speak and the computer listens: "Click Submit," "Scroll down," "Open Chrome." But modern voice control is far more sophisticated than that — it handles natural language, understands context, and can follow complex multi-step instructions.

The capabilities are genuinely useful:

- **Navigate interfaces**: "Click Submit", "Go to Settings", "Scroll down"
- **Activate controls**: "Press button", "Check the checkbox"
- **Dictate text**: Speaking naturally to enter text into fields
- **Issue system commands**: "Open Chrome", "Close window"
- **Grid navigation**: An overlay system to interact with less accessible UI by specifying coordinates

When it works well, voice control feels almost magical. When it doesn't — when buttons can't be targeted, when names don't match what's visible — the experience becomes exhausting.

### Who Uses Voice Control?

The range of people who rely on voice control is broader than you might expect:

- **People with motor disabilities**: Conditions affecting hands, arms, or fine motor control — RSI, carpal tunnel, paralysis, muscular dystrophy, ALS/MND. For many, a traditional mouse and keyboard simply aren't an option.
- **People with temporary injuries**: A broken wrist, post-surgery recovery, or a flare-up of chronic pain can make anyone a voice control user overnight.
- **People who find typing difficult**: Various conditions affecting manual dexterity make sustained keyboard use painful or impossible.
- **People with cognitive disabilities**: Some find speaking easier than typing — the translation from thought to text is more direct.
- **People with situational limitations**: Hands full, wearing gloves, or other circumstances where voice becomes the practical choice.

For someone with limited or no hand function, voice may be their only way to use a computer. That's worth sitting with for a moment. Every interactive element that doesn't work with voice control is an interactive element they cannot use.

### Common Voice Control Software

| Software | Platform | Cost |
| ---------- | ---------- | ------ |
| [Dragon NaturallySpeaking](https://www.nuance.com/dragon.html) | Windows, Mac | Paid |
| [Voice Control](https://support.apple.com/en-gb/guide/mac-help/mh40584/mac) | macOS, iOS (built-in) | Free |
| [Voice Access](https://support.google.com/accessibility/android/answer/6151848) | Android (built-in) | Free |
| [Windows Speech Recognition](https://support.microsoft.com/en-us/windows/use-voice-recognition-in-windows-83ff75bd-63eb-0b6c-18d4-6fae94050571) | Windows (built-in) | Free |
| [Windows Voice Access](https://support.microsoft.com/en-us/topic/get-started-with-voice-access-bd2aa2dc-46c2-486c-93ae-3d75f7d053a4) | Windows 11 | Free |
| [Talon Voice](https://talonvoice.com/) | Windows, macOS, Linux | Free (donations) |

Dragon NaturallySpeaking remains the industry standard for power users, though the built-in options on major operating systems have improved dramatically in recent years. Talon Voice has developed a devoted following in the programming community, where developers have used it to write code entirely by voice.

## How Voice Control Works

### Command Types

Voice control typically offers several ways to interact with a page, ranging from efficient to complex "Blade runner" style grid manipulation:

**Direct commands** are the fastest and most intuitive. Users simply speak the visible label: "Click Save," "Press Submit button," "Select File menu." When this works, voice control feels seamless. The user sees what they want, says its name, and it happens.

**Numbered overlays** come into play when direct commands fail. The software displays numbers next to every interactive element — say "Show numbers" and all "interactives" gain numbered badges. Users then speak a number: "5" clicks element number 5. It works, but it's slower, more cognitive load, and reveals that something about the interface isn't quite voice-friendly.

**Grid navigation** is the fallback when even numbered overlays don't help. A numbered grid overlays the entire screen, and users specify coordinates: "Grid," then "4, 5" to select a particular cell. It's precise but tedious — the voice control equivalent of using a magnifying glass to read fine print.

**Dictation** handles text entry. Users speak naturally, adding punctuation verbally: "Hello comma my name is John period." "Capital Paris." Modern systems handle this remarkably well, but unusual or technical terms, speech impediments and strong accents can throw things out.

### Recognition and Context

Modern voice control systems are quite sophisticated. They understand context ("Delete that" removes the last thing entered), corrections ("Correct [word]" or "Select [word]"), navigation ("Go to end of line"), and formatting ("Bold that", "New paragraph"). The technology has come a long way and in the right circumstances be as fast, or faster than mouse and keyboard.

### What Happens When Someone Says "Click Submit"

Understanding the typical interaction flow helps explain why certain accessibility practices matter so much:

1. A user sees a form with a "Submit" button
2. They say: "Click Submit"
3. The voice control software searches for an element whose accessible name matches "Submit"
4. If found, it simulates a click — success
5. If not found, the user might see numbered overlays, or hear "No matching element found"

That matching step is crucial. The software is looking for an accessible name that contains what the user said. If the button shows "Submit" but has been given an aria-label of "Send form data to server," the match fails. The user can see "Submit" right there on screen, but saying it does nothing. This disconnect is baffling and frustrating.

## What This Means for Design and Development

### Label in Name: Where Voice Control Meets Screen Readers

As discussed in our [accessibility techniques article](./accessibility-techniques.md), different assistive technologies sometimes have competing needs. Voice control is where the [Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name) requirement becomes essential — it's the bridge between what sighted users see and what voice users can say.

**The rule is straightforward**: The accessible name of an element must contain the visible text or content. A "play" button showing ▶ (play icon) with an `aria-label` of "Play video" works perfectly — a user can say "Click play" and it matches. But a link showing "Messages (30)" with a label of "View your 30 messages" won't reliably work when someone says "Click messages."

**Why this matters so much**: Voice users can only see what's on screen. They don't know — can't know — what accessible name you've given something behind the scenes. When visible text and accessible names diverge, you've created an interface where the obvious command doesn't work. Imagine the frustration of saying "Click Submit" over and over, looking right at the Submit button, and having nothing happen.

### The Icon Problem

Icons present a particularly interesting challenge for voice control, and it's worth thinking through carefully.

Consider a small bin icon used to delete an email address from a form. Sighted users understand visually that it means "delete." Screen reader users need an accessible name like "Delete email address 1" to know what the button does. But what do voice control users say to activate it?

If the icon has no visible text, voice users face an awkward choice:

1. Guess the accessible name ("Click delete"? "Click remove"? "Click trash"?)
2. Fall back to numbered overlays, which is slower and more cognitively demanding

The best solution is visible text alongside icons — or at minimum, accessible names that use obvious, guessable terminology. "Delete" is more likely to be spoken than "Remove" or "Trash." When you're choosing accessible names, think about what word would come most naturally to someone looking at that control.

### When Everything Has the Same Name

Things get complicated when multiple elements have similar names. This is common in list interfaces — think about a form with several email fields, each with its own "Delete" button.

When the user says "Click Delete," the software will respond with "I found multiple matches. Say 1, 2, or 3." Now the user has to figure out which number corresponds to which button. If those buttons have hidden accessible labels that differ from what's visible, this becomes genuinely confusing.

The better approach gives each button a unique, descriptive name that includes context: "Delete john@example.com" and "Delete jane@example.com." The user can say exactly what they want: "Click Delete john@example.com."

There's a balance here between brevity (shorter names are easier to speak) and specificity (unique names avoid confusion). Generally, err on the side of specificity — the cost of saying a few extra words is much lower than the cost of triggering the wrong action.

### The Keyboard Connection

Here's something that might not be obvious: voice control typically works by moving focus to an element and then simulating a click or keypress. Under the hood, it's often relying on the same mechanisms as keyboard navigation.

This means that if an element can't be focused or activated via keyboard, voice control will likely fail too. Once again, [keyboard navigation](./at-keyboard-navigation.md) and semantic HTML turn out to be the foundation of good accessibility. Get keyboard support right, and you're most of the way to supporting voice control as well.

## Practical Guidance

### What Works

1. **Match accessible names to visible labels**: If it shows "Submit," its accessible name must include "Submit." This is a [WCAG Level A requirement](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name), but more fundamentally, it's what makes voice control actually work.

2. **Use common, guessable terminology**: "Save," "Submit," "Delete," "Cancel" — these words come naturally. "Persist," "Commit," "Expunge," "Annul" require users to guess (often wrongly) what you've called things.

3. **Provide visible text for interactive elements**: Icons alone create guessing games. Consider pairing icons with text, or at minimum ensure the accessible name is obvious.

4. **Make names unique when multiple similar controls exist**: When three buttons do similar things, their names need enough context to distinguish them.

5. **Ensure keyboard accessibility**: Voice control and keyboard navigation share underlying mechanisms. One often enables the other.

6. **Actually test with voice control**: Five minutes of trying to navigate your own interface by voice will reveal problems no amount of code review will catch.

### What Breaks Things

1. **Accessible names that don't match visible text**: A button showing "Go" but named "Navigate to next page" creates an invisible barrier. The user can see what they want, but can't reach it.

2. **Icon-only buttons with non-obvious names**: A bin icon with `aria-label="Delete"` works. The same icon with `aria-label="Remove item from list"` when users naturally say "Delete" creates friction.

3. **Excessively long accessible names**: "Click Submit form and send all data to the server for processing" is impractical to speak, especially for users who don't have precise control over their voice.

4. **Dynamic name changes without visible changes**: If a button's function changes, the visible label should change too. Users can only speak what they can see.

5. **Overriding visible text with aria-label**: When you add `aria-label`, you're replacing the accessible name entirely. The visible text becomes decoration — present but unreachable by voice.

## The Technical Details

This section gets into the mechanics of how accessible names work. If you're a developer implementing these patterns, the specifics matter. If you're a designer, the key takeaway is simpler: visible text and accessible names need to align.

### How Accessible Names Are Computed

The accessible name is calculated according to the [Accessible Name and Description Computation](https://www.w3.org/TR/accname-1.1/):

**Priority order (simplified):**

1. `aria-labelledby` (references other elements)
2. `aria-label` (direct label)
3. Native labelling (`<label>`, `alt`, etc.)
4. Visible text content

**Common patterns:**

```html
<!-- Visible text becomes the name -->
<button>Submit</button>
<!-- Name: "Submit" ✅ -->

<!-- aria-label overrides visible text -->
<button aria-label="Send form data">Submit</button>
<!-- Name: "Send form data" ❌ Doesn't contain "Submit" -->

<!-- aria-label supplement when there's no visible text -->
<button aria-label="Delete email address 1">🗑</button>
<!-- Name: "Delete email address 1" ✅ Works, but no visible text -->

<!-- Better: visible text alongside icon -->
<button><span class="icon">🗑</span> Delete</button>
<!-- Name: "Delete" ✅ -->
```

### When aria-label Is Appropriate

`aria-label` is a powerful tool, but it's easy to misuse. The key insight is that it *replaces* the accessible name entirely rather than supplementing it.

Use `aria-label` when:

- There is no visible text (icon-only buttons)
- The visible text needs supplementation for context (but ensure the aria-label *contains*, ideally starts with, any visible text)

Avoid `aria-label` when:

- There's already appropriate visible text — you'd just be creating divergence
- You want to say something different from what's shown — that's the exact problem we're trying to avoid

## Testing Your Interfaces

The best way to understand voice control accessibility is to experience it yourself. Even five minutes of trying to navigate your own interface by voice will be illuminating — and probably humbling.

### Quick Voice Control Test

**On macOS:**

1. Go to System Preferences > Accessibility > Voice Control
2. Enable Voice Control
3. Try saying:
   - "Show numbers" (displays numbered overlays)
   - "Click [visible label text]"
   - "Show grid" (for grid navigation)

**On Windows 11 (Voice Access):**

1. Open Settings > Accessibility > Speech
2. Enable Voice Access
3. Try similar commands

**On iOS/iPadOS:**

1. Settings > Accessibility > Voice Control
2. Enable Voice Control
3. Navigate by speaking button names

### Testing Checklist

- [ ] All interactive elements have accessible names
- [ ] Accessible names contain visible text (Label in Name)
- [ ] Common terminology is used ("Save", "Cancel", "Delete")
- [ ] Names are unique enough to distinguish similar elements
- [ ] Names are short enough to speak comfortably
- [ ] Icon-only buttons have understandable accessible names
- [ ] Keyboard accessibility is maintained
- [ ] Forms can be completed entirely by voice

If you feel frustrated after a few minutes of voice navigation, pay attention to that feeling. It's a signal that something needs work — and a hint of what daily users experience on a much larger scale.

### Debugging Voice Control Issues

When voice commands aren't working, here's a systematic approach:

1. Check the element's accessible name in browser DevTools (Accessibility panel)
2. Verify the visible text matches (or is contained in) the accessible name
3. Ensure the element is focusable
4. Verify keyboard interaction works (Enter/Space activates)

Usually the problem is step 2 — a mismatch between what's visible and what's named.

## Further Reading and Citations

- [W3C WAI: Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name)
- [W3C: Accessible Name and Description Computation](https://www.w3.org/TR/accname-1.1/)
- [WebAIM: Motor Disabilities](https://webaim.org/articles/motor/)
- [Adrian Roselli: Label in Name](https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html)
- [Léonie Watson: Voice Control Accessibility](https://tink.uk/thoughts-on-voice-controlled-accessibility/)
- [My article on braille displays](./at-braille-displays.md)
- [My article on eye trackers](./at-eye-trackers.md)
- [My article on keyboard navigation](./at-keyboard-navigation.md)
- [My article on screen readers](./at-screen-readers.md)
- [My article on screen magnifiers](./at-screen-magnifiers.md)
- [My article on switch access](./at-switch-access.md)
