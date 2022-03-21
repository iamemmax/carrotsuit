import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bulkImportVisitors, downloadInviteSample } from '../../actions/appointmentActions';
import Swal from 'sweetalert2';
import './styles/importInvites.css';
import { Button } from 'reactstrap';

class ImportInvites extends Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.openFile = this.openFile.bind(this);
    this.uploadCsv = this.uploadCsv.bind(this);
  }

  uploadCsv(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('invitesCsv', file);

    bulkImportVisitors(formData).then(data => {
      this.props.closeModal();
      if (data && data.errorRows.length) {
        Swal.fire({
          title: '<strong>ERROR</strong>',
          icon: 'error',
          html: `<h3>Error at row ${data.errorRows[0].row}</h3> <br /> <p>${
            data.errorRows[0].errors[0]
          }</p>. <br /> Check the <strong>invite_sample.csv</strong> file for the required fields and proper format.`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: ' Ok!'
        });
      }
    });
  }
  downloadSample() {
    downloadInviteSample();
  }
  openFile() {
    this.fileRef.current.click();
  }
  render() {
    return (
      <div className="csv-wrapper">
        <p>Upload a CSV file to import a new visitor directory.</p>
        <p>
          Your <strong>.csv</strong> file should follow the following sample format, heading
          inclusive
        </p>
        <small>NB: Only rows without error will be added!</small>
        <div className="format-wrapper">
          <div>
            <span>name</span>,<span> email</span>,<span> phone_number</span>,<span> purpose</span>,
            <span> day</span>,<span> time</span>
          </div>
          <div>
            <span>John</span>,<span> john@email.com</span>,<span> 0847837383</span>,
            <span> Interview</span>,<span> 02/03/2020</span>
            <span> 13:00</span>
          </div>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
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

export default connect(null)(ImportInvites);
