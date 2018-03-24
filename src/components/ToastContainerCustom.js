import React from 'react';

import {ToastContainer} from 'react-toastify';
import { css } from 'glamor';
import { style } from "react-toastify";

style({
  width: "320px",
  colorDefault: "#fff",
  colorInfo: "#3498db",
  colorSuccess: "#194e7d",
  colorWarning: "#f1c40f",
  colorError: "#e74c3c",
  colorProgressDefault: "linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)",
  mobile: "only screen and (max-width : 480px)",
  fontFamily: "sans-serif",
  zIndex: 9999,
  opacity: 0.3,
  TOP_LEFT: {
    top: '1em',
    left: '1em'
  },
  TOP_CENTER: {
    top: '1em',
    marginLeft: `-${320/2}px`,
    left: '50%'
  },
  TOP_RIGHT: {
    top: '1em',
    right: '1em'
  },
  BOTTOM_LEFT: {
    bottom: '1em',
    left: '1em'
  },
  BOTTOM_CENTER: {
    bottom: '1em',
    marginLeft: `-${320/2}px`,
    left: '50%'
  },
  BOTTOM_RIGHT: {
    bottom: '1em',
    right: '1em'
  }
});

class ToastContainerCustom extends React.Component {

	render() {
		return (
	        <ToastContainer
		        bodyClassName = "toast-custom"
		        style={{opacity: 0.8}}
	        />
		);
	}
}

export default ToastContainerCustom;