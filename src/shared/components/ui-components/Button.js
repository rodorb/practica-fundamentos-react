import classNames from 'classnames';
import './Button.css';

export const Button = ({children, ...props}) => {
    const buttonClass = classNames(
        "btn",
        { "disabled": props.disabled }
      );
    return (
    <button className={buttonClass}>{children}</button>
    );
}