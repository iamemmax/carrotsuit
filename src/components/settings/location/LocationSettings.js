import React, { Component } from "react";
import { connect } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
// import 'react-flags-select/css/react-flags-select.css';
// import "react-flags-select/css/react-flags-select.css";
import PropTypes from "prop-types";
import {
  getLocations,
  addLocation,
  editLocation,
  getCompany,
  editCountry,
} from "../../../actions/settingsActions";
import ToggleableLocForm from "./toggleableLocForm";
import EdtitableLocation from "./editableLocation";
import "./styles.css";
import { Card, CardBody } from "reactstrap";

class LocationSettings extends Component {
  constructor(props) {
    super(props);
    this.onSelectFlag = this.onSelectFlag.bind(this);
  }
  async componentDidMount() {
    await this.props.getLocations();
    await this.props.getCompany();
  }
  onSelectFlag(code) {
    this.props.editCountry({ country: code });
  }
  renderLocations() {
    const { locations } = this.props.settings;
    if (locations && locations.length) {
      return locations.map((location) => (
        <EdtitableLocation
          key={location.id}
          location={location}
          editLocation={this.props.editLocation}
        />
      ));
    }
    return <div>No locations</div>;
  }
  render() {
    const { company } = this.props.settings;
    return (
      <div className="location-wrapper">
        <div className="header">
          <Card>
            <CardBody>
              <h3>Location Settings</h3>
              <p>Select your country</p>
              <ReactFlagsSelect
                searchable={true}
                onSelect={this.onSelectFlag}
                defaultCountry={company.country || "US"}
              />
              <div className="map-wrapper">
                <img src="/images/word_map.png" alt="word map" />
              </div>

              <h4>Add Locations</h4>
              <ToggleableLocForm addLocation={this.props.addLocation} />
              <ul className="list-group">{this.renderLocations()}</ul>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
LocationSettings.propTypes = {
  locations: PropTypes.array,
  getLocations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getLocations,
  addLocation,
  editLocation,
  getCompany,
  editCountry,
})(LocationSettings);
