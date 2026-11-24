UB Voice: Student Concern Portal
Final Project Handoff

Status: Final build. HCI class prototype for the University of Baguio. Nothing typed into the form is sent or stored, and the site is not an official university channel.

Contents

Project Overview and Users
Architecture
Layout and Interface Structure
Design Tokens
Accessibility

Each of sections 2 to 5 ends with The Why, the reasoning behind the decisions, so whoever continues this can tell what is safe to change and what is load-bearing.

1. Project Overview and Users
What it is

UB Voice gives students one simple place to report problems, share concerns, and send suggestions about their university experience.

User problem

Students notice problems first, but there is not always an easy place to report them. Messages end up scattered across channels, and students may not know which office to approach. A single, clearly organized portal makes submitting feedback easier to understand and faster to complete.

Target audience
Primary: University of Baguio students who submit concerns.
Secondary (full version only): student representatives and authorized university personnel who would review submissions.
Interface goals
Goal	How it was met
Simple submission	Short form, only two required fields, about two minutes to finish
Clear labels and instructions	Required-field note, helper text, live character counter
Category selection	Dropdown with five options
Anonymous option	"Don't show my name" checkbox clears the name field
Responsive	Bootstrap grid, stacked form actions and full-width buttons on small screens, collapsing mobile menu
Accessible	See Section 5
Changes from the Week 1 proposal
The planned dark blue palette was replaced with red, white, and light gray.
The separate Services page was dropped. Categories now live on the Home page ("What you can report") and in the form's dropdown.
A Help Center page was added.

The Why (for these changes): Red is the university's most recognizable color association, so it makes the prototype feel like it belongs to UB students. Folding Services into Home and the form removed a page that only repeated the category list, which shortens the path from landing to submitting. The Help Center was added because a form that collects feedback raises predictable questions (Is this official? Am I anonymous? What if I make a mistake?), and answering them in one place builds trust without cluttering the form.

