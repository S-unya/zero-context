---
title: "Roles and Responsibilities"
description: "Using the concepts of Boundaries and Areas of Responsibility to think about how teams work together."
created: "2025-01-11T09:54:57.397Z"
pubDate: "2025-01-11T09:54:57.397Z"
author: "Śūnya"
image:
    src: "./headers/tree-lines.png"
    alt: "A river bank bordered by a wall of trees"
    aspectRatio: "16:9"
    width: 3968
    height: 2240
tags: ["programming", "architecture", "teamwork", "management", "accessibility", "neurodiversity"]
---

One of the great things about having a simple paradigm is that it allows you to think about things in a different way and thereby come to understand them more deeply. Due to my neurological makeup I lean into these methodologies and outlooks (to a fault), and I have to remember to balance them with the understanding that these types of "filters" inherently simplify and remove information.

In this article, I'll explore how the concepts of [Boundaries and Areas of Responsibility](/blithering/responsibilitiesandboundaries) can help us understand team dynamics and organizational structures. My thesis is that by understanding the interplay between defined roles and human complexity, we can create more effective, adaptable teams while supporting individual growth.

## A nice little story

Let's start with a story that illustrates different approaches to teamwork, which we'll later analyze through our conceptual framework.

There is a group of volunteers working in some woodland, thinning trees (removing some trees to provide better growing conditions for those remaining). The access has been cleared ahead of time and the group arrive with the communal tools, ready to get to the task.

James, has recently joined the group and is eager to prove his capability. He grabs a saw and pushes through the undergrowth to the nearest tree marked for thinning. He saws away at the trunk of the tree, which binds the saw blade. Seeing he cannot cut the tree down that way, he decides to cut off a big branch, which comes loose and promptly gets stuck in the branches of the trees around. So he climbs up the tree and starts chopping at the side branches and eventually the branch crashes to the ground. James smiles at a job well done, and start sawing at another big branch...

Jay, a group veteran, wanders over and decides to give James the benefit of their wisdom. Jay knows that not only is there a more efficient way to approach this work, it will be much less dangerous too. They show James how to start with the small side branches, how to segment the main branch so that it comes down in manageable pieces and how to pile up the logs so the workspace is clear of clutter.

Jenny is the group organiser. She sees the neat piles of logs made by James and Jay around their tree and the work they are doing in the tree. She sees that they are dropping branches very close to where people are passing by; a nice pile of logs, but not where they ultimately need to be. So she puts up some barriers to guide pedestrians and clears a path through the brambles to the main log piles. Jenny has planned these works in concert with the landowners, marked the trees & cleared the access in preparation for the work. She's made sure the tools are available and working, there is sufficient transport and teas & coffees for the task itself. She is also cognisant of the work that needs to happen next.

## Different levels of perspective

This story illustrates how different team members naturally approach problems based on their experience and role:

- **James** is our most junior worker, whose scope of thought is limited to the immediate task - cut the tree down, bit by bit. He lacks the experience to plan beyond attacking the problem and seeing what happens.

- **Jay** is more experienced and can perceive the breadth of the problem more fully. They can plan a more efficient approach while avoiding pitfalls, but their focus remains largely on the immediate task, albeit with more perspective.

- **Jenny** is a senior organizer who has been present for planning meetings, prepared the groundwork, and understands the final goals. Her view of the problem is much wider and more coherent, allowing her to understand all parts, how they work together, and where the danger points lie.

In a software development context, these roles might correspond to a junior developer, senior developer, and technical lead. Each brings different perspectives and areas of focus to the same overall project.

## Boundaries and Areas of Responsibility

As noted in ["Unlocking simplicity"](/blithering/responsibilitiesandboundaries), "Boundaries" are the edges of a system, where it interacts with other systems. They control ingress and egress of information to the area they bound. "Areas of Responsibility" (AoR) are the nested "concerns" of the system, whose only interest is what lies within the Boundary.

In our story, we can think of different roles as functions within a software system:

