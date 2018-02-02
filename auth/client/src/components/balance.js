import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Balance extends Component {
  componentWillMount() {
    this.props.fetchBalance();
  }

  render() {
    return (
      <div>{this.props.balance}</div>
    );
  }
}

function mapStateToProps(state) {
  return { balance: state.balance.balance };
}

export default connect(mapStateToProps, actions)(Balance);
