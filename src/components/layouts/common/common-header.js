/* @jsx h */
import { h } from 'preact';

function CommonHeader() {
  return (
    <header class="df-center-x">
      <img src={require('../../../assets/logo.svg')} alt="Drivy Logo" />
    </header>
  );
}

export default CommonHeader;
