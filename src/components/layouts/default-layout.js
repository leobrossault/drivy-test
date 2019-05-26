/* @jsx h */
import { h, Component } from 'preact';

import CommonHeader from './common/common-header';
import CommonFooter from './common/common-footer';

import WelcomeUi from '../ui/welcome-ui';

class DefaultLayout extends Component {
  constructor() {
    super();

    /*
     * The state of the welcome message
     */
    this.state = {
      showWelcomeMsg: true
    };
  }

  componentDidMount() {
    /*
     * Hide welcome message after 2.2s
     */
    setTimeout(() => {
      this.setState({
        showWelcomeMsg: false
      });
    }, 2200);
  }

  render() {
    return (
      <div className="container">
        <CommonHeader />

        <div class="container__content">{this.props.children}</div>

        <CommonFooter />

        {this.state.showWelcomeMsg && <WelcomeUi />}
      </div>
    );
  }
}

export default DefaultLayout;
