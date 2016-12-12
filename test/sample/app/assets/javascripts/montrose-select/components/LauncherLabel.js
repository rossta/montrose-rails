import { h, Component } from 'preact'

const LauncherLabel = ({ isEnabled, isChecked, children, onChange, onLaunch }) => {
  return (
    <label >
      <input
        type="checkbox"
        checked={ isChecked }
        onChange={ onChange } />
      { children }

      {
        isEnabled ?
          <span>
            &nbsp;
            <a href="#" onClick={ onLaunch }>Edit</a>
          </span> :
          ''
      }
    </label>
  )
}

export default LauncherLabel
