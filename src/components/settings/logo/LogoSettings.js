import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCompany, editCompany } from '../../../actions/settingsActions';
import { CardBody, Card, Button } from 'reactstrap';
import './logoSettings.css';
import Mobile_time_out from '../set_mobile_timeout/Mobile_time_out';
import Department from '../deparment/Department';
import MobileDashboard from '../mobileDashboard/MobileDashboard';
import Barcode from '../mobileDashboard/Qrcode';
import LocationCode from '../location/LocationCode';

class LogoSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.settings.company.name || '',
      logo: null
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentDidMount() {
    this.props.getCompany();
  }
  handleFileChange(e) {
    this.setState({
      logo: e.target.files[0]
    });

    console.log(this.state.logo, 'jsjsjsu')
  }
  handleSave() {
    const { companyName, logo } = this.state;
    const formData = new FormData();
    formData.append('name', companyName);
    formData.append('logo', logo);
    if (companyName) this.props.editCompany(formData);
  }
  render() {
    const { settings } = this.props;
    return (
      <div className="company-settings">
        <Card>
          <CardBody>
            <h3>Company Settings</h3>
            {settings.company.logo && (
              <figure>
                <img src={settings.company.logo} alt="company logo" />
                <figcaption>{settings.company.name}</figcaption>
              </figure>
            )}
            <div className="company-logo">
              <label className="text-muted">edit company name</label>
              <input
                type="text"
                value={this.state.companyName}
                onChange={e => this.setState({ companyName: e.target.value })}
                className="form-control"
                placeholder={settings.company.name}
              />
            </div>
            <div className="file-select">
              <label>Choose a logo that will appear on your home screen.</label>
              <input type="file" onChange={this.handleFileChange} className="form-control" />
            </div>
            <Button color="danger" onClick={this.handleSave}>
              Save Changes
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3>Enable Barcode Option</h3>
            <Barcode/>
  
          </CardBody>

        </Card>
           {/* //////row */}
           <Card>
          <CardBody>
            <h3>Branch Code</h3>
            <LocationCode/>
           
          
          </CardBody>
        </Card>
          {/* //////row */}
        <Card>
          <CardBody>
            <h3>Timeouts Durations</h3>
            <Mobile_time_out/>
           
          
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3>Add Company Departments</h3>
            <Department/>
           
          
          </CardBody>
        </Card>
        {/* //////row */}
        <Card>
          <CardBody>
            <h3>Mobile DashBoard Color Setups</h3>
            <MobileDashboard/>
           
          
          </CardBody>
        </Card>
      
      </div>
    );
  }
}
const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  {
    getCompany,
    editCompany
  }
)(LogoSettings);
