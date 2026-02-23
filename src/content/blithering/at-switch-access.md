---
title: "Assistive Technology: Switch Access Devices"
description: "Part of the Assistive Technologies primer series, this looks at switch access devices"
created: "2026-02-18T08:35:00.000Z"
pubDate: "2026-02-23T10:30:00.000Z"
author: "Śūnya"
image:
    src: "./headers/spiral-stairs.jpg"
    alt: "A stone spiral of stairs"
    aspectRatio: "16:9"
    width: 3968
    height: 2240
tags: ["Accessibility", "POUR", "ATs", "Assistive Technology", "switch", "switch access device"]
---

## Introduction

This article is part of a series exploring how people with disabilities actually interact with digital content. Remember the maxim, "Nothing about us without us" — these articles aren't a substitute for learning from real users with real challenges, but they can help you start thinking more deeply about accessibility.

Switch access might be unfamiliar to many designers and developers, but for people with severe motor disabilities, it's often their only way to interact with digital content. When you understand how switch access works, something remarkable happens: you start to see how every design choice — from tab order to focus management — can either enable independence or create insurmountable barriers.

## What is Switch Access?

At its simplest, a switch is an input device that sends a signal when activated. There is a type of switch that can be activated through almost any voluntary movement a person can reliably make: pressing with a finger, hand, foot, elbow, or head; sipping or puffing air; blinking; raising an eyebrow. If there's a movement someone can control, there's likely a switch designed for it.

Switch access systems use these switches to control devices, typically by scanning through options automatically and letting the user activate their switch when the desired option is highlighted. It's methodical. It takes time. And it absolutely depends on thoughtful interface design.

### Who Uses Switch Access?

The people who rely on switch access can't use standard input methods. They often have significant motor impairments who find keyboards, mice, touchscreens, and even voice control unreliable or impossible.

This includes people with:

- **Motor neurone disease (ALS/MND)**: As muscles progressively weaken, switches may be the last remaining way to maintain independence
- **Cerebral palsy**: When motor control difficulties make precise movements challenging or impossible
- **Muscular dystrophy**: Progressive muscle weakness that makes traditional input methods exhausting or infeasible
- **Spinal cord injury**: Quadriplegia or limited upper body function means finding alternative ways to interact
- **Stroke**: When motor function is lost on one or both sides
- **Multiple sclerosis**: Variable motor function that makes consistent keyboard or mouse use unreliable
- **Severe arthritis or RSI**: When other methods cause too much pain to be sustainable

The specifics vary widely, but a switch of some sort can provide a reliable way to interact with technology on their own terms.

### Types of Switches

We've mentioned that switches can vary, but it can be useful to see to what extent and how they are used.

| Type | Activation | Common Uses |
| ------ | ------------ | ------------- |
| Button/Push switch | Press with body part | General use, mount anywhere |
| Plate switch | Light touch or rest weight | Sensitive activation |
| Pillow switch | Squeeze | Limited grip strength |
| Sip-and-puff | Blow or suck air | No hand function, head control |
| Head switch | Head movement | Mounted on headrest |
| Proximity switch | Approach (no touch) | Very limited movement |
| Eyebrow/EMG switch | Muscle tension detection | Minimal voluntary movement |
| Eye gaze | Eye tracking | See separate article |

## How Switch Access Works

### Scanning Methods

The heart of switch access is **scanning** — the system automatically moves through options, highlighting them one by one, while the user watches and activates their switch when the right option appears. Imagine playing a game where you have to press a button at exactly the right moment, but instead of a game, it's every interaction with your computer. Now imagine doing that all day.

**Auto-scan (one switch):**

The most common method. Scanning begins automatically (or with a switch press), highlighting each option in sequence. When your desired option lights up, you press your switch. Miss the timing? Wait for the scan to cycle around again. It requires focus, patience, and precise timing — especially if the scan speed is fast.

**Step-scan (two switches):**

More control, but requires two reliable movements. One switch advances to the next option; the other activates the current choice. It's slower but removes the pressure of split-second timing. For users who can reliably trigger two different movements, it can be less stressful.

