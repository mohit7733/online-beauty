import "./index.css";
export default function Timepicker(props) {
  const timeArray = () => {
    const rows = [];
    let startTime = 9;
    let ampm = "AM";
    let gapMinutes = 0;
    for (let i = 0; i <= 12; i++) {
      if (startTime > 12) startTime = 1;
      if (startTime >= 12) ampm = "PM";

      const iText = `${startTime.toString().padStart(2, "0")}:${gapMinutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
      rows.push(
        <div
          className={props.sTime === iText ? "t-item active" : "t-item"}
          onClick={(e) => {
            props.setTime(e.target.innerText);
          }}
          key={i}
        >
          {iText}
        </div>
      );

      gapMinutes += 45;
      if (gapMinutes >= 60) {
        startTime += 1;
        gapMinutes -= 60;
      }
    }
    return rows;
  };

  return <div className="t-wrapper">{timeArray()}</div>;
}
