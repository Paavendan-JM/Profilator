import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const downloadAsDoc = (name, text) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: text.split('\n').map(line => new Paragraph(new TextRun(line)))
    }]
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, `${name.replaceAll(' ', '_')}_Cover_Letter.docx`);
  });
};
