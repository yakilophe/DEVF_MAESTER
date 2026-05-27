
let frutas = ["manzana", "pera", "manzana", "naranja", "pera", "manzana", "uva"];

let contador = {};

for (let i = 0; i < frutas.length; i++) {
    let fruta = frutas[i];
    
    if (contador[fruta]) {
        contador[fruta]++;
    } else {
        contador[fruta] = 1;
    }
}


console.log("Conteo de frutas:");
console.log(contador);

console.log("\nDetalle:");
for (let fruta in contador) {
    console.log(fruta + ": " + contador[fruta] + " unidad(es)");
}
