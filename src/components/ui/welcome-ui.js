/* @jsx h */
import { h } from 'preact';

/*
 * Block display to welcome the user
 */
function WelcomeUi() {
  return (
    <div class="welcome-ui df-center">
      <div>
        <img src={require('../../assets/logo.svg')} alt="Drivy Logo" />
        <span />
      </div>
    </div>
  );
}

export default WelcomeUi;
