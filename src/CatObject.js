import React from 'react'; 
import './CatObject.css';

class CatObject extends React.Component{
    render(){
        return(

                <div className="absolute" id="cat-object">
                    <img className="" width={this.props.catW} height={this.props.catH} src="http://ultimatecat.lol/images/cat-head-tux.png"/>
                </div>

        )
    }
}







export default CatObject;