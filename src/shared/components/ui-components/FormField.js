import classNames from 'classnames';
import './FormField.css';

export const FormField = ({ className, label, ...props }) => {
    return (
      <div className={classNames('formField', className)}>
        <label className="formField-label">
          <span>{label}</span>
          <input
            className="formField-input"
            autoComplete="off"
            {...props}
          />
        </label>
      </div>
    );
}

