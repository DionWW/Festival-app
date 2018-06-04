import React from 'react'
import ReactHtmlParser from 'react-html-parser'

export class EventContent extends React.Component {
    constructor(props) {
        super(props);

        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }

    addToFavorites(e) {
        e.preventDefault();
        this.props.addToFavorites(this.props.event);
    }

    removeFromFavorites(e) {
        e.preventDefault();
        this.props.removeFromFavorites(this.props.event);
    }

    render() {
        let favoriteButton
        if (this.props.favorites.find(event => event.code === this.props.event.code)) {
            favoriteButton = <a href="#" onClick={this.removeFromFavorites}>Verwijder uit programma</a>
        } else {
            favoriteButton = <a href="#" onClick={this.addToFavorites}>Voeg toe aan programma</a>
        }
        let hashKey = (Object.keys(this.props.event.images)[0]);
        let imgSrc = "http:"+ (this.props.event.images["" + hashKey].versions["medium-640"].url);

        return(
            <div className="EventContainer">
                <div className="EventDetails">
                    <img src={imgSrc}/>
                    <div className="EventDetails--right">
                        <h1>{this.props.event.title}</h1>
                        {favoriteButton}
                        <ul>
                            <li><strong>Artiest: </strong>{this.props.event.artist}</li>
                            <li><strong>Venue: </strong>{this.props.event.venue.name}</li>
                            <li><strong>Prijs: </strong>£{this.props.event.performances[0].price}</li>
                        </ul>
                    </div>
                </div>
                <div className="EventInfo">
                    <h2>Informatie:</h2>

                    {ReactHtmlParser(this.props.event.description)}

                    <h2>Uitvoeringen:</h2>

                    <ul>
                        {this.props.event.performances.map((performance) =>
                            <li key={performance.start}>{performance.start} - {performance.end}</li>
                        )}
                    </ul>
                </div>

            </div>
        )
    }
}