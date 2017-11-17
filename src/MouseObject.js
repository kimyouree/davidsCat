import React from 'react'; 
import './MouseObject.css';

class MouseObject extends React.Component{
    render(){
         const style = {
              width: this.props.mouseW,
              height: this.props.mouseH,
         }
        return(
               <div className="mouse--color absolute" style={style} id="mouse-object"></div>
        )
    }
}







export default MouseObject; 