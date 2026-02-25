# Laundry Service

Simple laundry service landing page.

## Live site (GitHub Pages)

Once Pages is enabled, the site is available at:
https://gajit9147-dev.github.io/LP

## Local preview

Open index.html in a browser.

## Development workflow

Install dependencies:

```
npm install
```

Compile Tailwind and watch for changes:

```
npm run dev
```

Create production CSS:

```
npm run build
```

Start a local server:

```
npm run start
```

Code quality:

```
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## Tech

- HTML
- Tailwind CSS (compiled output.css)
- Vanilla JavaScript

## Email setup (EmailJS)

Booking emails use EmailJS (not FormSubmit).

1. Create an EmailJS account and connect your email service.
2. In `script.js`, replace these placeholders:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `ADDMIN_TEMPLATE_ID` (or `EMAILJS_ADMIN_TEMPLATE_ID`)
   - `EMAILJS_CUSTOMER_TEMPLATE_ID`
3. In both EmailJS templates, include these variables so each email contains booking details:
   - `{{customer_name}}`
   - `{{customer_email}}`
   - `{{customer_phone}}`
   - `{{services_booked}}`
   - `{{total_price}}`
   - `{{to_email}}`
   - `{{subject}}`
