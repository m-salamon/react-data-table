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
          <th style={styles.tableth}>#</th>
          {key.includes("userId") ? (
            <th style={styles.tableth}>User Id</th>
          ) : null}
          {key.includes("id") ? <th style={styles.tableth}>ID</th> : null}
          {key.includes("title") ? <th style={styles.tableth}>Title</th> : null}
        </tr>
      )
    }

    let body = () => {
      var key = Object.keys(this.props.data[0]);
      return data.map((item, index) => {
        const {id} = item
        return (
          <tr key={id}>
            <td style={styles.tabletd}>{index + 1}</td>
            {key.includes("userId") ? (
              <td style={styles.tabletd}>{item.userId}</td>
            ) : null}
            {key.includes("id") ? (
              <td style={styles.tabletd}>{item.id}</td>
            ) : null}
            {key.includes("title") ? (
              <td style={styles.tabletd}>{item.title}</td>
            ) : null}
          </tr>
        )
      })
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
  page: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
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
    borderSpacing: "0px",
    textAlign: "left",
    border: "1px solid #dee2e6"
  },
  //.table th,
  tabletd: {
    padding: "0.75rem",
    verticalAlign: "top",
    borderTop: "1px solid #dee2e6",
    borderBottom: "1px solid #dee2e6"
  },
  tableth: {
    padding: "0.75rem",
    verticalAlign: "top",
    borderTop: "1px solid #dee2e6",
    borderBottom: "1px solid #dee2e6",
    backgroundColor: "rgba(0,0,0,.05)"
  },
  tablethead: {
    borderBottomWidth: "2px",
    borderBottom: "2px solid #dee2e6"
  }
}
