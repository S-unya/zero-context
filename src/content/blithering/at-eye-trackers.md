---
title: "Assistive Technology: Eye Tracking"
description: "Part of the Assistive Technologies primer series, this looks at eye trackers"
created: "2026-02-16T08:35:00.000Z"
pubDate: "2026-02-23T10:30:00.000Z"
author: "Śūnya"
image:
    src: "./headers/stairs-outside.jpg"
    alt: "Concrete stairs in the evening sun"
    aspectRatio: "16:9"
    width: 3968
    height: 2240
tags: ["Accessibility", "POUR", "ATs", "Assistive Technology", "eye tracking"]
---

## Introduction

This article is part of a series exploring how people with disabilities actually interact with digital content. Remember the maxim, "Nothing about us without us" — these articles aren't a substitute for learning from real users with real challenges, but they can help you start thinking more deeply about accessibility.

Eye tracking might sound like futuristic technology, the stuff of spy films and science fiction. But for people who cannot use their hands — or who can move little else besides their eyes, it could be their only means of communicating and interacting with the world.

## What is Eye Tracking?

Eye tracking (also called gaze tracking or eye gaze) is a technology that tracks where a person is looking and translates that gaze into input — much like a mouse pointer, but controlled by the eyes. Users look at targets on screen, and the system recognises what they're focusing on.

The technology works through cameras and infrared light sources mounted on or near the screen. These track the position of the user's eyes (specifically, the reflection of light off the cornea and the position of the pupil) to calculate precisely where on the screen the person is looking.

### Who Uses Eye Tracking?

Eye tracking as an assistive technology serves people who have very limited or no use of their hands, and often limited mobility overall:

- **People with ALS/motor neurone disease**: As the condition progresses, eye movement often remains when other voluntary movement is lost. Eye tracking may be someone's only remaining method of communication.
- **People with high-level spinal cord injuries**: Quadriplegia can leave eye movement largely unaffected while making hands-on computer use impossible.
- **People with muscular dystrophy**: Progressive muscle weakness may eventually affect everything except the eyes.
- **People with cerebral palsy**: Some individuals have significant motor impairment affecting their limbs but retain good eye control.
- **People with brainstem stroke (locked-in syndrome)**: The classic "locked-in" presentation leaves a person fully aware but able to move only their eyes.
- **People recovering from severe injury or illness**: Temporary use of eye tracking can bridge gaps during recovery.

