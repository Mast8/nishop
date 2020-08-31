import React, { Component } from 'react'

export class Colors extends Component {
    render() {
        const {colors} = this.props;
        return (
            <div className="colors"><h3> Colors available</h3>
                {
                    
                    colors.map((color,index) =>(
                        <button className="btn-color" key={index} style={{background: color}}></button>
                    ))
                }
            </div>
        )
    }
}

export default Colors
