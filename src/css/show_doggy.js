import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  '#doggyFrame': {
    'position': 'fixed',
    'top': [{ 'unit': '%V', 'value': 0.02 }],
    'right': [{ 'unit': '%H', 'value': 0.02 }],
    'display': 'block',
    'width': [{ 'unit': 'px', 'value': 330 }],
    'height': [{ 'unit': 'px', 'value': 505 }],
    'zIndex': '999999999',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'opacity': '0',
    'WebkitTransform': 'translate3d(30%,0,0)',
    'transform': 'translate3d(30%,0,0)',
    'WebkitTransition': 'transform 300ms ease, opacity 300ms ease',
    'transition': 'transform 300ms ease, opacity 300ms ease',
    'background': '#252B33'
  },
  '#doggyFrameshowdoggy': {
    'opacity': '1',
    'WebkitTransform': 'translate3d(0,0,0)',
    'transform': 'translate3d(0,0,0)'
  }
});
