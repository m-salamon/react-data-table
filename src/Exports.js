import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import './DottedBox.css';

class Exports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      exportAs: ''
    }
  }
  componentWillMount() {
    this.setState({ data: this.props.data, exportAs: this.props.exportAs })
  }

  downloadCSV = (args) => {
    var data, filename, link;
    var csv = this.convertArrayOfObjectsToCSV({
      data: this.state.data
    });
    if (csv == null) return;
    filename = args.filename || 'export.csv';
    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);
    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }

  convertArrayOfObjectsToCSV = (args) => {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }
    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';
    keys = Object.keys(data[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    data.forEach(function (item) {
      ctr = 0;
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }

  printData = () => {
    var divToPrint = this.printDataTable()

    console.log('divto print', divToPrint)

    var newWin = window.open("");
    newWin.document.write(divToPrint);
    newWin.print();
    newWin.close();
  }

  printDataTable = () => {

    let header = () => {
      var key = Object.keys(this.state.data[0]);
      return (
        <tr className="text-medium-dark">
          {key.includes('userId') ? <th style={styles.tablethClass}>User Id</th> : null}
          {key.includes('id') ? <th style={styles.tablethClass}>ID</th> : null}
          {key.includes('title') ? <th style={styles.tablethClass}>Title</th> : null}
          <th></th>
        </tr>);
    }

    let body = () => {
      var key = Object.keys(this.props.data[0]);
      return this.props.data.map((item, index) => {
        const { id } = item;
        return (
          <tr key={id}>
            {key.includes('userId') ? <td  style={styles.tabletdClass}>{item.userId}</td> : null}
            {key.includes('id') ? <td style={styles.tabletdClass}>{item.id}</td> : null}
            {key.includes('title') ? <td style={styles.tabletdClass}>{item.title}</td> : null}
          </tr>);
      });
    }

    return ReactDOMServer.renderToStaticMarkup(
      <div className="row">
        <div className="">
          <table style={styles.tableElement}>
            <thead style={styles.tableBorderedtheadtdClass}>
              {header()}
            </thead>
            <tbody>
              {body()}
            </tbody>
          </table>
        </div>
      </div>)

  }

  render() {

    return ([

      <div >
        {this.state.exportAs == 'csv' && this.downloadCSV({ filename: "stock-data.csv" })}
        {this.state.exportAs == 'print' && this.printData() && <p id="DottedBox_content">hey you why you not working</p>}

      </div>,

    ]);
  }
}

const styles = {
  //table
  tableElement: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    margin: '0',
    fontSize: '12px',
    fontWeight: '100',
    lineHeight: '1.5',
    color: '#212529',
    textAlign: 'left',
    backgroundColor:' #fff'
  },
  //.table th,
  tablethClass: {
    padding: "0.75rem",
    verticalAlign: "top",
    borderTop: "1px solid #dee2e6"
  },
   //.table td,
  tabletdClass: {
    padding: "0.75rem",
    verticalAlign: "top",
    borderTop: "1px solid #dee2e6"
  },
  //.table thead th
  tabletheadthClass: {
    verticalAlign: "bottom",
    borderBottom: "2px solid #dee2e6"
  },
  //table tbody + tbody
  tabletbodytbodyElement: {
    borderTop: "2px solid #dee2e6"
  },
  //.table-sm th,
  tableSmthClass: {
    padding: "0.3rem"
  },
  tableSmtdClass: {
    padding: "0.3rem"
  },
  //.table-bordered
  tableBorderedClass: {
    border: "1px solid #dee2e6"
  },
  //.table-bordered th,
  tableBorderedthClass: {
    border: "1px solid #dee2e6"
  },
  tableBorderedtdClass: {
    border: "1px solid #dee2e6"
  },
  //.table-bordered thead th,
  tableBorderedtheadthClass: {
    borderBottomWidth: "2px"
  },
  tableBorderedtheadtdClass: {
    borderBottomWidth: "2px"
  },
  //.table-striped tbody tr:nth-of-type(odd)
  tableStripedtbodytrNthOfTypeOddClass: {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },






}



export default Exports;
