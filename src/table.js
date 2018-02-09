import React, { Component } from 'react';
import $ from 'jquery';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { data:[] };

    this.getData();
  }

  getData() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8002/petugas-lap/all",
      "method": "GET",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "a7fad470-f7a5-ec21-2aa5-4bd2f532cd6b"
      },
      success: function(data) {
        this.setState({
          data: JSON.stringify(data)
        });
        this.print(this.state.data[0]['_id']);
      }.bind(this),
      error: function(err) {
        console.log(err);
      }.bind(this)
    });
  }

  handleSubmit() {
  }

  print(_data) {
    return {__html: _data};
  }

  render() {
    return(
      <div dangerouslySetInnerHTML={this.print()}>
      </div>
    );
  }
}

export default Table;
