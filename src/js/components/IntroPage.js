/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
import React from 'react';
import Login from './Login';
import '../../../assets/styles/sass/IntroPage.scss';

class IntroPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true
    };
  }

  changeState() {
    const { isLoginActive } = this.state;
    if (isLoginActive) {
      this.rightSide.classList.remove('right');
    }
    this.setState(prevState => ({ isLoginActive: !prevState.isLoginActive }));
  }

  componentDidMount() {
    this.rightSide.classList.add('right');
  }

  render() {
    const { isLoginActive } = this.state;
    return (
      <div className='App'>
        <h1 className='main__title'> GitGrep - Search Engine for GitHub </h1>
        <p className='main__subtitle'>Check out the repos, followers and more, just by entering a username!</p>
        <div className='intro'>
          <div className='base-container'>
          </div>
          <RightSlider isLoginActive={isLoginActive} containerRef={ref => (this.rightSide = ref)} />
        </div>
      </div>
    );
  }
}

const RightSlider = props => <div className='right-slider'
  isLoginActive={props.isLoginActive}
  ref={props.containerRef}
  onClick={props.onClick}
>
  <div className='inner-container'>
    {props.isLoginActive && (
      <Login />
    )}
  </div>
</div>;

export default IntroPage;
