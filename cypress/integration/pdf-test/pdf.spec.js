describe('compare 2 PDF files', () => {

    const serverName = 'http://localhost:3000';

    beforeEach(() => {
        cy.visit(serverName)
    })

    it('Download and compare PDFs succesfully', () => {

        cy.get('#capePdf').invoke('attr', 'href').then(linkUrl => {
            cy.downloadFile(serverName+linkUrl,'data/actualPdfs','cape.pdf');

            cy.task("pdfCompare", {
                actualPdf: "cape.pdf",
                baselinePdf: "cape_report.pdf"
            }).then((result) => {
                expect(result.status).to.equal("passed");
            });
        });
    });

    it('Fails when PDFs are different', () => {

        cy.get('#newsPdf').invoke('attr', 'href').then(linkUrl => {
            cy.downloadFile(serverName+linkUrl,'data/actualPdfs','news.pdf');

            cy.task("pdfCompare", {
                actualPdf: "news.pdf",
                baselinePdf: "cape_report.pdf"
            }).then((result) => {
                expect(result.status).to.equal("failed");
            });
        });
    });
})
