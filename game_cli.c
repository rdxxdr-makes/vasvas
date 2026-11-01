/* Terminal version of the dining game. Build: make ; Run: ./dining */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "menu.h"

#define N 31
static const char *names[N] = {"Garlic Bread","Tomato Soup","Masala Chai","Veg Spring Rolls","Paneer Tikka","Caesar Salad",
 "Margherita Pizza","Veg Burger","Chicken Wings","Dal Makhani","Butter Naan Basket","Pasta Arrabbiata","Mushroom Risotto",
 "Chicken Biryani","Fish & Chips","Butter Chicken","Lamb Rogan Josh","Grilled Salmon","Mutton Biryani","Prawn Curry",
 "Chicken Steak","Seafood Platter","Tandoori Platter","Lobster Thermidor","Wagyu Burger","Truffle Pasta","Lamb Chops",
 "Chef's Tasting Set","Premium Sushi Box","Beef Tenderloin","Royal Thali Feast"};
static const int prices[N] = {99,110,120,140,160,170,190,200,210,230,240,250,270,290,310,330,350,380,400,420,
 440,480,520,560,600,640,680,720,780,850,950};

int main(void) {
    srand((unsigned)time(NULL));
    int total = 0, rounds = 5;
    for (int r = 1; r <= rounds; r++) {
        int budget = prices[rand() % (N - 3) + 2] + rand() % 40;
        int lo = 0, hi = N - 1, steps = 0, miss = 0;
        int answer = find_best(prices, N, budget);
        printf("\n=== Round %d/%d === Budget: Rs.%d (find the priciest dish you can afford)\n", r, rounds, budget);
        while (lo < hi) {
            int mid = mid_index(lo, hi);
            printf("Range [%d..%d]. Midpoint: %s - Rs.%d\n", lo, hi, names[mid], prices[mid]);
            printf("Search (u)pper half or (l)ower half? ");
            char c; if (scanf(" %c", &c) != 1) return 0;
            int right = affordable(prices[mid], budget);
            if ((c == 'u' && right) || (c == 'l' && !right)) {
                if (right) lo = next_lo(lo, mid); else hi = next_hi(hi, mid);
                steps++; puts("  Correct!");
            } else { miss++; puts("  Not quite - compare the midpoint price with your budget."); }
        }
        int pts = 100 - 15 * miss; if (pts < 0) pts = 0;
        printf("Answer: %s (Rs.%d) %s | steps %d (optimal %d), mistakes %d, score %d\n", names[lo], prices[lo],
               lo == answer ? "OK" : "??", steps, optimal_steps(N), miss, pts);
        total += pts;
    }
    printf("\nFinal score: %d / %d\n", total, rounds * 100);
    return 0;
}
