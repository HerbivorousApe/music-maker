import React from 'react';
//import './App.css';
import * as Tone from 'tone';

class Notes extends React.Component {
  constructor(props) {
  console.log('🔰💥🔰 constructor 🔰💥🔰 (1)'); // First
    super(props);
    this.state = {
        user_id: '',
        track_can: [],
        votes: '',
        music: [],
        okayToRender: true,
        datecreated: Date,
        timestamp: Date
    };
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);

  };

  // static getDerivedStateFromProps() {console.log("🔰💥🔰 getDerivedStateFromProps 🔰💥🔰 (2)")}  // Second
  
  //Render = 3rd (3)

  componentDidMount() {
    console.log('🔰💥🔰 componentDidMount 🔰💥🔰 (4)'); // Fourth
  };

  shouldComponentUpdate() {
    console.log("🔰💥🔰 shouldComponentUpdate 🔰💥🔰 (5)"); // Fifth (after update)

  }

  //Render = 6th (6) (after update)

  getSnapshotBeforeUpdate() {
    console.log("🔰💥🔰 getSnapshotBeforeUpdate 🔰💥🔰 (7)"); // Seventh (after update)

  }

  componentDidUpdate() {
    console.log("🔰💥🔰 componentDidUpdate 🔰💥🔰 (8)"); // Eighth (after update)
  }

  componentWillUnmount() {
    console.log('🔰💥🔰 componentWillUnmount 🔰💥🔰 (9)'); //Last
  }

handleChange(event) {
console.log('💥handleChange')
this.setState({
    okayToRender: true
});
};

handleSubmit(event) {
console.log('💥handleSubmit')
    this.setState({
        okayToRender: true
    });
};


  render () {
  console.log('🔰🔰🔰 START RENDERING 🔰🔰🔰 (3) || (6)')   // Third & Sixth (after update)
  
  if (!this.state.okayToRender) {
    console.log('🛑🛑🛑 NOT OKAY TO RENDER 🛑🛑🛑')
    return <div />
  };

  console.log('🟢🟢🟢 WE ARE GO TO RENDER! 🟢🟢🟢')



  return (
    <div className="Notes">
      <h1>Hello Notes!</h1>
    </div>
  );
}
}


export default Notes;