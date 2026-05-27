

console.log("=== TIPOS DE DATOS EN JAVASCRIPT ===\n");

console.log("--- Ejemplos base ---");
console.log(typeof 42);                    // number
console.log(typeof 'Veinticinco');         // string
console.log(typeof -666);                  // number
console.log(typeof true);                  // boolean
console.log(typeof 0);                     // number
console.log(typeof '');                    // string (cadena vacía)
console.log(typeof null);                  // object (particularidad de JS)
console.log(typeof undefined);             // undefined
console.log(typeof FALSE);                 // undefined (FALSE no está definido, debería ser false)

console.log("\n--- Corrección de FALSE ---");
console.log(typeof false);                 // boolean (correcto)

console.log("\n--- Ejemplos adicionales ---");
console.log(typeof 3.1416);                // number (decimal)
console.log(typeof "Hola mundo");          // string
console.log(typeof 'A');                   // string (carácter individual)
console.log(typeof false);                 // boolean
console.log(typeof [1, 2, 3]);             // object (array es objeto)
console.log(typeof { nombre: "Ana" });     // object
console.log(typeof function(){});          // function
console.log(typeof NaN);                   // number (Not a Number es tipo number)
console.log(typeof Infinity);              // number

console.log("\n--- Experimentos personales ---");
console.log(typeof 100n);                  // bigint (números grandes)
console.log(typeof Symbol("id"));          // symbol
console.log(typeof new Date());            // object (fecha es objeto)
console.log(typeof /regex/);               // object (expresión regular)
