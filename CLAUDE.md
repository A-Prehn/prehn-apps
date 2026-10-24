# Projekt: apps.prehn.net

Statisk side for virksomheden Prehn apps (CVR 40316191) og dens apps. Ingen build-step.

- `/` — forside for Prehn apps
- `/vores-familie/` — landingsside for iOS-appen Vores familie (markedsføring)
- `/vores-familie/support/` — support- og hjælpeside (Support URL i App Store)
- `/vores-familie/privatliv/` — privatlivspolitik (Privacy Policy URL i App Store; linket fra appens paywall)

## Git workflow
- Push altid til `develop` først (preview-URL fra Cloudflare Pages).
- Vent på eksplicit "push til main" før der merges til main.

## Hold siden opdateret
Når appen Vores familie ændres (funktioner, Premium, tilladelser, menustier, datahåndtering), opdateres
`vores-familie/support/index.html` (FAQ), `vores-familie/index.html` (landing) og evt. `vores-familie/privatliv/index.html` i samme omgang. Push til develop;
main først ved "push til main", typisk når den nye app-version er live.

## Gamle adresser
`_redirects` viderestiller `/vores-familie/landing` til `/vores-familie/` (Cloudflare Pages).
