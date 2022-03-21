import React, { Componrnt } from 'react';

class HostNotif extends Componrnt {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div>
        <p>Set a custom message your staff will recieve when they get an invit</p>
        <form>
          <select>
            <option>Host</option>
            <option>Interview</option>
          </select>
          <textarea />
        </form>
      </div>
    );
  }
}

export default HostNotif;
