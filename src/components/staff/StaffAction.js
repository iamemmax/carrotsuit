import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { FaShare, FaTimes, FaPhone } from 'react-icons/fa'
import { getVisitor, sendVisitorAction } from '../../actions/visitorActions';
import './styles/staffActions.css';
import actions from './actionsData';
import Navbar from '../layout/Navbar';
import Modal from '../common/modal/Modal';
import swalToaste from '../common/SwalToaste';
import DeclineVisitor from './DeclineVisitor';
import TransferVisitor from './TransferVisitor';

class StaffAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customAction: '',
      phone_number: '',
      showModal: false,
      showTransferModal: false
    };
    this.handleActionSend = this.handleActionSend.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeTransferModal = this.closeTransferModal.bind(this);
    this.handleTransferClick = this.handleTransferClick.bind(this);
  }

  async componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    
    console.log(query, 'ffffffffff')
    if (query.id) {
      await this.props.getVisitor(query.id);

      const { currentVisitor } = this.props.visitor;
      if (currentVisitor && currentVisitor.fields.length) {
        const phone_number = this.getVisitorNumber(currentVisitor);
        this.setState({
          phone_number
        });
      }
    }
  }

  handleActionSend(e, action = '') {
    e.preventDefault();

    let theAction = action || this.state.customAction;
    const token = this.getToken();
    if (theAction) {
      const data = {
        action: theAction,
        token
      };
      this.props
        .sendVisitorAction(data)
        .then(res => {
          swalToaste.fire({
            icon: 'success',
            title: res.message
          });
        })
        .catch(err => {
          swalToaste.fire({
            icon: 'error',
            title: err.response.data
          });
        });
    }
  }
  getToken() {
    const query = queryString.parse(this.props.location.search);
    return query.token || '';
  }

  getVisitorNumber(visitor) {
    const field = visitor.fields.find(field => field.field_name === 'phone_number');
    return field.field_value || '';
  }
  false;
  openModal() {
    this.setState({
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }
  closeTransferModal() {
    this.setState({
      showTransferModal: false
    });
  }
  handleTransferClick() {
    const { currentVisitor } = this.props.visitor;
    if (currentVisitor.host.assistant) {
      this.setState({
        showTransferModal: true
      });
    } else {
      swalToaste.fire({
        icon: 'info',
        title: 'You have no assistant'
      });
    }
  }
  render() {
    const { soughtVisitor } = this.props.visitor;
    const { currentVisitor } = this.props.visitor;
    let visitor = currentVisitor;
    if (!visitor) return <div className="jumbotron">Broken link</div>;
    return (
      <div className="staff-actions-wrapper">
        <Navbar />
        <header>
          {soughtVisitor &&  <h3>
            Visitor for {soughtVisitor.first_name} {soughtVisitor.last_name}
          </h3>
          }
         
        </header>
        <main>
          <section className="staff-vislitor">
            <figure>{<img src={visitor.avatar || '/images/defaultAvatar.png'} />}</figure>
            <table className="table table-striped">
              <tbody>
                {visitor.fields &&
                  visitor.fields.map(field => {
                    if (
                      field.field_name !== 'private_note' && 
                      field.field_name !== 'staff' &&
                      field.field_name !== 'company' &&
                      field.field_name !== 'estate_house'
                      )
                      return (
                        <tr key={field.id}>
                          <td className="field-name">{field.field_name}</td>
                          <td>{field.field_value}</td>
                        </tr>
                      );
                  })}
                <tr>
                  <td className="field-name">Arrival Time</td>
                  <td>{new Date(visitor.visiting_date).toLocaleString()}</td>;
                </tr>
              </tbody>
            </table>
          </section>
          <section className="staff-actions">
            <h4>Send a quick response</h4>
            <ul className="list-group">
              <li className="list-group-item bg-primary text-light ">Select a quick reply</li>
              {actions.map(action => (
                <li
                  key={action.id}
                  className="list-group-item msg"
                  onClick={() => {
                    this.handleActionSend({ preventDefault: () => {} }, action.message);
                  }}
                >
                  {action.message}
                </li>
              ))}
              <li className="list-group-item">
                <form className="form-inline my-2 my-lg-0 action-form">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="...or enter reply"
                    onChange={e => this.setState({ customAction: e.target.value })}
                  />
                  <button className="btn btn-primary btn-sm" onClick={this.handleActionSend}>
                    Send
                  </button>
                </form>
              </li>
            </ul>
            <div className="btn-group">
              <a className="btn btn-primary btn-sm" href={`tel:${this.state.phone_number}`}>
                <FaPhone size={12} color="#ffffff" />
                Call visitor
              </a>
              <button className="btn btn-primary btn-sm" onClick={this.handleTransferClick}>
                <FaShare size={12} color="#ffffff" />
                Transfer
              </button>
              <button className="btn btn-primary btn-sm" onClick={this.openModal}>
                <FaTimes size={12} color="#ffffff" />
                Decline
              </button>
            </div>
          </section>
        </main>
        <Modal header="Decline visitor" show={this.state.showModal} close={this.closeModal}>
          <DeclineVisitor id={visitor.id} token={this.getToken()} closeModal={this.closeModal} />
        </Modal>
        <Modal
          header="Transfer visitor"
          show={this.state.showTransferModal}
          close={this.closeTransferModal}
        >
          <TransferVisitor
            visitorId={visitor.id}
            token={this.getToken()}
            staff={visitor.host}
            closeModal={this.closeTransferModal}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  visitor: state.visitor
});

export default connect(
  mapStateToProps,
  {
    getVisitor,
    sendVisitorAction
  }
)(StaffAction);
