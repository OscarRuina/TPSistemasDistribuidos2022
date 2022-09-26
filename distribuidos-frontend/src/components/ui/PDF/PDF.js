import React from "react";
import { jsPDF } from "jspdf";

export default function PDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.text("Factura", 10, 10);
    doc.text("Vendedor", 10, 10);
    doc.text("Comprador", 10, 10);
    doc.text("Productos", 10, 10);
    doc.text(`Total : $${20.000}`, 10, 10);

   /* fecha de la compra, datos completos del
    vendedor, datos completos del comprador, datos de los productos comprados (nombre del producto,
    precio de compra, cantidad), total facturado.*/
    doc.save("a4.pdf");
    return(
        <a href="a4.pdf">Download!</a>
    );
}