- Volunteers (James and Jay) have a specific AoR: cutting trees and making log piles
- The organizer (Jenny) has a broader AoR: planning, preparation, and coordination

In an ideal model, these roles would operate like well-defined functions - receiving input, performing their task, and producing output without needing to know about the wider system. This clean separation is appealing because it provides certainty and predictability, qualities that businesses value highly.

### Reality check: People aren't functions

While it's tempting to view roles as cleanly bounded entities, reality is more complex. People aren't contained by the boundaries of their roles; rather, they contain the role along with numerous other qualities, experiences, and traits.

We see this in our story:

- James and Jay approach the same task differently despite having identical roles
- James might be acting hastily to prove himself as the newcomer
- Jay's experience allows them to see patterns and solutions that James can't yet perceive

This reality check reminds us that when a person assumes a role, they don't become the role - the role becomes part of them, filtered through their unique perspective and capabilities.

### Personal boundaries vs. role boundaries

People bring their own personal boundaries to each role they assume. Unlike role boundaries, personal boundaries:

- Vary in shape, intensity, and rigidity from person to person
- Change depending on context and relationships
- May conflict with other boundaries the person holds
- Create varying emotional costs when crossed

In our story, when Jay offers unsolicited help to James, they cross several of James's personal boundaries. Depending on James's personality and current state of mind, this could be received with:

- Gratitude for the learning opportunity
- Embarrassment at being "corrected"
- Defensiveness about his approach
- Resentment at being "patronized"

The role definition alone doesn't predict these reactions. By understanding personal boundaries, we can adjust contexts to minimize friction - for instance, establishing pair work as a norm rather than as a correction mechanism, which changes the boundary conditions entirely. It is interesting to note that modifying the role's boundaries can also change the personal boundaries of the person in the role.

## Growth beyond boundaries

People have aspirations and the capacity to learn and grow. An often-unstated responsibility of a "junior" team member is to learn and develop beyond their current level. When a person outgrows their role's boundaries, either the role must expand or they will need to change roles.

This reality presents both challenges and opportunities:

- People become dissatisfied when they stop growing, creating costs for the organization
- Team members bring hidden talents and experiences that aren't captured in their role definition
- Rigid boundaries can prevent people from contributing their full potential

In our woodland story, James might be new to tree work but could have valuable expertise from other domains - perhaps he's an engineer or artist in his day job with unique problem-solving approaches that could benefit the team.

### Psychological safety and boundary permeability

For boundaries to function effectively without becoming barriers, teams need psychological safety[^6] - the shared belief that team members can take interpersonal risks without facing negative consequences. When psychological safety is present, boundaries become appropriately permeable:

- Team members feel comfortable asking questions that might cross knowledge boundaries
- People can request help without fear of appearing incompetent
- Feedback can flow across hierarchical boundaries without triggering defensive responses
- Mistakes are treated as learning opportunities rather than failures

In our woodland story, James's willingness to accept Jay's guidance depends largely on whether their team environment feels psychologically safe. In a psychologically unsafe environment, James might:

- Pretend to know more than he does
- Reject help to avoid appearing incompetent
- Hide mistakes rather than learning from them
- Stick rigidly to his approach even when it's not working

Psychological safety doesn't mean the absence of standards or accountability. Rather, it enables more honest communication about what's working and what isn't, allowing teams to maintain high standards while supporting growth and learning. It's what allows boundaries to be clear without becoming rigid.

Research shows that Google's highest-performing teams were characterized not by having the most talented individuals, but by having the highest levels of psychological safety[^6]. This safety allowed them to navigate boundaries effectively while maintaining the benefits of clearly defined responsibilities.

### The power dynamics of hierarchies

Organizational structures inevitably create hierarchies, which serve practical purposes but also establish power dynamics. These power structures can manifest in:

- Direct control over resources, compensation, and advancement
- Information asymmetry where some team members have more context than others
- Gatekeeping of opportunities and connections

In our story, Jenny holds significant power through her comprehensive understanding of the project's context and goals. She controls what information James and Jay receive, which limits their ability to align their work with broader objectives.

