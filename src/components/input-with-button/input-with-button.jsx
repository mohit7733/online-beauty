import './input-with-button.css';

function InputWithButton(props) {
    return (
        <div className="input-wrapper">
            <input placeholder={props.placeholder}/>
            <button>{props.btnTxt}</button>
        </div>
    )
}

export default InputWithButton;