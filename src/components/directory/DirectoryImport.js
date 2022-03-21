import React, { Component } from 'react';
import { connect } from 'react-redux';
import { importVisitorDirectory, getDirectory, downloadDirCsvSample } from '../../actions/visitorActions';
import './styles/importCsv.css';
import { Button } from 'reactstrap';

class ImportDectory extends Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.openFile = this.openFile.bind(this);
    this.uploadCsv = this.uploadCsv.bind(this);
  }

  uploadCsv(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);

    importVisitorDirectory(formData).then(() => {
      this.props.getDirectory(1);
      this.props.closeCsvModal();
    });
  }
  downloadSample() {
    downloadDirCsvSample();
  }
  openFile() {
    this.fileRef.current.click();
  }
  render() {
    return (
      <div className="csv-wrapper">
        <p>Upload a CSV file to import visitor contact directory.</p>
        <p>
          Your <strong>.csv</strong> file should follow the following sample format, heading
          included
        </p>
        <div className="format-wrapper">
          <div>
            <span>name</span>,<span> email</span>,<span> phone</span>,
            <span> type</span>
          </div>
          <div>
            <span>John Doe</span>,<span> johnd@email.com</span>,<span> 48776839993</span>,
            <span> Client</span>
          </div>
        </div>
        <br />
        <div style={{textAlign:"center"}}>
        <Button color="danger" onClick={this.openFile}>
          Upload csv
        </Button>{' '}
        <Button color="danger" outline onClick={this.downloadSample}>
          Download sample
        </Button>
        </div>
        
        <input type="file" onChange={this.uploadCsv} accept="text/csv" ref={this.fileRef} hidden />
      </div>
    );
  }
}

export default connect(
  null,
  {
    getDirectory
  }
)(ImportDectory);
