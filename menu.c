#include "menu.h"
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#define EXPORT EMSCRIPTEN_KEEPALIVE
#else
#define EXPORT
#endif

EXPORT int mid_index(int lo, int hi)   { return lo + (hi - lo + 1) / 2; }
EXPORT int affordable(int p, int b)    { return p <= b; }
EXPORT int next_lo(int lo, int mid)    { (void)lo; return mid; }
EXPORT int next_hi(int hi, int mid)    { (void)hi; return mid - 1; }
EXPORT int optimal_steps(int n)        { int s = 0; while (n > 1) { n = (n + 1) / 2; s++; } return s; }

int find_best(const int *prices, int n, int budget) {
    if (n <= 0 || prices[0] > budget) return -1;
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = mid_index(lo, hi);
        if (affordable(prices[mid], budget)) lo = next_lo(lo, mid);
        else hi = next_hi(hi, mid);
    }
    return lo;
}
