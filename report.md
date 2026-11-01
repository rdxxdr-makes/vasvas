# Menu Organization Strategies for Faster Ordering

## Summary
When a menu is sorted by price, finding a dish within budget becomes a **binary search**: compare the budget with the midpoint dish and discard half the list. For our 31-item menu this takes at most 5 comparisons, versus up to 31 for scanning an unsorted list.

## How the game teaches it
1. A budget is shown. The player must find the priciest affordable dish.
2. The player compares the **midpoint** item's price with the budget.
3. If the midpoint is affordable, the answer is at or above it; otherwise it is below. The range halves each step.
4. The game records steps, mistakes and score, and shows the optimal step count (⌈log₂ n⌉).

## Strategies
- **Sort by price within sections.** Keep Starters, Mains and Desserts, each ascending by price, so diners locate a budget band quickly.
- **Use price anchors.** Mark a few "midpoint" dishes (e.g. every 5th item) so diners can jump near their budget.
- **Limit section length.** Binary search helps most beyond ~10 items; short lists of 5–7 items can simply be scanned.
- **Show prices in a consistent aligned column** so comparisons are visual, not read item by item.
- **Offer filters** (under ₹300, ₹300–600, 600+) for digital menus; this is a precomputed form of the same search.
- **Highlight best-value or popular dishes** separately; these shortcuts should not break the sorted order.

## Cost comparison
| Menu size | Linear scan (worst) | Binary search (worst) |
|---|---|---|
| 8 | 8 | 3 |
| 31 | 31 | 5 |
| 100 | 100 | 7 |

## Implementation note
The core logic (`mid_index`, `affordable`, `find_best`) is written in C (`c/menu.c`). It powers the terminal game (`c/game_cli.c`) and can be compiled to WebAssembly for the website; a JavaScript port is used automatically if the wasm file is absent.

## Limitations
Sorting by price alone ignores cuisine, dietary needs and taste, so real menus combine price order with category grouping.
