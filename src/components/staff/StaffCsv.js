import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bulkImportStaff, getStaff, downloadStaffCsvSample } from '../../actions/staffActions';
import './styles/staffCsv.css';
import { Button } from 'reactstrap';

class StaffCsv extends Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.openFile = this.openFile.bind(this);
    this.uploadCsv = this.uploadCsv.bind(this);
  }

  uploadCsv(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('staffCsv', file);

    this.props.bulkImportStaff(formData).then(() => {
      this.props.getStaff(1);
      this.props.closeModal();
    });
  }
  downloadSample() {
    downloadStaffCsvSample();
  }
  openFile() {
    this.fileRef.current.click();
  }
  render() {
    return (
      <div className="csv-wrapper">
        <p>Upload a CSV file to import a new staff directory.</p>
        <p>
          Your <strong>.csv</strong> file should follow the following sample format, heading
          included
        </p>
        <small>NB: Only rows without error will be added!</small>
        <div className="format-wrapper">
          <div>
            <span>first_name</span>,<span> last_name</span>,<span> email</span>,
            <span> phone_number</span>,<span> staff_position</span><span> staff_ID</span>
          </div>
          <div>
            <span>John</span>,<span> Doe</span>,<span> johnd@email.com</span>,
            <span> 0847837383</span>,<span> Developer</span>, <span> 1233</span>
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
    bulkImportStaff,
    getStaff
  }
)(StaffCsv);
