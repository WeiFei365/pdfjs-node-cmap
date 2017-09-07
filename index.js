'use strict'
const fs = require('fs');
const http = require('http');
const pdfjsLib = require('pdfjs-dist');


function loadPage(pageIndex) {
  const self = this;
  const pdfDocument = self.pdfDocument;

  self.pages.push('');
  
  self.promises.push(new Promise(res => {
    self.pages[pageIndex] = '';

    pdfDocument.getPage(pageIndex + 1).then(page => {
      if (!page || !page.getTextContent) {
        return res();
      }
      
      page.getTextContent({ normalizeWhitespace: true }).then(content => {
        // TODO
        if (pageIndex === 269) {
          debugger
        }

        if (content && content.items) {
          self.pages[pageIndex] = content.items.map(item => (item || {}).str || '').join('');
        }

        res();
      }).catch(() => {
        self.pages[pageIndex] = 'ERROR_CODE_1002';
        
        res();
      });
    }).catch(() => {
      self.pages[pageIndex] = 'ERROR_CODE_1002';

      res();
    });
  }));
}

function renderPDF(pdfData, resolver, rejector) {
  pdfjsLib.getDocument(pdfData).promise.then(pdfDocument => {
    const numPages = pdfDocument.numPages;

    if (numPages === 0) {
      return rejector('ERROR_CODE_1000');
    }

    const self = {
      pdfDocument,
      page_count: numPages,
      pages: [],
      promises: [],
    };
    for (let i = 0; i < numPages; i++) {
      loadPage.bind(self, i)();
    }

    Promise.all(self.promises).then(() => {
      let isError = false;
      self.pages.forEach(str => {
        if (isError) {
          return;
        }
        if (str === 'ERROR_CODE_1002') {
          isError = true;
        }
      });

      if (isError) {
        rejector('ERROR_CODE_1002');
      } else {
        resolver({ content: self.pages.join(''), pdf_page: self.page_count });
      }
    });
  }, () => rejector('ERROR_CODE_1001'));
}

function pdfParserLocal(url) {
  return new Promise((resolver, rejector) => {
    try {
      fs.accessSync(url);
    } catch (error) {
      return rejector('ERROR_CODE_1004');
    }
    if (url.substr(-4).toLowerCase() !== '.pdf') {
      return rejector('ERROR_CODE_1006');
    }
    
    let pdfData;
    try {
      pdfData = new Uint8Array(fs.readFileSync(url));
    } catch (error) {
      return rejector('ERROR_CODE_1003');
    }
    
    renderPDF(pdfData, resolver, rejector);
  });
}


pdfParserLocal(`${__dirname}/test.pdf`).then(({ content, pdf_page }) => {
  console.log(content);
  console.log(pdf_page);
}, errCode => {
  console.log(errCode);
});