**Group scanning:**

This is where interface design really matters. Instead of scanning through every single element linearly, options are grouped — maybe by rows, columns, or logical regions. The system scans through groups first. You select a group, then it scans within that group. Done well, this dramatically reduces the time to reach any option. Done poorly, it can be baffling.

**Direct selection (multiple switches):**

Some users can manage multiple switches, each mapped to a specific function (like four switches for directional movement plus one to select). It's closer to traditional keyboard navigation but still depends entirely on the keyboard-accessible interface underneath.

### Timing and Configuration

Switch users typically spend time configuring their system to match their abilities and preferences:

- **Scan speed**: How long each option is highlighted — anywhere from 0.5 to 3+ seconds. Faster means quicker navigation but demands more precise timing. Slower is forgiving but makes every task take longer. There's no perfect answer; it's about finding what works for each person.
- **Scan pattern**: Linear, row-column, grouped — the path the highlight takes through the interface
- **Dwelling time**: How long the switch must be held to register (preventing accidental activations)
- **Scan loops**: How many times the system cycles through options before pausing (to prevent endless, exhausting loops)
- **Auto-start**: Whether scanning begins automatically or waits for a switch press

These settings are personal to each user, and the choices affect how quickly and comfortably someone can navigate the digital world.

### What Gets Scanned?

Here's where it all connects: switch access systems scan through focusable, interactive elements. Buttons. Links. Form fields. Menu items. Anything in the keyboard tab order.

This is why [**keyboard accessibility is fundamental**](./at-keyboard-navigation.md) to switch access. If an element can't receive keyboard focus, it typically can't be reached by switch scanning either. Every inaccessible interface for keyboard users is also inaccessible for switch users — but the impact is magnified, because switch users have no alternative input method to fall back on.

## What This Means for Design and Navigation

### Every Tab Stop Counts

As emphasised in our [accessibility techniques article](./accessibility-techniques.md), logical order matters — but for switch users, it becomes critical in a way that's hard to overstate.

**Every extra tab stop adds time.** Not metaphorically. Literally. If reaching an element requires scanning through 10 items at 1 second each, that's 10 seconds. An interface with 50 tab stops before the main content means nearly a minute just to start interacting with the page. Every. Single. Time.

**Predictable patterns save effort.** When users learn where elements typically appear, they can prepare to activate their switch at the right moment. Inconsistent layouts force careful attention to every single scan, which is exhausting.

**Grouping is essential.** The ability to scan through groups of elements (like treating all navigation links as one group, then drilling into individual items) can transform an overwhelming interface into a manageable one. The difference between 50 individual scans and 5 group scans is enormous.

### The "Add Another" Pattern: A Switch Access Perspective

Consider the "unoptimised" email recipients pattern from our [accessibility techniques article](./accessibility-techniques.md). When someone clicks "Add another":

1. They scan to reach the button (however many elements that takes)
2. They activate it
3. A new email field appears
4. Now what?

If focus doesn't move to the new field, they might not even realize something happened. If they do know, they now face scanning through everything again to reach that new field. If there are 20 email fields, each with an input and a delete button, that's potentially 40+ tab stops to work through.

Proper focus management is transformative. Moving focus to the newly added field means the user can start typing immediately. They know it worked, and they're in the right place. That single design choice might save them minutes of scanning.

### Skip Links and Landmarks

Imagine having to scan through 30 navigation items every time you visit a page, just to reach the content you came for. This isn't a hypothetical inconvenience — it's the daily reality for switch users navigating sites without skip links.

A skip link ("Skip to main content") can save someone literal minutes and are the difference between a usable site and one that's technically accessible but practically exhausting.

Similarly, landmark navigation (when supported by the scanning software) lets users jump between entire regions of a page. Modern, semantic HTML — using elements like `<main>`, `<nav>`, `<header>` properly — makes this possible. It's a massive win that costs almost nothing to implement.

### Time Limits and Timeouts

Switch users work at a different pace. When each field takes 30 seconds to reach and fill, a form with a 5-minute timeout becomes impossible. Any mistake requiring a restart means starting over from zero, having lost all that invested time.

