## UB Voice: Student Concern Portal
## Final Project Handoff

### Project Overview
UB Voice is a student concern portal prototype for the University of Baguio. It gives students one simple place to report problems, share concerns, and send suggestions about their university experience. It is an HCI class project and a prototype only: nothing typed into the form is sent or stored, and it is not an official university channel.

### User Problem
Students notice problems first, but there is not always an easy place to report them. Messages end up scattered across different channels, and students may not know which office to approach. A single, clearly organized portal makes submitting feedback easier to understand and faster to complete.

### Target Audience
- University of Baguio students (primary users who submit concerns)
- Student representatives and authorized university personnel who would review submitted concerns in a full version

### Final Design Direction
A clean, modern, student-friendly look built around a deep red header and accents, white backgrounds, light gray sections, and near-black text.

- **Colors:** red `#b3122b` (primary), dark red `#8e0d22` (hover), soft red tint `#fbe9ec`, ink `#1d1d22`, light gray `#f4f5f7`, gold focus outline `#ffbf47`
- **Fonts:** Bricolage Grotesque (headings), Source Sans 3 (body text)
- **Framework and icons:** Bootstrap 5.3.3 and Bootstrap Icons 1.11.3
- **Style:** rounded cards, simple icons, clear headings, generous spacing, subtle hover and scroll-reveal effects

*Change from the Week 1 proposal: the planned dark blue palette was replaced with red, white, and light gray in the final build.*

### Final Site Structure

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Introduces UB Voice, shows the concern categories, explains the 3-step process, includes an intro video and calls to action |
| About | `about.html` | Explains why UB Voice was built and that it is a prototype, with campus photos |
| Submit a Concern | `submit.html` | The concern form with validation and a review step |
| Help Center | `help.html` | FAQ accordion and official UB links |
| Contact | `contact.html` | States that this is a student project and links to the official UB contact page |

*Change from the Week 1 proposal: there is no separate Services page. Concern categories now appear on the Home page ("What you can report") and in the form's category dropdown. A Help Center page was added.*

### Home Page Content
- Hero: "Tell the university what needs fixing," with **Submit a concern** and **How it works** buttons
- Quick stats: 2 min to submit, 5 categories, optional name and email
- "What you can report": Campus facilities, Student services, Academic concerns, Suggestions
- "Three steps, about two minutes": choose a category, describe what happened, review and confirm
- Intro video walkthrough
- Closing call to action: "Ready to be heard?"

### Submit Form
- **Fields:** Full name (optional), Email (optional), Category (required), Message (required)
- **Categories:** Campus facilities, Student services, Academic concern, Suggestion, Other
- **Anonymous option:** the "Don't show my name" checkbox clears the name field
- **Message limit:** 500 characters with a live counter
- **Validation:** errors appear under each field as the student types
- **Review step:** "Review and submit" opens a confirmation summary (category and message), with "Go back and edit" and "Submit concern" buttons
- **Clear form** button resets everything
- Prototype notice is shown on the page; nothing is transmitted or stored

### Help Center FAQ
1. Does this send my concern to UB? (No, it is a prototype; use official UB channels.)
2. Can I stay anonymous? (Yes, using "Don't show my name.")
3. What can I report? (Facilities or services, academic concerns, ideas for campus life.)
4. I made a mistake in the form. What now? (Inline errors, review summary, and the option to go back and edit.)

Official links: UB website and the UB contact page.

### Interface Goals and How They Were Met
- **Simple submission:** short form, only two required fields, about two minutes to complete
- **Clear labels and instructions:** required-field note, category dropdown, helper text, character counter
- **Category selection:** dropdown with five options
- **Anonymous option:** checkbox that clears the name field
- **Responsive:** Bootstrap grid, full-width buttons and stacked form actions on small screens, mobile collapsing menu
- **Accessible:**
  - skip-to-content link on every page
  - visible focus outlines
  - labeled form fields with `aria-describedby` error messages
  - modal with proper labelling
  - reduced-motion support (`prefers-reduced-motion`)
  - `alt` text on images

### File Structure
```
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
```

### Notes for Whoever Continues This
- The header and footer are empty containers (`#site-header`, `#site-footer`) filled in by `js/main.js`, so they appear on every page from one place.
- Photos use `onerror="this.remove()"`, so a missing image falls back to the UB seal placeholder instead of showing a broken icon.
- Keep the form prototype-only unless a real backend and an official university approval are added.
- To extend: connect the form to a database, add a reviewer dashboard, and let students track the status of a submission.
