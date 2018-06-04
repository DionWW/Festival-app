import React from 'react'

export class EmptyPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="EventContainer">
                <div className="EventEmpty">
                    <h1>U heeft nog geen evenement geselecteerd</h1>
                </div>
            </div>
        )
    }
}