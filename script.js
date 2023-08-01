const { PDFDocument, rgb, degrees } = require('pdf-lib');

document.getElementById('solicitudForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const articulos = document.getElementById('articulos').value;
    const descripcion = document.getElementById('descripcion').value;
    const costos = document.getElementById('costos').value;

    // Crear el PDF
    createPDF(nombre, telefono, fecha, articulos, descripcion, costos);
});

async function createPDF(nombre, telefono, fecha, articulos, descripcion, costos) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([320, 200]); // Tamaño en puntos (1 cm = 28.35 puntos)
    const { width, height } = page.getSize();

    // Agregar contenido al PDF
    const helveticaFont = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
    const textSize = 10;
    const textOffset = 20;

    page.drawText('Recibo de Reparación', {
        x: 20,
        y: height - textOffset,
        size: textSize + 2,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Nombre: ${nombre}`, {
        x: 20,
        y: height - textOffset * 2 - 20,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Teléfono: ${telefono}`, {
        x: 20,
        y: height - textOffset * 3 - 20,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Fecha: ${fecha}`, {
        x: 20,
        y: height - textOffset * 4 - 20,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Artículos: ${articulos}`, {
        x: 20,
        y: height - textOffset * 5 - 20,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Descripción: ${descripcion}`, {
        x: 20,
        y: height - textOffset * 6 - 20,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Costos: ${costos}`, {
        x: 20,
        y: height - textOffset * 7 - 20,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    // Guardar el PDF en una variable Uint8Array
    const pdfBytes = await pdfDoc.save();

    // Descargar el PDF
    downloadPDF(pdfBytes);
}

function downloadPDF(pdfBytes) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solicitud_reparacion.pdf'; // Nombre del archivo
    a.click();
}
