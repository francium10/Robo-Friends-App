import React from "react";
import ReactDOM from "react-dom/client";


const Card=({name,email,id})=>{
        return (
         <div id="Card" className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
            <img 
            src={`https://robohash.org/${id}?size=200x200`} alt="Robot photos"
            />
         <div>
            <h2>{name}</h2>
            <p>{email}</p>
         </div>
        </div>

        )
}

const CardList=({robots})=>{
   const CardsArray=robots.map((user,i)=>{
      return (<Card
      key={i} 
      id={robots[i].id}
      name={robots[i].name}
      email={robots[i].email} />)
   })

   return(
        < div>
     {CardsArray}
         </div>
   )
}

const SearchBox=({SearchField,SearchChange})=>{
   return(

<div className="pa2">
   <input className="pa3 ba b--green bg-lightest-blue"
   type="Search" 
   placeholder="Search Robots" 
   onChange={SearchChange}
   />
 
   </div>
   )
}
const Scroll = (props) => {
  return (
    <div style={{ overflowY: "scroll", border:"px solid black", height: "800px"}}>
      {props.children}
    </div>
  );
};

class App extends React.Component {
   constructor() {
     super();
     this.state = {
       robots:[],
       SearchField: ""
     };
   }

 componentDidMount(){
  fetch('https://jsonplaceholder.typicode.com/users')

  .then(response=>{
  return response.json();
  })

  .then(users=>{
  this.setState({robots:users})
 })
 }


   OnSearchChange = (event) => {
     this.setState({ SearchField: event.target.value }); 
   };
 
   render() {
     const FilteredRobots = this.state.robots.filter((robot) => {
       return robot.name.toLowerCase().includes(this.state.SearchField.toLowerCase());
     });
 
     return (
       <div className="tc">
         <h1 className="f2">Robot Friends</h1>
         <SearchBox SearchChange={this.OnSearchChange} />
          <Scroll>
          <CardList robots={FilteredRobots}/>
         </Scroll>
       </div>
     );
   }
 }
 
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />
);

