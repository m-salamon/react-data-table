import React, { Component, Fragment } from 'react';
import PrintTable from './PrintTable'
import PDFTable from './PDFTable'

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

  render() {
    return (
      <Fragment>
        <div >
          {this.state.exportAs == 'csv' && this.downloadCSV({ filename: "stock-data.csv" })}
          {this.state.exportAs == 'print' && <PrintTable data={this.state.data} />}
          {this.state.exportAs == 'pdf' && <PDFTable data={this.state.data} />}
        </div>
      </Fragment>);
  }
}
export default Exports