import "./index.css";
export default function InputUpload(props) {
    return (
        <div className="upload-files">
            <div className="button">{props.file ? "Change": "Choose File"}</div>
            <div className="files">{typeof props.file === 'object'? props.file.name : props.file}</div>
            {
                props.file ?
                <div className="delete"><img src="/images/close.svg" /></div>
                : null
            }
            <input type="file" name={props.name} onChange={props.onChange} className="form-control" placeholder={props.placeholder} />
        </div>
    )
}