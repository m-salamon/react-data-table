import React, { Component, Fragment } from 'react';

class PrintTable extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {

    }
  }

  componentDidMount = () => {

    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    // pri.document.open();
    pri.document.write(content.innerHTML);

    const head = pri.document.getElementsByTagName('head')[0];
    const ref = pri.document.createElement('link');
    ref.rel = 'stylesheet';
    ref.type = 'text/css';
    ref.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
    head.appendChild(ref);

    console.log(pri.document)
  //  pri.document.close();
    //pri.focus();
   // pri.print();

  }


  render() {

    let header = () => {
      var key = Object.keys(this.props.data[0]);
      return (
        <tr className="text-medium-dark">
          {key.includes('userId') ? <th >User Id</th> : null}
          {key.includes('id') ? <th >ID</th> : null}
          {key.includes('title') ? <th >Title</th> : null}
          <th></th>
        </tr>);
    }

    let body = () => {
      var key = Object.keys(this.props.data[0]);
      return this.props.data.map((item, index) => {
        const { id } = item;
        return (
          <tr key={id}>
            {key.includes('userId') ? <td >{item.userId}</td> : null}
            {key.includes('id') ? <td >{item.id}</td> : null}
            {key.includes('title') ? <td >{item.title}</td> : null}
          </tr>);
      });
    }

    return (
      <Fragment>
        <iframe id="ifmcontentstoprint" ref="iframe" style={{ height: '0px', width: '0px', position: 'absolute' }}>
          <div id="divcontents" className="container" >
            <div className="row ">
              <div className="print-header"> Dealmed Medical Supplies</div>
              <table className="table table-bordered">
                <thead >
                  {header()}
                </thead>
                <tbody>
                  {body()}
                </tbody>
              </table>
            </div>
          </div>
        </iframe>
      </Fragment>)


  }
}


export default PrintTable


