import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
//**** It contains main Appbar and navigation menu.
class ModalPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUrl: ''
    }
  }

  //Nav Menu handler
  handleClick(url) {
    this.setState({ redirectUrl: url });
  }

  render() {
    
    /** Nav Right menu options */
    const RightMenu = () => (
      <div>
        <button type="button" className="btn btn-danger">btn 1</button>
        <button type="button" className="btn btn-danger">btn 2</button>
        <button type="button" className="btn btn-danger">btn 3</button>
      </div>
    );

    return (
      <div>
        {/** Use for redirection by nav menu*/}
        <div class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{this.props.Modal.Title} </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>{this.props.Modal.Content}</p>
              </div>
              <div class="modal-footer">
                {this.props.isForm && <button type="button" class="btn btn-primary">this.props.Form.SubmitTxt</button>}
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//Components properties
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
