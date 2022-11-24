import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      opOne: '',
      opTwo: '',
      value: 0,
      operation: '',
      hasEnter: true,
    }

    this.btnClick = this.btnClick.bind(this);
    }
  
  btnClick(event){
    console.log(event.onkeyDown);
    const pressValue = event.target.value;
    console.log(typeof(pressValue))
   
    switch(pressValue){
      case 'AC' : console.log('running') 
        this.setState({opOne: '',
        opTwo: '',
        value: 0,
        operation: '',
        hasEnter: true}); 
        
        break;
      case '/' : this.setState({operation: '/'});
      break;
      case '+' : this.setState({operation: '+'});
      break;
      case '-' : this.setState({operation: '-'});
      break;
      case '*' : this.setState({operation: '*'});
      break;
      case '+/-' : if(this.state.operation === ''){
        this.setState((prevState,props)=> ({opOne: -prevState.opOne
      }));
      }else{
        this.setState((prevState,props)=> ({ 
          operation: prevState.operation === '-' ? '+' : '-'}))
      }
      break;
      case '=' : let value = `${this.state.opOne}${this.state.operation}${this.state.opTwo}`;
        console.log(typeof(value))
      let result = Function("return " + value)(); 
      this.setState({value: result,
      hasEnter: true});
      break;
      default: if(this.state.operation !== ''){
        this.setState((prevState)=>({opTwo: `${prevState.opTwo}${pressValue}`}));
      }else{
        this.setState((prevState)=>({opOne: `${prevState.opOne}${pressValue}`,
        hasEnter: false}));
      }                
    }
      
  }
  
  render(){
    const operations =[
     'AC', '+/-','%',
      '9', 8,
      '/', 7, '6',
      '-', 5, 4,
      '+', 3, 2,
      '*', '1', '0',
      '.','='
    ];
    const {opOne,opTwo,value,operation,hasEnter} = this.state;
    
    const renderOutput = () => {
    if(!hasEnter){
      return <span>{opOne+''}{operation}{opTwo}</span>;
     }else{
      return <span>{value}</span>;
     }
    }
    return(
      <div className='App'>
        <h1>Basic React calculator</h1>
        <div className='main-container'>
         <div className='display'>
          {renderOutput()}
         </div>      
         <div className='btn-container'>
          
         {operations.map(el =>(
           <div data-type={el}><button  onClick = {this.btnClick}  value={el}>{el}</button></div>
         ))}
         </div>        
        </div>
      </div>

    )
  }
}

export default App;
