Project Handoff: UB Voice (Student Concern Portal)

HCI class prototype for the University of Baguio. 

Live site: https://acosta0112.github.io/EXAM-LAB/
Repository: https://github.com/Acosta0112/EXAM-LAB.git

What it is. Students notice campus problems first, but there is no single obvious place to report them. Messages scatter across channels and students do not know which office to approach. UB Voice is a five-page static site (Home, About, Submit a Concern, Help Center, Contact) built around one job: getting a concern submitted in about two minutes.

Changes from the Week 1 proposal. The dark blue palette became red, white, and light gray. The separate Services page was removed, because the categories now appear on Home ("What you can report") and in the form's category dropdown. A Help Center page was added.

1. Architectural Logic (Exam Criteria: 12 pts)
Design Choice: I used Flexbox for one-dimensional flow and Bootstrap's 12-column grid (itself built on Flexbox) for the page layout, and I use native CSS Grid only where two axes must align inside a small component. I did not use CSS Grid for whole-page layout, and the reason is practical: every page is a stack of full-width sections whose columns only need to wrap and stack at known widths, which the Bootstrap .row / .col-* classes handle with tested breakpoints, so my effort went into the interface instead of re-building layout plumbing.
Flexbox (css/style.css): body is a column flexbox with main{flex:1 0 auto} and footer{margin-top:auto}, so the footer sits at the bottom of the viewport even on the short Contact page (a sticky footer without fixed heights). Flexbox also lays out .brand, .badge-soft, .links a, the CTA band and the form action buttons, which are all single rows that need to align on one axis and switch to a column on small screens (flex-direction:column).
CSS Grid (css/style.css): .feature i and .steps li::before use display:grid; place-items:center to center an icon or number in a fixed square with two declarations, and #toasts uses display:grid; gap to stack notifications with consistent spacing.
Bootstrap grid (HTML): page sections use .row with .col-lg-7 / .col-lg-5, .col-sm-6 .col-lg-3, .col-md-6, and so on, so one set of classes controls how many columns appear at each width.
Structural Flow (header to footer):
Skip link (.skip-link) is the first focusable element, so keyboard users can jump straight to <main id="main">.
<header class="site" id="site-header"> is an empty container on every page, filled by js/main.js. Why: the navigation is written once, so adding or fixing a link updates all five pages and the pages cannot drift apart. Trade-off: the navigation needs JavaScript. A production version should render it at build or server time.
<main id="main"> holds <section> blocks ordered by what a student needs to decide. On Home: hero ("Tell the university what needs fixing") with the primary button, then quick stats (2 min, 5 categories, optional name and email), then "What you can report," then the three-step process with the intro video, then the closing call to action. Why this order: a student first needs to know this is the right place (hero), that it is cheap and safe (stats), that their kind of problem is covered (categories), and how it works (steps) before being asked to act (call to action).
<footer class="site" id="site-footer"> is also injected by js/main.js. The site is flat on purpose: five pages, each one click from the nav, because it has a single task and extra depth would only put steps between a frustrated student and the form.
Form architecture (submit.html): only Category and Message are required. Name and email are optional because demanding identity discourages honest reports. The "Don't show my name" checkbox clears the name field, so a name cannot be submitted by accident. Messages are capped at 500 characters with a live counter to encourage specific, easy-to-triage reports. Errors appear under the field as the student types, and "Review and submit" opens a confirmation modal (category and message) with "Go back and edit" and "Submit concern" as an error-prevention step.
Why a static site with no backend: the prototype must not collect real student data. A static site makes leaking submissions impossible, which matches the "prototype only" notice shown on the page. Connecting a database, a reviewer dashboard, and status tracking is future work that would need official university approval.
2. Design Token System (Exam Criteria: 12 pts)

All tokens are declared in one :root block at the top of css/style.css.

