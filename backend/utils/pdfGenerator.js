const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateAdoptionCertificate = (pet) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      layout: 'landscape',
      size: 'A4',
    });

    // Collect PDF data in memory
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Certificate design
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f8f9fa');
    
    // Header
    doc.fill('#2c3e50')
      .fontSize(36)
      .text('Adoption Certificate', {
        align: 'center',
        underline: true,
        lineGap: 10
      });
    
    // Pet image placeholder
    doc.circle(400, 200, 80)
      .fill('#3498db');
    doc.fill('white')
      .fontSize(24)
      .text('Pet Photo', 360, 180, { width: 80, align: 'center' });
    
    // Pet details
    doc.fill('#2c3e50')
      .fontSize(24)
      .text(`This certifies that you have officially adopted`, 50, 300, {
        align: 'center',
        width: 700
      });
    
    doc.fill('#e74c3c')
      .fontSize(36)
      .text(pet.name, 50, 350, {
        align: 'center',
        width: 700,
        underline: true
      });
    
    doc.fill('#2c3e50')
      .fontSize(20)
      .text(`a ${pet.species} with ${pet.personality} personality`, 50, 420, {
        align: 'center',
        width: 700
      });
    
    // Footer
    doc.fill('#7f8c8d')
      .fontSize(14)
      .text(`Adopted on: ${new Date().toLocaleDateString()}`, 50, 550, {
        align: 'center',
        width: 700
      });
    
    doc.end();
  });
};

module.exports = { generateAdoptionCertificate };