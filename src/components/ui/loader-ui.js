/* @jsx h */
import { h } from 'preact';

/*
 * Block display to welcome the user
 */
function LoaderUi() {
  return (
    <div class="loader-ui">
      <div>
        <div class="loader-ui__spinner">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default LoaderUi;
