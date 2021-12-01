import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyApp() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onClick={onChange}
        value={value}
        defaultView = {"month"}
        onClickDay 
      />
    </div>
  );
}

/*class Calendar1 extends React.Component {
  render() {
    <div>
      <Calendar
        onClick={onChange}
        value={value}
        defaultView = {"month"}
        onClickDay 
      />
    </div>
  }
}
*/

export default MyApp 