Color Palette:
Token	Value	Used for	Why
--primary-color	#b3122b	Header, primary buttons, icons, step numbers, CTA band, stat numbers, focus borders	Red carries UB's identity and signals importance, which suits a "report a problem" tool; one main color keeps the primary action obvious
--primary-dark	80% primary mixed with black (about #8e0d22)	Hover and pressed states, active accordion text	Derived with color-mix(), so the hover state is always a darker version of whatever the primary is
--primary-tint	9% primary mixed with white (about #f8eaec)	Soft backgrounds, icon chips, hero gradient	Extends the brand into backgrounds without competing with the primary
--ink	#1d1d22	Body text, footer background	Near-black keeps strong contrast and is less harsh than pure black on white
--mute	#5d6068	Secondary text	Visually quieter text that still passes contrast
--mist	#f4f5f7	Alternating section backgrounds	A neutral gray separates sections without a second hue, so red stays the only loud color
--line, --field-border	#d9dbe0, #8a8d94	Card borders, form field borders	Form fields get a darker border so inputs are easy to see
--focus-color	#ffbf47	Keyboard focus outline	Distinct from the red brand, so a focused red button never blends in
--white, --black, footer and placeholder neutrals	various	Surfaces, video background, footer text	Named so no raw hex appears outside :root
Typography: --font-heading is Bricolage Grotesque (personality, modern, student-friendly) and --font-body is Source Sans 3 (built for legibility at small sizes, which matters for labels, helper text and FAQ answers). Pairing an expressive heading face with a neutral body face keeps the personality in headings and the readability in the content.
Scale: --text-xs .82rem, --text-sm .9rem, --text-md 1rem, --text-base 1.05rem (body), --text-lg 1.15rem, --text-xl 1.3rem, --text-icon 1.4rem, --text-stat 1.8rem.
Fluid sizes: --text-h1: clamp(2rem, 5vw, 3.3rem), --text-h2: clamp(1.5rem, 3vw, 2rem), --text-lead: clamp(1.05rem, 2vw, 1.2rem). Why: headings scale smoothly with the viewport instead of jumping at breakpoints, and the rem floor keeps them readable on a 320px phone.
Spacing: --space-2xs .3rem, --space-xs .5rem, --space-sm .75rem, --space-md 1rem, --space-lg 1.4rem, --space-xl 2rem, plus fluid section tokens --space-section, --space-hero, --space-form, --space-band (all clamp()). Why a scale: a fixed set of steps makes "generous spacing" a rule instead of a guess, and padding is never a one-off pixel value. Why fluid section spacing: sections breathe on desktop and compact on phones without extra media queries.
Other tokens: radius (--radius-sm 6px, --radius 10px, --radius-lg 12px, --radius-pill 99px), borders (--border-width, --border-width-strong, --focus-width), sizes (--size-tap 3rem for the minimum field height, --size-icon, --size-step, --header-offset), shadows (--shadow, --shadow-header, --focus-ring), motion (--time-fast, --time, --time-slow, --lift, --reveal-shift) and z-index layers (--z-header, --z-top, --z-toast). Why: rounded corners make the interface feel approachable, a single shadow and one set of timings keep hover and reveal effects consistent, and named z-index layers stop stacking conflicts between the sticky header, the back-to-top button and the toasts.
System Proof: All styles are linked to these variables. Changing --primary-color in :root recolors the header, every primary button, the icon chips, step numbers, stat numbers, the CTA band, link hovers and form focus borders on all five pages at once, because no rule outside :root contains a raw hex value. The hover color and tint are derived from the primary, so they follow automatically. Verification: search css/style.css for # and you will find color values only inside :root.
Compatibility note: four legacy aliases (--red, --red-d, --red-t, --r) point at the new tokens in case any script still reads the old names. They add no new values.
Limit: media queries cannot read CSS variables, so the two custom breakpoints (575px, 767px) are written as literals and documented in Section 3.
3. Responsive Fluidity (Exam Criteria: 12 pts)

The layout combines Bootstrap's grid breakpoints (set by the column classes in the HTML) with two custom media queries in css/style.css. The exam's three tiers map onto them as follows.

Mobile Breakpoint [< 768px]: One column. All Bootstrap columns stack (.col-md-*, .col-lg-* only apply above their breakpoint). The navigation collapses behind the toggle, and the custom @media (max-width:767px) rule gives the open menu comfortable tap spacing and a full-width "Submit" button. Below 576px, @media (max-width:575px) makes the hero buttons full width and stacks the form action buttons. Category cards go single column. Why: students are most likely to report problems from a phone on campus, so tap targets must be large (form fields have a 3rem minimum height) and nothing may require sideways scrolling.
Tablet Breakpoint [768px - 1024px]: The navigation expands into a horizontal bar at 768px. Category cards sit two per row (.col-sm-6, from 576px). The About page, Help Center, Contact page and form name/email row switch to side-by-side columns at 768px (.col-md-*). The hero and the steps/video block stay stacked until 992px. Why: two-column cards use the extra width without making lines too long to read, while the hero keeps full width until there is enough room for text and photo to sit side by side.
Desktop Breakpoint [> 1024px]: From Bootstrap's 992px lg breakpoint, the hero shows text and photo side by side (7 + 5 columns), the category cards sit four per row (.col-lg-3), and the three-step list sits beside the video. Content is held in .container-lg, which caps the width, so line length stays readable up to 1920px instead of stretching edge to edge. Why 992px and not 1024px: the layout changes where the content needs it (four cards no longer fit comfortably below that width), using Bootstrap's standard breakpoint instead of a device-specific number.
Why these breakpoints: they are placed where the content starts to look cramped or stretched, not at specific device sizes. 575px and 767px are one pixel under Bootstrap's sm (576px) and md (768px) breakpoints, so my custom rules switch at exactly the same widths as the grid and the two systems never disagree.
Fluid techniques beyond breakpoints: clamp() for headings, lead text and section padding; aspect-ratio on photos and video so media keeps its shape without fixed heights; img, video { max-width:100% }; object-fit:cover on photos; min-height:100dvh on body so mobile browser toolbars do not cut off the layout.
Fluidity Check: The site maintains design integrity without horizontal scrollbars from 320px to 1920px. No element has a fixed width wider than the viewport: containers, cards and images use relative widths, and the only fixed sizes are small icons and buttons.
4. Accessibility & Performance (Exam Criteria: 12 pts)
Lighthouse Score: [FILL IN: Accessibility score from the live GitHub Pages URL. Run it on the live link in an incognito window and enter the number here. Add Performance, Best Practices and SEO if you want.]
Compliance and The Why:
Semantic landmarks and document outline: every page has one <header>, one <main id="main">, one <footer>, content grouped in <section>, <figure> for photos, <address> for the university contact, <ol> for the three steps, and <html lang="en">. Headings go in order (h1 then h2 then h3) with exactly one h1 per page. Why: screen reader users navigate by landmark and heading, so structure is how they find the form.
Skip link: .skip-link is the first focusable element on every page and jumps to #main. Why: the same header repeats on all five pages, so keyboard users would otherwise tab through it every time.
Focus visibility: :focus-visible shows a 3px gold outline with an offset on every interactive element. Why: keyboard users must always see where they are, and a custom visible outline is part of the design rather than the browser default. [VERIFY: gold has low contrast on white; see the note in the audit checklist below.]
Form labels and errors: every input has a visible <label for>; required fields use required and a * in the label; email, category and message are linked to their error text with aria-describedby; the message field is also linked to the character counter; the status area (#formAlert) has role="status". Why: validation runs while the student types, so an error must be announced together with its field. Errors are text next to the field, not color alone, because red is also the brand color.
Review modal: the confirmation dialog uses Bootstrap's modal with aria-labelledby="confirmTitle" and a close button with aria-label="Close". Why: the confirmation step is where the student decides to send, so a screen reader user must be told a dialog opened and what it is for, and focus must stay inside it until it closes.
FAQ accordion: each question is a real <button> inside a heading with aria-expanded, so state is announced and the whole accordion works from the keyboard.
alt text strategy: every informative image has descriptive alt text that says what the picture shows ("University of Baguio campus", "Students on campus", "Campus grounds", "Campus building"). If a photo fails to load, onerror="this.remove()" reveals the UB seal placeholder (.photo background) so the layout does not break. Decorative icons come from an icon font and sit beside visible text labels, so no meaning is carried by an icon alone.
External links: target="_blank" links use rel="noopener".
Motion: @media (prefers-reduced-motion: reduce) turns off animations and transitions and shows scroll-reveal content immediately. Why: motion can cause discomfort for some users, so it is small and respects the system setting.
Readable defaults: body text is 1.05rem with 1.6 line height, secondary text still passes contrast, and white on the red header and buttons is about 6.9:1 (hand-calculated; confirm with a checker), above the WCAG AA minimum of 4.5:1.
Performance: the site is static HTML, one stylesheet and one script, with the video loaded as preload="metadata" and given a poster image, so it does not download until played. [FILL IN: Performance score from the same Lighthouse run.]
Lighthouse Score Snapshot
5. BEM Component Index (Exam Criteria: 12 pts)

Naming convention, stated honestly. Components are styled by single-purpose block classes written in css/style.css, combined with Bootstrap utility classes in the HTML. Right now a block's child parts are targeted with descendant selectors (for example .feature i) and its variants are standalone classes (for example .photo-sm) instead of block__element and block--modifier names. The index below documents every component as it exists, then maps each one to the BEM name it would take.

Block	Function	Elements (current selectors)	Modifiers (current classes)	BEM migration name
.skip-link	Keyboard shortcut to #main	none	:focus state	.skip-link (no change)
header.site	Sticky red site header, filled by js/main.js	.brand, .nav-link, .navbar-toggler	.scrolled (shadow after scrolling), .nav-link.active (current page)	.site-header__brand, __link, .site-header--scrolled, __link--active
footer.site	Dark footer with links and prototype note	h2, ul, li, .foot-note	none	.site-footer__heading, __note
.hero	Home page introduction with headline and two buttons	.badge-soft, .lead, .btn	none	.hero__badge, __lead
.screen	Standard page section with fluid vertical padding	child content	.alt (gray background)	.section, .section--alt
.feature	Category card on Home	i (icon chip), h3, p	:hover lift	.feature__icon, __title, __text
.stat	Quick-stat figure	strong, span	none	.stat__value, __label
.steps	Numbered three-step list with CSS counters	li, li::before (number), strong	none	.steps__item, __number
.cta-band	Closing call-to-action strip	h2	none	.cta-band__title
.photo	Framed image with seal placeholder behind it	img	.photo-sm (square crop)	.photo__img, .photo--sm
.btn-red, .btn-cta	Primary red button and white-on-red button	none	:hover, :active, .active	.btn--primary, .btn--inverse
.form-card	Card around the concern form	.form-label, .form-control, .form-select, .form-check-input, .count	.count.warn (near the 500 limit), .form-actions stacks below 576px	.concern-form__label, __counter, .concern-form__counter--warn
.accordion-* (Bootstrap)	Help Center FAQ	.accordion-item, .accordion-button	:not(.collapsed) open state	.faq__item, __question, .faq__question--open
.links	Official UB link list	a, i, small	none	.link-list__item, __icon, __hint
#toasts, #toTop	Toast notifications and back-to-top button	toast items	#toTop.show	.toast-stack, .back-to-top--visible
.reveal	Scroll-reveal wrapper	child content	.in (revealed)	.reveal--visible

Why this structure: block classes keep each component's styles in one place with low specificity, so a component can be changed without side effects on other pages. State classes (.scrolled, .show, .in, .active) are toggled by js/main.js, which keeps behavior in JavaScript and appearance in CSS. Bootstrap classes (.row, .col-*, .btn, .accordion-*, .form-control, .modal) provide layout and tested component behavior, and the custom blocks above add the UB Voice look on top.

Notes for Whoever Continues This
Header and footer markup lives in js/main.js, not in the HTML files.
Photos use onerror="this.remove()", so a missing image falls back to the UB seal placeholder.
Change colors only in :root; never type a hex value in a rule.
Keep the form prototype-only unless a real backend and official university approval are added.
To extend: connect the form to a database, add a reviewer dashboard, and let students track submission status.
File Structure
index.html, about.html, submit.html, help.html, contact.html
css/style.css
js/main.js        (shared header/footer, form logic, toasts, back-to-top, scroll reveal)
img/logo.svg      (favicon and logo)
img/ubseal.png    (placeholder behind photos)
media/campus.jpg, photo1.jpg, photo2.jpg, photo3.jpg, poster.jpg, intro.mp4
assets/images/audit.png   (Lighthouse screenshot, add before submitting)
HANDOFF.md        (repository root)
