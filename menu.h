#ifndef MENU_H
#define MENU_H
/* Core binary-search helpers shared by the CLI game and the WebAssembly build. */
int mid_index(int lo, int hi);          /* upper midpoint of [lo,hi] */
int affordable(int price, int budget);  /* 1 if price <= budget */
int next_lo(int lo, int mid);           /* new lo if mid is affordable */
int next_hi(int hi, int mid);           /* new hi if mid is too expensive */
int optimal_steps(int n);               /* worst-case comparisons, ceil(log2 n) */
int find_best(const int *prices, int n, int budget); /* index of priciest affordable dish, -1 if none */
#endif
