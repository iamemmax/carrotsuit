import React, { Component } from 'react';
import FileUploadProgress from 'react-fileupload-progress';
import { getSlideImages, deleteSlideImage } from '../../../actions/settingsActions';
import './styles/sliderPicture.css';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

class SliderPictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.removeImage = this.removeImage.bind(this);
    this.maxReached = this.maxReached.bind(this);
    this.getImages = this.getImages.bind(this);
  }
  componentDidMount() {
    this.getImages();
  }
  getImages() {
    getSlideImages().then(data => {
      if (data) {
        this.setState({
          images: data
        });
      }
    });
  }
  removeImage(id) {
    const filtered = this.state.images.filter(image => image.id !== id);
    this.setState({
      images: filtered
    });
    deleteSlideImage(id);
  }
  formGetter() {
    return new FormData(document.getElementById('customForm'));
  }
  maxReached() {
    return this.state.images.length >= 5;
  }
  handleUploadClick = (e, onSubmit) => {
    if (this.maxReached()) {
      alert('You can not upload more than 5 pictures');
    } else onSubmit(e);
  };
  customFormRenderer(onSubmit) {
    return (
      <form id="customForm">
        <input style={{ display: 'block' }} type="file" name="file" accept="image/*" />{' '}
        <Button
          color="danger"
          style={{ marginTop: '15px' }}
          onClick={e => this.handleUploadClick(e, onSubmit)}
        >
          Upload
        </Button>
      </form>
    );
  }

  render() {
    const { showBody } = this.props;
    return (
      <main>
        <Card width="100%">
          <CardHeader>
            <div className="card-header">
              <div>
                <h6>Slider pictures</h6>
                <p>Select about 5 pictures to slide behind your logo</p>
              </div>
              {!showBody && (
                <div>
                  <Button color="danger" onClick={this.props.toggleShowSliderBody}>
                    Select
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          {showBody && (
            <CardBody style={{ padding: '3%' }}>
              <div>
                <h6>Select about 5 pictures to appear in your home screen</h6>
                <div className="slide-select-container">
                  <div className="images">
                    <FileUploadProgress
                      key="ex1"
                      url="/api/v1/settings/slide-images"
                      method="POST"
                      onLoad={() => {
                        this.getImages();
                      }}
                      beforeSend={request => {
                        const token = localStorage.getItem('jwtToken');
                        request.setRequestHeader('Authorization', token);

                        return request;
                      }}
                      formGetter={this.formGetter.bind(this)}
                      formRenderer={this.customFormRenderer.bind(this)}
                    />
                  </div>
                  <div className="slide-img-container">
                    {this.state.images.length &&
                      this.state.images.map(image => (
                        <div key={image.id} className="img-container">
                          <span className="remove-image" onClick={() => this.removeImage(image.id)}>
                            x
                          </span>
                          <img src={image.url} alt={`slide-img ${image.id}`} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardBody>
          )}
        </Card>
      </main>
    );
  }
}
export default SliderPictures;
