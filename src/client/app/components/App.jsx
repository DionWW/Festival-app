import React from 'react';
import CryptoJS from 'crypto-js';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import {EventList} from "./EventList";
import {EmptyPage} from "./EmptyPage";
import {EventContent} from "./EventContent";
import {FavoriteList} from "./FavoriteList";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            festivalEvents: null,
            sortedBy: "title",
            filter: "geen",
            favorites: [],
        };

        this.applyFilter = this.applyFilter.bind(this);
        this.applySort = this.applySort.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const cachedEvents = JSON.parse(localStorage.getItem("Events"));
        const cachedFavorites = JSON.parse(localStorage.getItem("Favorites"));

        if (cachedFavorites) {
            this.setState({
                favorites: cachedFavorites
            });
        }

        if (cachedEvents) {
            let filterOptions = cachedEvents.map(elem => elem.age_category).filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            }).sort();
            this.setState({
                festivalEvents: cachedEvents,
                filterOptions: filterOptions
            });
            return;
        }

        this.fetchDataFromApi();
    }

    async fetchDataFromApi() {
        const api_key = "uunaeoU62pSf3ZZk";
        const secret_key = "8vtGbFQouZ-86RdPWdYxWer3V12MVhJm";
        let url = "https://api.edinburghfestivalcity.com";
        let query = "/events?festival=imaginate&key=";
        let signature = (CryptoJS.HmacSHA1(query + api_key, secret_key).toString(CryptoJS.enc.Base));
        let mustFetchNew = true;
        let size = 10;
        let from = 0;
        let festivalEvents = [];

        while (mustFetchNew === true) {
            const response = await fetch(url + query + api_key + "&signature=" + signature + "&size=" + size + "&from=" + from);
            const json = await response.json();

            if (json.length <= 0) {
                mustFetchNew = false;
            }

            from += size;
            festivalEvents = festivalEvents.concat(json);
        }

        let filterOptions = festivalEvents.map(elem => elem.age_category).filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        }).sort();

        this.setState({
            festivalEvents: festivalEvents,
            filterOptions: filterOptions
        });

        localStorage.setItem("Events", JSON.stringify(this.state.festivalEvents));
    }

    applyFilter(filter) {
        this.setState({
            filter: filter
        });
    }

    applySort(sort) {
        this.setState({
            sortedBy: sort
        });
    }

    addToFavorites(event) {
        let favoriteEvents = this.state.favorites;
        favoriteEvents.push(event);
            favoriteEvents = favoriteEvents.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            });
        this.setState({
            favorites: favoriteEvents
        });
        localStorage.setItem("Favorites", JSON.stringify(favoriteEvents));
    }

    removeFromFavorites(event) {
        let newFavorites = this.state.favorites.filter((favorite) => favorite.code !== event.code);
        this.setState({
            favorites: newFavorites
        });
        localStorage.setItem("Favorites", JSON.stringify(newFavorites));
    }

    render () {
        if (this.state.festivalEvents === null) {
            return null;
        } else {
            return (
                <div className="app">
                    <div className="container">
                        <Switch>
                            <Redirect exact from="/" to="/events/"/>
                            <Route path="/favorites/" render={() => <FavoriteList favoriteEvents={this.state.favorites}/>} />
                            <Route path="/*/" render={() => <EventList events={this.state.festivalEvents} filterOptions={this.state.filterOptions} filter={this.state.filter} sortedBy={this.state.sortedBy} applyFilter={this.applyFilter} applySort={this.applySort}/>} />
                        </Switch>
                        <Switch>
                            <Route exact path="/*/:id" render={(routeProps) => <EventContent favorites={this.state.favorites} event={this.state.festivalEvents.find(event => event.code == routeProps.match.params.id)} addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites}/>} />
                            <Route exact path="/" render={() => <EmptyPage/>} />
                            <Route exact path="*/" render={() => <EmptyPage/>} />
                        </Switch>
                    </div>
                </div>
            )
        }
    }
}