Had Jenny shared more context, or adopted a more inclusive strategy - explaining where logs ultimately needed to go and why - James and Jay might have adjusted their approach or even suggested better solutions based on their ground-level perspective[^9]. Additionally, this would give them a sense of psychological security, ownership and purpose beyond the immediate task.

This simple example illustrates how information flows in organizations directly impact effectiveness, innovation, and team member satisfaction[^7].

## Creating space for diversity and inclusion

Understanding boundaries and areas of responsibility helps us create environments where diversity can flourish as an organizational strength. When we recognize that people aren't merely the roles they occupy, we naturally make space for different ways of being and working.

### Neurodiversity as a competitive advantage

The traditional workplace often assumes neurotypical patterns of communication, focus, and social interaction. However, when we loosen rigid boundary expectations, we create space for neurodivergent team members to contribute their unique strengths:

- Someone with ADHD might excel at creative problem-solving and generating novel connections between ideas, though they might approach tasks in a non-linear fashion
- An autistic team member might bring exceptional pattern recognition and attention to detail, while perhaps requiring different communication approaches
- A person with dyslexia might offer outstanding spatial reasoning and big-picture thinking, even if text-based documentation presents challenges

In our woodland story, perhaps James approaches the tree task differently not from inexperience, but because his brain processes spatial problems uniquely. His seemingly inefficient approach might actually lead to an innovation no one else would discover.

When organizations focus on outcomes within areas of responsibility rather than prescribing exact methods, they allow neurodivergent team members to work in ways that leverage their natural cognitive patterns rather than fighting against them. Research from Harvard Business Review shows that neurodivergent teams can be up to 30% more productive when work environments are adapted to their needs[^1].

### Accommodating health variations and disabilities

Physical and mental health conditions often exist invisibly within teams. By establishing flexible boundaries around how work gets done, we create space for people to adapt their work patterns to their health needs:

- A team member with chronic pain might need to alternate sitting and standing throughout the day
- Someone managing depression might have energy fluctuations that make traditional 9-5 scheduling counterproductive
- A person with mobility limitations might contribute brilliantly remotely where office environments create unnecessary barriers

These accommodations aren't special treatment - they're simply removing artificial constraints that prevent talented people from doing their best work. Studies by Accenture found that companies with best-in-class disability inclusion practices had 28% higher revenue and 30% higher profit margins than their peers[^2].

### Cultural diversity as perspective expansion

Different cultural backgrounds bring varied approaches to hierarchy, communication, and problem-solving. When we acknowledge that boundaries themselves are culturally influenced, we create space to incorporate diverse perspectives:

- Some cultures approach authority and hierarchy differently, affecting how comfortable people feel crossing traditional role boundaries
- Communication styles vary widely across cultures, from direct to contextual, affecting how information flows across boundaries
- Problem-solving approaches may be more collaborative or individual depending on cultural background

Research from McKinsey & Company consistently shows that companies in the top quartile for ethnic and cultural diversity outperform those in the bottom quartile by 36% in profitability[^3].

### The organizational advantage of inclusion

All this shows that companies that create flexible, permeable boundaries gain several concrete advantages:

1. **Access to wider talent pools** - When you accommodate diverse ways of working, you can recruit from previously untapped groups

2. **Cognitive diversity** - Different thought patterns lead to more creative solutions and better problem identification. Research published in Harvard Business Review found that teams with cognitive diversity solved problems faster than more homogeneous teams[^4]

3. **Increased innovation** - Diverse teams have been repeatedly shown to outperform homogeneous ones in innovation metrics. Boston Consulting Group found that companies with above-average diversity scores had innovation revenue 19% higher than companies with below-average diversity scores[^5]

4. **Improved perspective-taking** - Teams accustomed to accommodating differences become better at understanding user and customer needs

5. **Enhanced adaptability** - Organizations that embrace multiple working styles can more easily adapt to changing circumstances

By viewing areas of responsibility as containers for diverse approaches rather than prescriptions for specific behaviors, companies create environments where difference becomes strength rather than friction.

