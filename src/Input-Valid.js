import React, { PropTypes, Component } from 'react';

import InValidErrMsg from './In-Valid-Err-Msg';
import {ValidWrap, InputValidPropTypes, InputValidDefaultProps} from './Base';

export default class InputValid extends Component {
  constructor(props) {
    super(props);
    const {defaultValue} = this.props;
    let value = defaultValue;

    this.validType = 'InputValid';
    this.state = {
      showErr: this.getShowErr(value),
      value: value
    };
  }
  getIsValid(val) {
    // getIsValidPharse1 START
    const isEmpty = (''+val)==='';
    const isUndefined = typeof val==='undefined';
    if (isEmpty || isUndefined) {
      return true;
    }
    // getIsValidPharse1 END

    const {getIsValid} = this.props;
    return getIsValid(val);
  }
  getShowErr(val) {
    return !this.getIsValid(val);
  }
  render() {
    const {onChange, onValid, onInValid, defaultValue,
      validType,
      err,
      hint,
      inputType
    } = this.props;
    const value = defaultValue;

    return (<ValidWrap>
      <input
        type={inputType}
        defaultValue={value}
        placeholder={hint}
        onChange={evt=>{
          const VALUE = evt.target.value;
          const bool = this.getIsValid(VALUE);
          onChange(VALUE);
          if (bool) {
            onValid();
          } else {
            onInValid();
          }
          this.setState({showErr: this.getShowErr(VALUE)});
        }} />
      <InValidErrMsg msg={err} show={this.state.showErr} validType={validType} />
      </ValidWrap>
    );
  }
};

InputValid.propTypes = Object.assign({}, InputValidPropTypes, {
  getIsValid: PropTypes.func.isRequired,
  validType: PropTypes.string.isRequired,
  err: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  defaultValue: PropTypes.oneOfType([ //InputValidPort InputValidNumber
        PropTypes.string,
        PropTypes.number])
});
InputValid.defaultProps = Object.assign({}, InputValidDefaultProps, {
  inputType: 'text'
});

InputValid.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
