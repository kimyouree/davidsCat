import React from 'react'; 
import './CatObject.css';

class CatObject extends React.Component{
    render(){
        return(
            
                <div className="absolute" id="cat-object">
                    <img width={this.props.catW + 'px'} height={this.props.catH + 'px'} src="/cathead.jpeg"/>
                </div>
            
        )
    }
}







export default CatObject; 