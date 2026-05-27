
const libro = {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967,
    estado: "disponible",
    
    // Método para describir el libro
    describirLibro: function() {
        return `Libro titulado ${this.titulo}, escrito por ${this.autor} en el año ${this.anio}, el estado es: ${this.estado}.`;
    }
};

console.log("=== INFORMACIÓN DEL LIBRO ===");
console.log(libro.describirLibro());

console.log("\n=== CAMBIANDO EL ESTADO ===");
libro.estado = "prestado";
console.log(libro.describirLibro());

console.log("\n=== PROPIEDADES INDIVIDUALES ===");
console.log("Título:", libro.titulo);
console.log("Autor:", libro.autor);
console.log("Año:", libro.anio);
console.log("Estado:", libro.estado);
