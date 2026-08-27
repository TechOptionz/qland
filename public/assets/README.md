# Assets

| File | Used by |
|---|---|
| `qland-logo.png` | Site header and favicon |
| `brand-loop.mp4` | Home hero background loop (1280×720, 20s, faststart) |
| `boutique/*.jpg` | Boutique Chevron Island project page |

## Boutique Chevron Island renders

The live page at qland.com.au/boutiquechevronisland embeds the project's own
marketing site in an iframe, which ships its renders base64-encoded inside the
page bundle. They were extracted from there and are mapped in
`boutique.images` in `src/lib/pages.ts`.

| File | Shows |
|---|---|
| `aerial-tower.jpg` | The tower on Chevron Island, Surfers Paradise behind (hero, 2044×1240) |
| `aerial-island.jpg` | Chevron Island, the Nerang River, and the skyline |
| `living.jpg` | Open-plan living with floor-to-ceiling glazing |
| `living-balcony.jpg` | Living room opening to the balcony |
| `kitchen.jpg` | Island bench, pendant lighting, integrated appliances |
| `bathroom.jpg` | Stone benchtop, timber joinery, gunmetal fixtures |
| `pool.jpg` | Pool deck on the communal leisure level |
| `terrace.jpg` | Communal terrace overlooking the city |

`living-balcony.jpg` is extracted but not currently placed on the page — it is
there if another slot is wanted.

The project site also has a "watch the film" call to action. There is no film
behind it: the source marks the block as a placeholder
(`<!-- Swap this placeholder for your Meta ad film -->`), so the site does not
reproduce it. Add the file here and link it when one exists.