The [ALS Association](https://www.als.org/) notes that eye tracking devices are among the most common communication aids for people in later stages of ALS.

## How Eye Tracking Works

### The Technology

Modern eye tracking systems combine several components:

1. **Eye tracker hardware**: A device (often a bar mounted below the screen) containing cameras and infrared illuminators
2. **Calibration**: The user looks at a series of points so the system learns their individual eye characteristics
3. **Gaze estimation software**: Algorithms that calculate where on screen the user is looking
4. **Interaction software**: Applications that translate gaze position into meaningful input

### Interaction Methods

Eye tracking systems typically offer several ways to select or activate elements:

| Method | How it Works |
| -------- | -------------- |
| **Dwell** | Look at a target for a set time (e.g., 500ms–1500ms) to activate it |
| **Blink** | Look at a target and blink deliberately to select |
| **Switch-assisted** | Look at a target and use a physical switch (button, sip-puff) to confirm |
| **Wink** | Similar to blink but with one eye only; it has the benefit of being able to see the interaction |
| **Gaze + another input** | Combine gaze pointing with a secondary activation method |

Dwell selection is most common, but it creates a fundamental tension: shorter dwell times mean faster interaction but more accidental activations; longer dwell times mean fewer mistakes but exhausting slowness.

### On-Screen Keyboards

For text entry, eye tracking users typically use on-screen keyboards. They look at each letter in turn, dwelling to select. Some systems incorporate word prediction to reduce the number of selections needed, but this adds its own cognitive load — the user must constantly scan prediction options while composing their thought.

Imagine writing this paragraph, one letter at a time, by staring at each key for half a second. Consequently, efficiency and design choices that reduce keystrokes are hugely important.

## What This Means for Understanding and Navigation

### Target Size and Spacing

Eye tracking is inherently less precise than a mouse. Even with excellent calibration, gaze position estimates have some uncertainty — typically 0.5 to 1 degree of visual angle, which translates to roughly 20-40 pixels at normal viewing distances. Add in natural eye jitter, and hitting small targets becomes a game of frustration.

This is why WCAG 2.2 introduced [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) at Level AA — at least 24x24 CSS pixels for interactive elements. For eye tracking users specifically, larger is always better. A 44x44 pixel target (the AAA recommendation) is comfortable; a 24x24 pixel target is possible but tiring; anything smaller is a barrier.

Spacing matters equally. If interactive elements are too close together, gaze tracking can't reliably distinguish which one the user wants. The "heat map" of gaze attention is fuzzy, not pinpoint. Adjacent targets need clear visual and spatial separation.

### The Tyranny of Dwell Time

Every interaction for a dwell-based eye tracking user takes time — that configured dwell period, multiplied by every selection. Consider what it takes to fill in a typical form:

1. Look at the first field (dwell to focus)
2. Look at on-screen keyboard, spell out your name letter by letter (20+ dwells for a typical name)
3. Look at the next field (dwell)
4. Repeat for email, address, etc.
5. Look at submit button (dwell)

A form that takes an able-bodied user 30 seconds might take an eye tracking user 10 minutes of concentrated effort. Every unnecessary interaction is a tax on their time and energy. Every opportunity to reduce selections is meaningful.

### The Midas Touch Problem

In Greek mythology, King Midas wished that everything he touched would turn to gold — and quickly discovered this applied to food, drink, and the people he loved. Eye tracking has its own "Midas touch" problem: users need to look at something to select it, but they also need to look at things just to see them. Equally, the opposite is true for blink to select - staring at a screen is eye-watering!

Designs that cluster many interactive elements together, or place them over content the user might want to read, create constant accidental activations.

This is exhausting in a way that's hard to appreciate until you've experienced it. Every glance carries potential consequences. Reading a page becomes an obstacle course.

### Fatigue

Eye tracking is physically and cognitively demanding. The eyes aren't designed for hour after hour of sustained, precise pointing. Users report:

- Eye strain and discomfort
- Headaches
- Mental fatigue from the constant concentration required
- Neck strain from maintaining head position (most systems require relatively stable head positioning)

The consequences are significant: many eye tracking users can only work in limited sessions, with breaks. Interfaces that require lots of interactions, or interactions requiring high precision, accelerate fatigue. What might seem like a minor inefficiency multiplies into real harm.

### Calibration and Environmental Factors

Eye tracking systems need to be calibrated to each user, and that calibration can drift or fail due to:

- Changes in lighting (especially direct sunlight or strong lamps)
- Changes in head position
- Eye fatigue affecting the user's gaze stability
- Glasses, especially with reflective coatings
- Some eye conditions that affect the cornea or pupil

Users may need to recalibrate multiple times during a session. Environmental stability isn't just a convenience — it's a requirement for the technology to work at all.

## Practical Guidance

### What Works

1. **Large, generously-spaced interactive targets**: Minimum 44x44 pixels where possible, with clear visual separation between elements.

2. **Reducing the number of interactions required**: Every selection has a cost. Autocomplete, smart defaults, and progressive disclosure can help.

3. **Forgiving undo**: Accidental activations happen. Easy, obvious ways to reverse actions reduce the cost of errors.

4. **Predictable layouts**: Consistency lets users build spatial memory. If the submit button is always in the same place, they don't have to hunt for it while fighting the Midas touch problem.

5. **Clear focus and hover states**: Even though eye tracking users don't "hover" in the traditional sense, many systems show a gaze cursor or highlight what the user is looking at. Visual feedback confirming what's about to be selected helps users avoid errors.

6. **Patience with timeouts**: If your site logs users out after inactivity, remember that an eye tracking user composing a long response is working hard even if they're not submitting yet. Be generous.

7. **Accessible alternatives to drag-and-drop**: Drag operations are extremely difficult with eye tracking. Provide button-based alternatives for reordering, moving files, etc.

8. **Resume session**: In situations where a user has to input a lot of information, consider breaking the input into smaller blocks and allow users to continue from where they left off.

### What Breaks Things

1. **Tiny targets**: Small links, icons, or buttons that require precision pointing create barriers. This includes inline text links that are just a few characters wide.

2. **Crowded interfaces**: Too many interactive elements close together means the user can't reliably select the one they want.

3. **Hover-dependent functionality**: Eye tracking doesn't have a clean "hover without activating" state. Menus, tooltips, or information that rely on hover are problematic.

4. **Moving targets**: Elements that move, animate, or reflow while the user is trying to select them are nearly impossible to hit.

5. **Aggressive timeouts**: Short session timeouts or forms that lose data if not submitted quickly enough punish slow input methods.

6. **CAPTCHAs and verification that assume dexterity**: "Click all the traffic lights" is difficult when each click takes concentration and time.

7. **Lack of keyboard accessibility**: Eye tracking systems often work by emulating mouse input, but many also provide keyboard emulation or work alongside on-screen keyboards. Interfaces that aren't keyboard accessible often aren't eye tracking accessible either.

## Testing Considerations

### You Probably Can't Fully Test This

Real eye tracking systems are expensive (£1000–£15000+), and even if you have access to one, you won't use it the way a long-term user does. Your eyes are adapted to quick pointing with a mouse, not sustained gaze control. You'll struggle with things that experienced users have trained for, and you'll miss inefficiencies that compound over hours of use.

That said, there are approximations that help you think through the experience:

### Practical Approximations

1. **Mouse simulation**: Try using your site with a mouse, but enforce a half-second delay before each click "counts." Move the pointer to a target, wait, then click. Notice how exhausting this becomes and which parts of your interface require the most interactions.

2. **Enlarge and consider**: Zoom to 200% and look at your interactive elements. Do they still have clear separation? Could you distinguish them from a few feet away?

3. **Count the clicks**: For any user journey, count every single discrete interaction required. Then imagine each one taking 0.5–1.5 seconds of sustained concentration.

4. **Use switch access testing**: Switch access has some similar characteristics (slow, sequential, each selection deliberate) and is easier to simulate. The iOS Switch Control or Windows Switch Access features can give you a sense of deliberate, slow navigation.

### Testing Checklist

- [ ] Interactive targets are at least 44x44 pixels (or 24x24 minimum with spacing)
- [ ] Adequate spacing between interactive elements  
- [ ] No functionality requires hover alone
- [ ] No functionality requires drag-and-drop without alternatives
- [ ] Session timeouts are generous (or warned with option to extend)
- [ ] Interface is fully keyboard accessible (as a proxy for general compatibility)
- [ ] Error recovery is easy (undo, back, cancel prominently available)
- [ ] Forms minimise number of fields and offer autocomplete where appropriate
- [ ] Layout is consistent across pages
- [ ] CAPTCHAs have accessible alternatives

## The Bigger Picture

Eye tracking users are often people for whom technology is not just convenient but vital — a lifeline to communication, education, employment, and social connection. The [Communication Matters](https://www.communicationmatters.org.uk/) charity notes that access to augmentative and alternative communication (AAC) devices, including eye tracking systems, can be life-changing.

When we design interfaces that work well for eye tracking, we're not just checking a compliance box. We're making choices about who gets to participate. The thoughtful placement of a button, the size of a target area, the number of steps in a workflow — these decisions accumulate into either welcome or exclusion.

As emphasised in the [accessibility techniques article](./accessibility-techniques.md), thinking through how different users experience our designs reveals complexities we'd otherwise miss. Eye tracking makes those complexities visible: every interaction costs time and energy; every tiny target is a barrier; every imprecision in design becomes amplified.

## Further Reading

- [W3C WAI: People with Disabilities and Web Accessibility](https://www.w3.org/WAI/people-use-web/) — overview including information on motor disabilities
- [WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) — the updated guidance on target sizes
- [WCAG 2.2: Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) — the AAA level target size requirement
- [Tobii Dynavox](https://www.tobiidynavox.com/) — one of the major eye tracking assistive technology providers
- [Communication Matters](https://www.communicationmatters.org.uk/) — UK charity supporting people who use AAC
- [AbleNet Eye Gaze Resources](https://www.ablenetinc.com/) — practical information about eye tracking implementation
- [WebAIM: Motor Disabilities](https://webaim.org/articles/motor/) — practical guidance on designing for motor impairments
- [My article on braille displays](./at-braille-displays.md)
- [My article on keyboard navigation](./at-keyboard-navigation.md)
- [My article on screen readers](./at-screen-readers.md)
- [My article on screen magnifiers](./at-screen-magnifiers.md)
- [My article on switch access](./at-switch-access.md)
- [My article on voice control](./at-voice-control.md)
