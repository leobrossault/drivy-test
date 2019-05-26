/* @jsx h */
import { h } from 'preact';

function CommonHeader() {
  return (
    <header>
      <img src={require('../../../assets/logo.svg')} alt="Drivy Logo" />
    </header>
  );
}

export default CommonHeader;
