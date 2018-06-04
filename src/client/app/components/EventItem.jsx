import React from 'react'
import { Link } from 'react-router-dom'

export class EventItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let hashKey = (Object.keys(this.props.images)[0]);
        let imgSrc = "http:"+ (this.props.images["" + hashKey].versions["thumb-100"].url);

        return (
                <div className="mainInfo">
                    <Link to={this.props.event.code}>
                        <img src={imgSrc}/>
                    <h1>{this.props.event.title}</h1>
                    <p>{this.props.event.performances[0].start}</p>
                    </Link>
                </div>
        )
    }
}