import './Button.css';

export const Button = ({children, ...props}) => {
    return (
    <button className='btn'>{children}</button>
    );
}