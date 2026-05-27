


let librosLeidos = [];

function agregarLibro(titulo) {
    librosLeidos.push(titulo);
    console.log(`Libro agregado: ${titulo}`);
}


function mostrarLibrosLeidos() {
    console.log("\nLibros leídos:");
    for (let i = 0; i < librosLeidos.length; i++) {
        console.log(`${i + 1}. ${librosLeidos[i]}`);
    }
    
    if (librosLeidos.length === 0) {
        console.log("No hay libros en la lista.");
    }
}


console.log("=== SISTEMA DE SEGUIMIENTO DE LIBROS ===\n");

mostrarLibrosLeidos();

agregarLibro("Cien años de soledad");
agregarLibro("El principito");
agregarLibro("1984");

mostrarLibrosLeidos();