2. Architecture
Site map
Page	File	Purpose
Home	index.html	Introduces UB Voice, shows concern categories, explains the 3-step process, includes the intro video and calls to action
About	about.html	Explains why UB Voice was built and that it is a prototype, with campus photos
Submit a Concern	submit.html	The concern form with validation and a review step
Help Center	help.html	FAQ accordion and official UB links
Contact	contact.html	States this is a student project and links to the official UB contact page
File structure
index.html
about.html
submit.html
help.html
contact.html
css/style.css
js/main.js        (shared header/footer, form logic, toasts, back-to-top, scroll reveal)
img/logo.svg      (favicon and logo)
img/ubseal.png    (placeholder behind photos)
media/campus.jpg, photo1.jpg, photo2.jpg, photo3.jpg, poster.jpg, intro.mp4
Technical stack
Static HTML pages, one shared stylesheet, one shared script. No backend, no database, no build step.
Bootstrap 5.3.3 (layout, components) and Bootstrap Icons 1.11.3.
Google-style web fonts: Bricolage Grotesque (headings), Source Sans 3 (body).
Key implementation patterns
Shared header and footer: #site-header and #site-footer are empty containers on every page. js/main.js fills them in.
Image fallback: photos use onerror="this.remove()", so a missing image reveals the UB seal placeholder behind it instead of a broken-image icon.
Form logic (validation, 500-character counter, anonymous toggle, review modal, clear) lives in js/main.js.
The Why
Five flat pages, no nesting. The site has one job (get a concern submitted), so every page is one click from the nav. Deep hierarchy would only add steps between a frustrated student and the form.
Static HTML with no backend. This is a class prototype and must not collect real student data. A static site makes it technically impossible to leak submissions, which matches the "prototype only" promise made on the page. It also means it can be hosted anywhere and graded without setup.
Header and footer injected from one script. Navigation changes (adding a page, fixing a link) are made once in js/main.js instead of five times, which removes the most common source of inconsistency between pages. The trade-off is that the header and footer need JavaScript to appear. That is acceptable for a prototype, but a production version should render them server-side or at build time so they exist without scripts.
One stylesheet and one script. Shared files keep the look and behavior identical across pages and make the project easy to hand off: there is one place to look for styles and one for behavior.
Bootstrap 5.3.3 with pinned versions. Bootstrap provides a tested responsive grid, accordion, modal, and form styles with built-in keyboard and ARIA support, so the team's time went into the experience, not rebuilding components. Pinning versions prevents a surprise update from changing the layout.
onerror image fallback. Campus photos are the most likely assets to go missing between machines. A graceful fallback keeps the layout intact during grading or demos.
Form stays prototype-only. Connecting it to a real backend would turn it into something students might trust with real complaints. That requires official university approval, privacy handling, and a reviewer workflow, so it is deliberately out of scope.
3. Layout and Interface Structure
Global layout
Header (deep red) with logo and navigation, filled in by js/main.js.
Main content area, one main landmark per page, with a skip link before the header.
Footer, filled in by js/main.js.
Alternating white and light gray (#f4f5f7) sections to separate content blocks.
Rounded cards, simple icons, clear headings, generous spacing, subtle hover and scroll-reveal effects.
Home page (index.html)
Hero: "Tell the university what needs fixing," with Submit a concern and How it works buttons.
Quick stats: 2 min to submit, 5 categories, optional name and email.
What you can report: Campus facilities, Student services, Academic concerns, Suggestions.
Three steps, about two minutes: choose a category, describe what happened, review and confirm.
Intro video walkthrough.
Closing call to action: "Ready to be heard?"
Submit form (submit.html)
Fields: Full name (optional), Email (optional), Category (required), Message (required).
Categories: Campus facilities, Student services, Academic concern, Suggestion, Other.
Anonymous option: "Don't show my name" clears the name field.
Message limit: 500 characters with a live counter.
Validation: errors appear under each field as the student types.
Review step: "Review and submit" opens a confirmation summary (category and message) with "Go back and edit" and "Submit concern."
Clear form resets everything.
Prototype notice is visible on the page.
Help Center FAQ (help.html)
Does this send my concern to UB? No, it is a prototype; use official UB channels.
Can I stay anonymous? Yes, using "Don't show my name."
What can I report? Facilities or services, academic concerns, ideas for campus life.
I made a mistake in the form. What now? Inline errors, the review summary, and the option to go back and edit.

Official links: the UB website and the UB contact page.

Responsive behavior

Bootstrap grid columns stack on small screens, the nav collapses into a mobile menu, form action buttons become full-width and stacked.

The Why
Hero states the task in plain language. "Tell the university what needs fixing" says what the site does and who it is for in one line, with the primary action ("Submit a concern") placed right next to it. A student arriving with a problem should not need to read anything else to know where to click.
Quick stats right under the hero. "2 min," "5 categories," and "optional name and email" answer the three hesitations that stop people from reporting: effort, confusion, and exposure.
Categories before the process. Students first need to see that their problem type is covered, then how the process works. This order reduces the "is this even the right place?" doubt.
Three-step explainer. A short, numbered process sets expectations and lowers the perceived effort of the form. The final step, review and confirm, previews the safety net before the student starts.
Only two required fields. Name and email are optional because requiring identity discourages honest reports about sensitive issues. Category and message are the minimum the university would need to route and understand a concern, so they are the only mandatory ones.
Optional anonymity via a checkbox that clears the name. Clearing the field, instead of merely hiding it, makes the choice visible and reversible and prevents a name from being submitted by accident.
500-character limit with a live counter. The limit pushes students to be specific and concise, which makes concerns easier to triage. The live counter prevents the frustration of discovering the limit only after hitting submit.
Inline validation as the student types. Errors next to the field they belong to are quicker to fix than a list at the top of the page, and catching them early avoids a failed submission.
Review step before submitting. A confirmation summary gives a final chance to catch mistakes (error prevention) and makes "Go back and edit" a low-risk escape, which supports the Help Center answer for FAQ 4.
Prototype notice on the page, and FAQ 1 and the Contact page. Students could mistake this for an official channel and believe a concern was reported. Repeating the disclaimer where trust decisions happen, and pointing to official UB links, is the honest and safe choice.
Alternating white and gray sections with rounded cards. Background shifts mark where one idea ends and the next begins without heavy borders, which keeps the page scannable and friendly.
Mobile-first stacking and full-width buttons. Students are likely to report issues from a phone while on campus, so tap targets must be large and the form must work in one column.
4. Design Tokens
Color tokens
Token	Value	Role
Primary red	#b3122b	Header, primary buttons, accents
Dark red	#8e0d22	Hover and pressed states
Soft red tint	#fbe9ec	Subtle backgrounds, highlights, icon chips
Ink	#1d1d22	Body text and headings (near-black)
Light gray	#f4f5f7	Alternate section backgrounds
White	#ffffff	Main page and card backgrounds
Gold focus	#ffbf47	Keyboard focus outline
Typography tokens
Role	Font
Headings	Bricolage Grotesque
Body text	Source Sans 3
Component and effect tokens
Rounded corners on cards and buttons.
Generous spacing between sections and inside cards.
Subtle hover effects and scroll-reveal animations (disabled under prefers-reduced-motion).
Icons: Bootstrap Icons 1.11.3, kept simple and consistent in style.
The Why
Red as the primary. Red carries the university's identity and signals importance, which suits a "report a problem" tool. It also gives the primary action a clear, single color to attach to.
Contrast of the core pair. By calculation, #b3122b against white is roughly 6.9:1 and #1d1d22 against white is above 15:1, both comfortably above the WCAG AA minimum of 4.5:1 for body text. White text on the red header and buttons has the same ratio as red on white. These are hand-calculated figures, so re-check them with a contrast tool if the colors change.
Dark red for hover. Hover feedback should be visible but still feel like the same color family. A darker shade of the primary does that, and it keeps white button text readable.
Soft red tint. It extends the brand into backgrounds and icon containers without competing with the primary for attention, and it keeps the page from feeling like walls of saturated red.
Near-black ink instead of pure black. It keeps strong contrast but softens the harshness on white, which makes longer text more comfortable to read.
Light gray sections. Neutral gray separates sections without introducing another hue, so red remains the only "loud" color and therefore the one that guides the eye to actions.
Gold focus outline. Gold is distinct from the red brand color, so a focused element never blends into a red button or header. This is the reason the outline is a separate token instead of reusing the primary.
Bricolage Grotesque for headings. It has personality and feels modern and student-friendly, which gives the site a voice that does not look like a stiff administrative form.
Source Sans 3 for body text. It is designed for legibility at small sizes and on screens, so form labels, helper text, and FAQ answers stay easy to read. Pairing an expressive heading font with a neutral body font keeps the personality in the headings and the readability in the content.
Rounded cards and generous spacing. Rounded shapes feel approachable, and spacious layouts reduce the intimidation of a form, which matters when the person filling it out may already be frustrated.
Subtle motion, with a reduced-motion escape. Hover and scroll-reveal add polish, but motion can cause discomfort or distraction for some users, so it is kept small and switched off when the user's system asks for less motion.
Tokens recorded here, not just in CSS. Writing the values and roles down means a future contributor changes the palette deliberately instead of eyeballing a new red on one page.
5. Accessibility
Implemented features
Skip-to-content link on every page.
Visible focus outlines (gold #ffbf47).
Labeled form fields, with aria-describedby linking each field to its error message.
Modal (review step) with proper labelling.
Reduced-motion support using prefers-reduced-motion.
alt text on images.
Responsive layout that works on small screens and with zoom.
Bootstrap components (accordion, modal, collapsing menu) that include keyboard and ARIA behavior.
Text-based content and instructions, so nothing essential is conveyed by color or images alone (errors appear as text under the field).
The Why
Skip link. Keyboard and screen reader users would otherwise tab through the full header on every page. Because the header is injected on all five pages, the skip link saves that repeated effort everywhere.
Visible focus outlines. Anyone navigating by keyboard needs to see where they are. Removing the default outline is a common failure, so a clear custom one is part of the design, not an afterthought.
Labeled fields. A visible label tied to each input gives screen readers a name for the field and gives everyone a bigger click target. Placeholder-only labels disappear as soon as typing starts, so they are not used as the label.
aria-describedby on errors. Because validation runs as the student types, the error must be announced in connection with its field. Linking the message to the input means assistive technology reads the problem and the field together, instead of the user hunting for red text.
Errors in text, not just color. Red alone cannot be relied on by people with color vision deficiency, and red is also the brand color, so error text and placement carry the meaning.
Properly labelled modal. The review step is where a student confirms what they are about to send. If a screen reader user cannot tell that a dialog opened or what it is for, they cannot complete the flow. Labelling it and using Bootstrap's focus handling keeps the keyboard inside the dialog until it closes.
Reduced motion. Scroll-reveal and hover effects can trigger discomfort for people with vestibular sensitivities. Respecting prefers-reduced-motion honors the user's own system setting without requiring them to find a toggle on the site.
alt text, with a fallback that stays meaningful. Campus photos carry context for sighted users, and alt text gives the same context to others. The seal placeholder shown if a photo is missing keeps the layout meaningful too.
Responsive design as an accessibility feature. Low-vision users who zoom, and students on small phones, both depend on content reflowing into one column instead of scrolling sideways.
Plain language and a short form. Simple wording, helper text, and only two required fields reduce cognitive load, which benefits students with attention or reading difficulties as well as anyone reporting under stress.
Honest prototype notices. Making clear what the site does and does not do is part of accessibility of understanding: a user should not be misled about whether a concern was actually reported.
Known gaps and things to verify
Gold focus outline on white backgrounds. Gold (#ffbf47) has low contrast against white, which can fall below the 3:1 that WCAG recommends for focus indicators. It stands out well against the red header and buttons, but if it is used alone on white, consider adding a dark inner or outer ring (for example, a #1d1d22 ring beside the gold one).
Header and footer depend on JavaScript. Users with scripts disabled would not see navigation. See the architecture note above.
Video. Confirm the intro video has captions or a transcript if it contains speech.
Testing. Run a keyboard-only pass on every page and a screen reader check on submit.html, including the modal, before calling accessibility complete.
Notes for Whoever Continues This
Header and footer are edited in js/main.js, not in the HTML files.
Keep the form prototype-only unless a real backend and official university approval are added.
If you change a color, update the token table in Section 4 and re-check contrast.
To extend: connect the form to a database, add a reviewer dashboard, and let students track the status of a submission.
