import React, { Component, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';

class PrintTable extends Component {

  componentDidMount = () => {
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(this.printDataTable());
    pri.document.close();
    pri.focus();
    pri.print();
  }

  printDataTable = () => {
    let header = () => {
      var key = Object.keys(this.props.data[0]);
      return (
        <tr className="text-medium-dark">
          {key.includes('userId') ? <th style={styles.tablethtd}>User Id</th> : null}
          {key.includes('id') ? <th style={styles.tablethtd}>ID</th> : null}
          {key.includes('title') ? <th style={styles.tablethtd}>Title</th> : null}
        </tr>);
    }

    let body = () => {
      var key = Object.keys(this.props.data[0]);
      return this.props.data.map((item, index) => {
        const { id } = item;
        return (
          <tr key={id}>
            {key.includes('userId') ? <td style={styles.tablethtd}>{item.userId}</td> : null}
            {key.includes('id') ? <td style={styles.tablethtd}>{item.id}</td> : null}
            {key.includes('title') ? <td style={styles.tablethtd}>{item.title}</td> : null}
          </tr>);
      });
    }

    return ReactDOMServer.renderToStaticMarkup(
      <div style={styles.page}>
        <div style={styles.pageheader}>Track-the-projects</div>
        <table style={styles.table}>
          <thead style={styles.tablethead}>{header()}</thead>
          <tbody>{body()}</tbody>
        </table>
      </div>)

  }

  render() {
    return (
      <Fragment>
        <iframe id="ifmcontentstoprint" ref="iframe" style={{ height: '0px', width: '0px', position: 'absolute' }}></iframe>
      </Fragment>)
  }

}
export default PrintTable


const styles = {
  //page
  page: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
  //page header
  pageheader: {
    marginBottom: "20px",
    marginTop: "20px",
    textAlign: "center"
  },
  //table
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    margin: "0",
    fontSize: "12px",
    fontWeight: "100",
    lineHeight: "1",
    color: "#212529",
    textAlign: "left",
    backgroundColor: "#fff",
    borderCollapse: "collapse",
    borderSpacing: "0px"
  },
  //.table th,
  tablethtd: {
    padding: "0.75rem",
    verticalAlign: "top",
    border: "1px solid #dee2e6"
  },
  //table thead
  tablethead: {
    borderBottomWidth: "2px",
    borderBottom: "2px solid #dee2e6"
  }
}