WCAG requires the ability to [extend or disable time limits](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html) (Level A). If you must you set a timeout in your application, bear in mind that you may be preventing someone from using it. Make that decision consciously and generously.

## Design and Development Considerations

### What Works Well

These are the building blocks of interfaces that switch users can actually use:

1. **Ensure complete keyboard accessibility**: Switch access lives on top of the keyboard-accessible tab order. If Tab can't reach it, switches can't either.

2. **Minimize tab stops thoughtfully**: Every focusable element adds scanning time, so remove unnecessary tab stops. But — and this is crucial — don't make things unfocusable in pursuit of minimalism. It's about removing the truly unnecessary, not the merely numerous, as per [point 3, Utility, redundancy and clarity](./accessibility-techniques.md).

3. **Maintain logical, predictable tab order**: Users learn to anticipate where elements will be. Surprises waste time and cause errors. Consistency is kindness.

4. **Manage focus when content changes**: When something is added or removed, don't leave users stranded. Move focus somewhere sensible. Give them context for what just happened.

5. **Provide skip links**: These take minutes to implement and can save users cumulative hours. The return on investment is extraordinary.

6. **Use semantic landmark regions and grouping**: Many switch access systems can jump between landmarks (`<main>`, `<nav>`, `<header>`, `<ul>`, `<fieldset>`, etc). It's semantic HTML doing what it was meant to do.

7. **Be generous with time limits**: Either extend them substantially or let users disable them entirely. Fast-paced interactions work for some people and exclude others.

8. **Make target sizes adequate**: Larger interactive areas are easier to activate, especially for users with motor control difficulties. WCAG 2.2 specifies [minimum target sizes](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) (24×24 CSS pixels minimum, 44×44 ideal).

9. **Provide undo/redo functionality**: Mistakes happen. The ability to recover without starting over is crucial.

### What hurts

These patterns might seem minor in isolation, but they compound quickly for switch users:

1. **Using `tabindex="-1"` on elements that should be reachable**: This removes them from the tab order and, by extension, from the scanning sequence. They become effectively unusable to switch users.

2. **Relying on hover interactions**: Switch users can't hover. They can only activate. If information or functionality depends on hovering, it's inaccessible to them.

3. **Creating excessively long scan sequences**: A page with 100 focusable elements and no grouping or skip mechanism isn't just inconvenient — it's a barrier. Few people have the stamina to scan through that repeatedly.

4. **Assuming speed**: Operations that take seconds with a mouse can take minutes with switches. Design for the slower pace; everyone benefits from more forgiving interfaces.

5. **Using time-limited interactions without extensions**: Captchas with timers, timed quizzes, session timeouts that can't be extended — these aren't just frustrating; they're often exclusionary.

6. **Letting focus jump unexpectedly**: If focus moves without user action, it disrupts the scanning pattern. Users lose their place and have to reorient, which takes time and mental energy.

7. **Building complex keyboard-only interactions without care**: Arrow key navigation within custom widgets needs thoughtful design. Following established patterns from the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) helps users leverage what they already know.

8. **Penalizing errors**: Forms that wipe everything and make users start over when validation fails? That's not just annoying — it's ableist. The effort required to complete a form with switches is substantial. Respect that effort.

## Understanding the Time Factor

It helps to put this in concrete terms. Here's what the same tasks look like across different input methods:

| Task | Mouse user | Keyboard user | Switch user (1 sec scan) |
| ------ | ------------ | --------------- | -------------------------- |
| Click a button 10 items into a list | 1-2 seconds | ~2-3 seconds | 10+ seconds |
| Fill a 5-field form | 30-60 seconds | ~1-2 minutes | 5-10+ minutes |
| Navigate a complex menu | 2-3 seconds | 5-10 seconds | 30+ seconds to minutes |

This isn't about disability in the medical sense — it's about interface design creating friction. Every inefficiency in your interface gets multiplied exponentially for switch users. A slightly bloated tab order? Annoying for keyboard users, genuinely exhausting for switch users. An unexpected focus jump? Disorienting for keyboard users, potentially task-ending for switch users.

