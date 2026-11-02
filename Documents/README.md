# Kota Town Website — Part 3

Kota Town is a South African street-food website project. Part 3 builds on the Part 2 responsive CSS website by adding JavaScript interactions, form functionality, validation, SEO improvements and deployment guidance.

## Pages
- `Index.html` — Home, featured menu, trading hours and FAQ accordion.
- `About.html` — Brand story, mission and vision.
- `Services.html` — Services with live search/filter.
- `Gallery.html` — Menu and listed prices with live search and image lightbox.
- `Enquiry.html` — Enquiry form for menu, order and availability questions.
- `Contact.html` — General contact form and contact details.

## Part 3 functionality
- JavaScript marks the active navigation link.
- Live search filters the services and menu cards.
- Native HTML `<details>` elements provide expandable FAQ content.
- Gallery images open in an accessible modal/lightbox.
- Forms use HTML required, type, minlength, maxlength, pattern and range validation, plus JavaScript validation and accessible error feedback.
- Valid forms use the FormSubmit AJAX endpoint to email the form data to `kotatown@gmail.com`. The recipient must activate FormSubmit using its first confirmation email. If the service is unavailable, the site falls back to a pre-filled `mailto:` message. Form data is sent to the third-party service; keep the consent notice visible and review the provider privacy terms before production use.
- CSS transitions, responsive layouts and reduced-motion support improve usability.

## SEO improvements
- Unique page titles and meta descriptions.
- Relevant keywords, author, robots and Open Graph metadata.
- Semantic headings, landmarks, descriptive image alt text and internal links.
- Mobile viewport, responsive images/layouts and readable URLs/page names.
- `robots.txt` and `sitemap.xml` included. Update sitemap URLs to the full deployed domain after publishing if your hosting provider requires absolute URLs.

## Folder structure
- `css/style.css` — responsive styles.
- `js/script.js` — JavaScript interactions and form validation.
- `Images/` — supplied project images.
- `Documents/` — proposal, README and CHANGELOG.

## How to test
1. Extract the ZIP folder and open `Index.html` in a browser, or use VS Code Live Server.
2. Test all navigation links and check the active page indicator.
3. On `Services.html`, search for a term such as `delivery` and confirm unrelated cards hide.
4. On `Gallery.html`, search for `kota`, open an image and close the lightbox using its close button or Escape key.
5. Submit each form empty to see validation errors. Enter valid data and confirm the AJAX form submission displays a success message (the FormSubmit recipient must first activate the service). If the network/service is unavailable, confirm the pre-filled email fallback opens. Do not enter real personal information for screenshots.
6. Test desktop, tablet and mobile screen widths; check keyboard navigation and browser console for errors.
7. Confirm all images load and that no links are broken.

## Part 2 feedback
The lecturer's Part 2 mark sheet/feedback was not included with the supplied ZIP. Therefore, no lecturer-specific corrections can be claimed as completed. Add each actual feedback item and the correction made to the CHANGELOG once the feedback is available.

## GitHub submission
From the project root, run:
```bash
git add .
git commit -m "Complete Part 3 JavaScript, forms and SEO enhancements"
git push
```
Submit your GitHub repository URL through the Learning Management System.

## Free deployment
A simple option is GitHub Pages:
1. Push the project to a GitHub repository.
2. Open repository **Settings → Pages**.
3. Under Build and deployment, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. Wait for the published URL to appear, open it and test every page and form.

Other free static hosting options include Netlify and GitHub Pages. A static host cannot process forms by itself. This project uses FormSubmit as an external AJAX form service; activate the recipient email before testing live submissions and review its privacy terms. For database storage or more control, connect a dedicated backend and update the privacy notice.
