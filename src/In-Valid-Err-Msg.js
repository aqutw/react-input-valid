// Libraries
import React, { PropTypes, Component } from 'react';

const HideShow = (AnyComponent) => {
  class HideShowComponent extends Component {
    render() {
      const {children, show, force} = this.props;

      let showStyle = {display:''};
      switch (typeof force) {
        case 'boolean':
          if (force) { showStyle = {display:'block'}; }
        break;
        case 'string':
          if (force) { showStyle = {display:force}; } //`force` might be table-cell if you want.
        break;
      }
      const HIDE_SHOW_SYTLE = show ? showStyle : {display:'none'};
      const STYLE = Object.assign({}, HIDE_SHOW_SYTLE);
      return (<div style={STYLE}>
        <AnyComponent {...this.props}>
          {children}
        </AnyComponent>
      </div>);
    }
  };
  
  HideShowComponent.propTypes = {
    children: PropTypes.element,
    show: PropTypes.bool,
    force: PropTypes.oneOfType([ //<--Need we force to make it as boolean only?
      PropTypes.string,
      PropTypes.bool])
  };

  return HideShowComponent;
};

const STYLE_FOR_INVALID_ERR_MSG = {
  position: 'absolute',
  left: 0,
  top: '38px',
  //3.2
  marginTop: '2px',
  padding: '.3em .6em',
  display: 'inline-block',
  background: '#fe402b',
  fontSize: '75%',
  fontWeight: 'bold',
  lineHeight: '1',
  color: '#fff',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'baseline',
  borderRadius: '.25em'
};
const STYLE_FOR_INVALID_CUSTOM_ERR_MSG = {
  InputValidNumber: {},
  InputValidCharacter: {}
};

/*class InValidErrMsg extends Component {
  render() {
    let {validType, msg} = this.props;
    return (<div style={()=>{
      let customStyle = validType&&STYLE_FOR_INVALID_CUSTOM_ERR_MSG[validType] || {};
      return Object.assign({}, STYLE_FOR_INVALID_ERR_MSG, customStyle);
    }}>{msg}</div>);
  }
};
InValidErrMsg.propTypes = {
  validType: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired
};*/
let InValidErrMsgBase = ({validType, msg}) => {
  return (<div style={
    Object.assign({}, STYLE_FOR_INVALID_ERR_MSG, 
      /*customStyle*/
      validType&&STYLE_FOR_INVALID_CUSTOM_ERR_MSG[validType] || {}
      )}>{msg}</div>);
};
InValidErrMsgBase.PropTypes = {
  validType: PropTypes.string,
  msg: PropTypes.string
};

export default HideShow(InValidErrMsgBase);
