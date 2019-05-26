/* @jsx h */
import { h, render, Component } from 'preact';

class SelectFilter extends Component {
  constructor() {
    super();

    this.state.value = null;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.callback({
      name: this.props.name,
      value: e.target.value ? parseInt(e.target.value) : null
    });
  }

  /*
   * Build select options
   */
  getOptions() {
    return this.props.options.availableValues().map(value => {
      return <option value={value}>{value}</option>;
    });
  }

  render() {
    return (
      <div class="filter select-filter">
        {this.props.options.label && <label>{this.props.options.label}</label>}

        <div class="df-center-y">
          <select
            name={this.props.name}
            placeholder={this.props.options.placeholder}
            onChange={this.handleChange}
          >
            {this.getOptions()}
          </select>

          {this.props.options.suffix && (
            <span class="filter__suffix">{this.props.options.suffix}</span>
          )}
        </div>
      </div>
    );
  }
}

export default SelectFilter;
