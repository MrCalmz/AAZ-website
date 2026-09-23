# AAZ Global Logistics Ventures & Autos

Premium static website for a private chauffeur and executive transportation service based in Abuja, Nigeria.

## Included
- Home, Services, Fleet, About and Contact
- Dedicated landing pages for chauffeur service, airport transfers, hotel transfers, corporate transport and interstate chauffeur travel
- Privacy page and custom 404 page
- Responsive desktop, tablet and mobile layouts
- Fixed, touch-friendly navigation with a full mobile menu
- Local vehicle imagery
- SEO titles, descriptions, Open Graph, canonical URLs, sitemap, robots.txt and structured data
- Short WhatsApp-first booking flow plus direct WhatsApp contact

## URL structure
Public page URLs are extensionless. The site uses directory index files behind clean routes:

- `/services/`
- `/fleet/`
- `/about/`
- `/contact/`
- `/chauffeur-service-abuja/`
- `/airport-transfer-abuja/`
- `/hotel-transfer-abuja/`
- `/corporate-transport-abuja/`
- `/interstate-chauffeur-nigeria/`
- `/privacy/`

The old root `.html` pages have been removed. A Render `render.yaml` is included with 301 redirects for the previous `.html` paths once the static site is deployed.

## WhatsApp
The WhatsApp number and direct-contact message are configured in `script.js` under `AAZ_CONFIG`.

Current number: `2347048894637`

## Render deployment
The repository includes `render.yaml` for a Render static-site deployment using the repository root as the publish directory. Render can connect the repo to a static site and automatically deploy future pushes to the selected branch.

After deployment, Render will provide an `onrender.com` URL. Before production use, replace the temporary GitHub Pages URL in page canonical tags, Open Graph URLs, structured-data URLs, `sitemap.xml` and `robots.txt` with the final Render/custom domain.

## Production checklist
1. Connect the repository to **Render → New → Static Site** and deploy the `main` branch.
2. Confirm the clean routes above work on the generated Render URL.
3. Replace the temporary GitHub Pages URL in canonical, Open Graph, schema, sitemap and robots references with the final Render/custom domain.
4. Confirm the actual fleet and remove any model/category that is not genuinely available.
5. Add verified phone, email, business address/service-area details and authorized hotel/corporate relationships when available.
6. Connect Google Search Console and the company's Google Business Profile.
7. Verify image ownership/licensing for every locally hosted photograph.

## SEO approach
The site avoids hidden keyword stuffing. Instead it uses clear page titles and descriptions, crawlable service pages, semantic headings, internal links, relevant service-area copy, descriptive image alt text, structured data and an XML sitemap.

## Temporary GitHub Pages demo
The repository can still be published as a temporary static GitHub Pages demo using **Settings → Pages → Deploy from a branch → main → /(root)**. Clean directory URLs use the `index.html` files inside their respective folders.

The temporary GitHub Pages URL remains in metadata until the final Render/custom domain is chosen and updated.
