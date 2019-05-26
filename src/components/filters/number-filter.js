/* @jsx h */
import { h, render, Component } from 'preact';

class NumberFilter extends Component {
  constructor(props) {
    super(props);

    this.state.value = props.options.min;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let value = e.target.value ? parseInt(e.target.value) : null;

    /*
     * Check min and max to avoid extra value
     */
    if (value) {
      if (value > this.props.options.max) {
        value = this.props.options.max;
      } else if (value < this.props.options.min) {
        value = this.props.options.min;
      }

      this.setState({ value });
    }

    this.props.callback({
      name: this.props.name,
      value
    });
  }

  render() {
    return (
      <div class="filter number-filter">
        {this.props.options.label && <label>{this.props.options.label}</label>}

        <div class="df-center-y">
          <input
            type="number"
            value={this.state.value}
            min={this.props.options.min}
            max={this.props.options.max}
            step={this.props.options.step}
            placeholder={this.props.options.placeholder}
            onChange={this.handleChange}
          />

          {this.props.options.suffix && (
            <span class="filter__suffix">{this.props.options.suffix}</span>
          )}
        </div>
      </div>
    );
  }
}

export default NumberFilter;
