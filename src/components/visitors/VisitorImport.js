import React, { Component } from 'react';
import { bulkImportVisitor, downloadContactCsvSample } from '../../actions/visitorActions';
import './styles/visitorCsv.css';
import { Button } from 'reactstrap';

class VisitorImport extends Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.openFile = this.openFile.bind(this);
    this.uploadCsv = this.uploadCsv.bind(this);
  }

  uploadCsv(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('visitorCsv', file);

    bulkImportVisitor(formData).then(() => {
      this.props.closeModal();
    });
  }
  downloadSample = () => {
    downloadContactCsvSample()
  }
  openFile() {
    this.fileRef.current.click();
  }
  render() {
    return (
      <div className="csv-wrapper">
        <p>Import a CSV file of visitors data</p>
        <p>
          Your <strong>.csv</strong> file should follow the following sample format, heading
          inclusive
        </p>
        <div className="format-wrapper">
          <div>
            <span>name</span>,<span> email</span>,<span> phone_number</span>, <span> visit_type</span>,
          </div>
          <div>
            <span>John</span>,<span> johnd@email.com</span>,
            <span> +10847837383</span> <span> Visit</span>
          </div>
        </div>
        <br />
        <div style={{textAlign:"center"}}>
        <Button color="danger" onClick={this.openFile}>
          Upload csv
        </Button> {' '}
        <Button color="danger" outline onClick={this.downloadSample}>
          Download sample
        </Button>
        </div>
        
        <input type="file" onChange={this.uploadCsv} accept="text/csv" ref={this.fileRef} hidden />
      </div>
    );
  }
}

export default VisitorImport
