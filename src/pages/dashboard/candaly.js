import React from 'react';
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

const CalendlyComponent = () => {
    useCalendlyEventListener({
        onProfilePageViewed: () => console.log("onProfilePageViewed"),
        onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
        onEventTypeViewed: () => console.log("onEventTypeViewed"),
        onEventScheduled: (e) => console.log(e.data.payload),
      });

    return (
        <div>
            <div className="App">
                <InlineWidget url="https://calendly.com/nitintom11/beauty-meetings" />
            </div>
            {/* <InlineWidget
                url="https://calendly.com/nitintom11/beauty-meetings"
                pageSettings={{
                    backgroundColor: '#ffffff',
                    hideEventTypeDetails: true,
                    hideLandingPageDetails: false,
                    primaryColor: '#00a2ff',
                    textColor: '#4d5055'
                }}
                //   prefill={{
                //     name: 'John Doe',
                //     email: 'johndoe@example.com'
                //   }}
                styles={{
                    height: '1000px'
                }}
                onEventScheduled={() => handleEventScheduled()}
            /> */}
        </div>
    );
}

export default CalendlyComponent;