import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, CardText, Spinner } from 'reactstrap';
import {
  uploadWelcomeImage,
  deleteWelcomeImage,
  getWelcomeImage
} from '../../../actions/settingsActions';
import './styles/welcomeImage.css';
import { FaImage, FaTrashAlt } from 'react-icons/fa';

class WelcomeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      welcomeGraphic: null
    };
    this.fileRef = React.createRef();
    this.openFile = this.openFile.bind(this);
    this.uploadGraphic = this.uploadGraphic.bind(this);
    this.deleteWelcomeGraphic = this.deleteWelcomeGraphic.bind(this);
  }
  componentDidMount() {
    const { type = null } = this.props;
    getWelcomeImage(type).then(data => {
      if (data) {
        this.setState({ welcomeGraphic: data });
      }
    });
  }
  uploadGraphic(e) {
    const { type = null } = this.props;
    const file = e.target.files[0];
    const formData = new FormData();
    this.setState({
      isUploading: true
    });
    formData.append('welcomeGraphic', file);
    formData.append('visit_type', type);
    uploadWelcomeImage(formData)
      .then((data) => {
        if(data){
          this.setState({
            welcomeGraphic: data,
            isUploading: false
          });
        }
        
      })
      .catch(err => {
        this.setState({
          isUploading: false
        });
      });
  }
  openFile() {
    this.fileRef.current.click();
  }
  deleteWelcomeGraphic(id) {
    deleteWelcomeImage(id)
    .then(data => {
      if(data){
        this.setState({
          welcomeGraphic: null
        })
      }
    })
  }
  render() {
    const { isUploading, welcomeGraphic } = this.state;
    const { showBody = false } = this.props;
    return (
      <main>
        <Card width="100%">
          <CardHeader>
            <div className="card-header">
              <div>
                <h6>Welcome Graphic</h6>
                <p>Choose an image to appear on your welcome screen after sign up</p>
              </div>
              {!showBody && (
                <div>
                  <Button color="danger" onClick={this.props.toggleShowBody}>
                    Choose
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          {showBody && (
            <CardBody style={{ padding: '3%' }}>
              <div className="welcome-img-container">
                {welcomeGraphic && welcomeGraphic.graphic ? (
                  <img src={welcomeGraphic.graphic} alt="welcome image" />
                ) : (
                  <div className="welcome-img-place">
                    <div>{isUploading ? <Spinner color="danger" /> : <p>Welcome Graphic</p>}</div>
                  </div>
                )}
              </div>
              <CardText>
                {' '}
                <small>
                  <strong>Hint:</strong> Upload a graphic with a greeting message{' '}
                </small>
              </CardText>
              <Button color="danger" onClick={this.openFile}>
                <FaImage color="#ffffff" size={18} /> Select Graphic
              </Button>{' '}
              {welcomeGraphic && welcomeGraphic.graphic && (
                <Button outline color="danger" onClick={() => this.deleteWelcomeGraphic(welcomeGraphic.id)}>
                  <FaTrashAlt color="firebrick" size={16} /> Delete
                </Button>
              )}
              <input
                type="file"
                onChange={this.uploadGraphic}
                accept="image/*"
                ref={this.fileRef}
                hidden
              />
            </CardBody>
          )}
        </Card>
      </main>
    );
  }
}

export default WelcomeImage;