The gap between "works with a mouse" and "works for switch users" is often just better keyboard support, clearer focus management, and more thoughtful sequencing. The technical lift is often small. The impact is enormous.

## Testing Your Interfaces

### Think Like a Scanner

You don't necessarily need switch hardware to start understanding the experience. Here's what you can do right now:

1. **Tab through your interface** and count every tab stop. Really count them. How many steps to the main content? How many to complete a common task?

2. **Time how long it takes** to reach key elements. Multiply that by the number of times someone might need to navigate your interface in a session.

3. **Consider each interaction** from a sequential perspective: How many steps? Could focus management reduce that? Are there opportunities to group related elements?

4. **Pay attention to what happens** when content changes. Where does focus go? Does it go anywhere? Would someone know what just happened without seeing the screen change?

This kind of manual testing won't catch everything, but it will surface the most significant barriers quickly.

### Enable Switch Control (iOS/macOS Testing)

If you want to experience switch scanning first-hand, both iOS and macOS have built-in switch control that you can enable:

**On macOS:**

1. System Preferences > Accessibility > Switch Control
2. Enable Switch Control
3. You can use keyboard keys (like Space) as simulated switches
4. Try navigating just your dock or menu bar to get a sense of the timing

**On iOS:**

1. Settings > Accessibility > Switch Control
2. Add switches (you can use screen taps or hardware switches)
3. Try composing a text message or filling a form

Even a few minutes of this will give you perspective. It's slow. It requires focus. And any inefficiency in the interface becomes immediately, viscerally obvious.

### Testing Checklist

When evaluating your interface for switch access, consider:

- [ ] All interactive elements are reachable via Tab key (and therefore by switch scanning)
- [ ] Tab order follows logical reading order
- [ ] Skip links are provided for repetitive content
- [ ] Time limits can be extended or disabled
- [ ] Focus is properly managed when content changes dynamically
- [ ] Number of tab stops is minimized without sacrificing functionality
- [ ] Landmark regions are properly marked with semantic HTML
- [ ] Target sizes meet minimum requirements (24×24 CSS pixels minimum, 44×44 ideal)
- [ ] No interaction requires hover
- [ ] Errors don't require starting over — recovery is possible

## Intersections With Other Needs

Switch access rarely exists in isolation. Many switch users also rely on:

- **Screen readers**: Particularly sip-and-puff users who also have visual impairments — they're navigating by both sound and scanning
- **Voice control:** Some people use Voice control software to overcome some of the frustration of scanning, but rely on a switch for activating.
- **Eye gaze**: Some people use combined switch and gaze systems, where eye tracking selects regions and switches activate choices
- **AAC (Augmentative and Alternative Communication)**: Communication software often uses the same switch access principles
- **Environmental controls**: The same switches that control a computer might also control lights, doors, or a powered wheelchair — it's all part of maintaining independence

The principles that help switch users ripple outward. Keyboard accessibility helps everyone who can't use a mouse. Thoughtful focus management benefits anyone with attention or cognitive differences. Generous time limits accommodate people working in their second language, people with cognitive disabilities, and people just having a rough day.

When you design for switch access, you're not designing for a tiny edge case. You're designing for the full complexity of human ability and circumstance.

## Further Reading and Citations

- [W3C WAI: Keyboard Accessible](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
- [W3C WAI: Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable)
- [WebAIM: Motor Disabilities](https://webaim.org/articles/motor/assistive)
- [Google: Android Switch Access](https://support.google.com/accessibility/android/answer/6122836)
- [Inclusive Design Principles](https://inclusivedesignprinciples.info/)
- [My article on braille displays](./at-braille-displays.md)
- [My article on eye trackers](./at-eye-trackers.md)
- [My article on keyboard navigation](./at-keyboard-navigation.md)
- [My article on screen readers](./at-screen-readers.md)
- [My article on screen magnifiers](./at-screen-magnifiers.md)
- [My article on voice control](./at-voice-control.md)