The key is moving from rigid boundaries that define not just what must be done, but precisely how and when, to resilient boundaries that clearly delineate responsibilities while allowing for varied approaches to fulfilling them. This shift doesn't sacrifice clarity or accountability — it enhances them by focusing on outcomes rather than processes.

## Practical applications

Understanding these dynamics provides several actionable insights for improving team effectiveness:

1. **Recognize the whole person, not just the role**
   - Create opportunities for team members to bring their full range of skills to bear
   - Acknowledge that people's approaches to their roles will naturally differ

2. **Make boundaries explicit but permeable**
   - Clearly define responsibilities while allowing cross-boundary collaboration
   - Create safe mechanisms for people to reach beyond their immediate area

3. **Share context generously**
   - Provide team members with "why" information, not just "what" and "how"
   - Enable autonomous decision-making by sharing broader goals and constraints

4. **Design for growth**
   - Build expansion paths into roles so people can grow without changing positions
   - Create deliberate learning opportunities that stretch beyond current boundaries

5. **Balance structure with flexibility**
   - Maintain enough structure to provide clarity and efficiency
   - Allow enough flexibility for innovation and individual expression

## In conclusion

The concepts of Boundaries and Areas of Responsibility provide a powerful framework for understanding team dynamics and organizational structures. They help us visualize how information flows, how responsibilities are distributed, and how teams can function more effectively.

However, this framework must be applied with mindfulness of human complexity. People are not functions with clean inputs and outputs - they're complex beings with personal boundaries, growth aspirations, and unique capabilities that transcend role definitions.

By balancing clear role boundaries with respect for individual complexity, organizations can create environments where both structured productivity and creative growth flourish[^8]. This balance allows teams to benefit from the predictability of well-defined responsibilities while still harnessing the full potential of the humans who inhabit those roles.

The most effective teams don't just define boundaries well - they feel safe, and know when and how to cross them productively, creating space for both reliable execution and unexpected innovation.

While these concepts are not the only way to reach these insights, they do provide a helpful framework, facilitating organisations to embrace this balance to gain a happy, equanimous personnel along with a competitive advantage!

## Further reading

[^1]: Austin, R. D., & Pisano, G. P. (2017). Neurodiversity as a Competitive Advantage. Harvard Business Review, <https://hbr.org/2017/05/neurodiversity-as-a-competitive-advantage>

[^2]: Accenture. (2019). All in: Inclusion & Diversity drive shopper habits. <https://www.accenture.com/gb-en/insights/retail/inclusion-diversity-retail>

[^3]: Hunt, V., Prince, S., Dixon-Fyle, S., & Yee, L. (2018). Delivering through Diversity. McKinsey & Company. Retrieved from <https://www.mckinsey.com/business-functions/organization/our-insights/delivering-through-diversity>

[^4]: Reynolds, A., & Lewis, D. (2017). Teams Solve Problems Faster When They're More Cognitively Diverse. Harvard Business Review. Retrieved from <https://hbr.org/2017/03/teams-solve-problems-faster-when-theyre-more-cognitively-diverse>

[^5]: Lorenzo, R., Voigt, N., Tsusaka, M., Krentz, M., & Abouzahr, K. (2018). How Diverse Leadership Teams Boost Innovation. Boston Consulting Group. Retrieved from <https://www.bcg.com/publications/2018/how-diverse-leadership-teams-boost-innovation>

[^6]: Edmondson, A. C. (2019). The Fearless Organization: Creating Psychological Safety in the Workplace for Learning, Innovation, and Growth. Wiley.

[^7]: Conway, M. E. (1968). How do Committees Invent? <https://www.melconway.com/Home/pdf/committees.pdf>

[^8]: Dweck, C. S. (2006). Mindset: The New Psychology of Success. Random House.

[^9]: Schein, E. (2013),  Humble Inquiry: The Gentle Art of Asking Instead of Telling, <https://www.leadingsapiens.com/humble-inquiry/>
