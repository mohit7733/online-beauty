import "./index.css";
export default function Timepicker(props) {

    
    const timeArray = () => {
        const rows = [];
        let startTime = 9;
        let ampm = "AM";
        for( let i =0; i <=12; i++) {
            if(startTime > 12) startTime = 1; 
            if(startTime >= 12) ampm = "PM" ; 
            const iText = `${startTime}:00 ${ampm}`;
            rows.push(
                <div className={props.sTime === iText ? "t-item active": "t-item"} onClick={(e) => { props.setTime(e.target.innerText)}} key={i}>
                    {iText}
                </div>
            );
            if(i < 12) {
                const iText1 = `${startTime}:30 ${ampm}`
                rows.push(
                    <div className={props.sTime === iText1 ? "t-item active": "t-item"} onClick={(e) => { props.setTime(e.target.innerText)}} key={i+"-a"}>
                        {iText1}
                    </div>
                );
            }
            startTime++;
        }
        return rows;
    }
    // console.log(timeArray()?.map((item)=> item),"<<<<<<<");

    return (
        <div className="t-wrapper">{timeArray()}</div>
    )
}