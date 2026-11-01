// Budget Bites – binary search on a price-sorted menu. Uses C (WebAssembly) when menu.wasm exists, else a JS port of the same C functions.
const MENU = [["Garlic Bread",99],["Tomato Soup",110],["Masala Chai",120],["Veg Spring Rolls",140],["Paneer Tikka",160],["Caesar Salad",170],
["Margherita Pizza",190],["Veg Burger",200],["Chicken Wings",210],["Dal Makhani",230],["Butter Naan Basket",240],["Pasta Arrabbiata",250],
["Mushroom Risotto",270],["Chicken Biryani",290],["Fish & Chips",310],["Butter Chicken",330],["Lamb Rogan Josh",350],["Grilled Salmon",380],
["Mutton Biryani",400],["Prawn Curry",420],["Chicken Steak",440],["Seafood Platter",480],["Tandoori Platter",520],["Lobster Thermidor",560],
["Wagyu Burger",600],["Truffle Pasta",640],["Lamb Chops",680],["Chef's Tasting Set",720],["Premium Sushi Box",780],["Beef Tenderloin",850],["Royal Thali Feast",950]];
const N = MENU.length, ROUNDS = 5;
let E = { // JS fallback mirrors c/menu.c
  mid_index:(lo,hi)=>lo+Math.floor((hi-lo+1)/2), affordable:(p,b)=>p<=b?1:0,
  next_lo:(lo,m)=>m, next_hi:(hi,m)=>m-1,
  optimal_steps:n=>{let s=0;while(n>1){n=Math.ceil(n/2);s++}return s}, name:"JavaScript fallback (build menu.wasm to use the C engine)"};
(async()=>{ try{ const r=await WebAssembly.instantiateStreaming(fetch("menu.wasm"),{}); const x=r.instance.exports;
  E={mid_index:x.mid_index,affordable:x.affordable,next_lo:x.next_lo,next_hi:x.next_hi,optimal_steps:x.optimal_steps,name:"C engine via WebAssembly ✅"};}catch(e){}
  document.getElementById("engine").textContent="Engine: "+E.name; })();

const $=id=>document.getElementById(id);
let round=0,total=0,budget,lo,hi,mid,steps,miss;
const ul=$("menu");
function render(done){ ul.innerHTML=""; MENU.forEach(([n,p],i)=>{ const li=document.createElement("li");
  li.innerHTML=`<span>${n}</span><span>₹${p}</span>`;
  if(i<lo||i>hi) li.className="out"; if(i===mid&&!done) li.className="mid"; if(done&&i===lo) li.className="answer"; ul.appendChild(li);});
  $("steps").textContent=steps;$("miss").textContent=miss;$("score").textContent=total;$("budget").textContent="₹"+budget;$("round").textContent=round;}
function newRound(){ round++; budget=MENU[2+Math.floor(Math.random()*(N-4))][1]+Math.floor(Math.random()*40);
  lo=0;hi=N-1;mid=-1;steps=0;miss=0;
  $("msg").textContent="Compare the midpoint dish with your budget, then discard half the menu.";
  $("probe").disabled=false;$("up").disabled=$("down").disabled=true;$("next").hidden=true;render();}
$("probe").onclick=()=>{ mid=E.mid_index(lo,hi); const p=MENU[mid][1];
  $("msg").textContent=`Midpoint: ${MENU[mid][0]} at ₹${p}. Your budget is ₹${budget}. Where should you look next?`;
  $("probe").disabled=true;$("up").disabled=$("down").disabled=false;render();};
function choose(up){ const canAfford=E.affordable(MENU[mid][1],budget)===1;
  if(up===canAfford){ if(up) lo=E.next_lo(lo,mid); else hi=E.next_hi(hi,mid); steps++; mid=-1;
    $("up").disabled=$("down").disabled=true;
    if(lo===hi){ const pts=Math.max(0,100-15*miss); total+=pts;
      $("msg").textContent=`Order: ${MENU[lo][0]} (₹${MENU[lo][1]}). ${steps} steps (optimal ≤ ${E.optimal_steps(N)}), ${miss} mistakes, +${pts} pts.`;
      render(true); if(round<ROUNDS)$("next").hidden=false; else $("msg").textContent+=` Game over – final score ${total}/${ROUNDS*100}.`; return;}
    $("probe").disabled=false;$("msg").textContent="Correct! Compare the new midpoint."; }
  else{ miss++; $("msg").textContent=canAfford?"Not quite – the midpoint is affordable, so a pricier dish may still fit.":"Not quite – the midpoint is too expensive, so look at cheaper dishes."; }
  render(); }
$("up").onclick=()=>choose(true);$("down").onclick=()=>choose(false);$("next").onclick=newRound;
newRound();
