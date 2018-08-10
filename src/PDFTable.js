import React, { Component, Fragment } from 'react';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const downloadPDF = (accountAgreements) => {

   const content = [
      {
         table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
               [{text: 'First', style: 'tableHeader'}, {text: 'Second', style: 'tableHeader'}, {text: 'Third', style: 'tableHeader'}, {text: 'The last one', style: 'tableHeader'}],
               ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
               [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
            ]
         }
      }
   ]

   const header = {text: 'simple text', style: 'header'}

   const styles = {
      header: {
         fontSize: 20,
         alignment: 'center',
         margin: [0, 0, 0, 10],
         bold: true
      },
      tableHeader: {
         bold: true,
         fontSize: 10,
         alignment: 'left',
         fillColor: '#dddddd',
      },
      headerList: {
         fontSize: 13,
         alignment: 'center',
         margin: [0, 20, 0, 5],
         bold: true
      },
      column: {
         alignment: 'center'
      }
   }

   const docDefinition = {
      header,
      content,
      styles
   }
   pdfMake.createPdf(docDefinition).open()


   return (
      null
   )

}

export default downloadPDF