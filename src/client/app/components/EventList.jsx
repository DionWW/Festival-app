import React from 'react'
import { Link } from 'react-router-dom'

import {EventItem} from './EventItem'


export class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter,
            sortedBy: this.props.sortedBy,
        };

        this.changeSort = this.changeSort.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }

    changeFilter(e) {
        this.setState({
            filter: e.target.value
        },this.props.applyFilter(this.state.filter));
    }

    changeSort(e) {
        this.setState({
            sortedBy: e.target.value
        },this.props.applySort(this.state.sortedBy));
    }

    sortEventList(prop, arr) {
        prop = prop.split('.');
        var len = prop.length;

        arr.sort(function (a, b) {
            var i = 0;
            while (i < len) {
                a = a[prop[i]];
                b = b[prop[i]];
                i++;
            }
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return arr;
    }

    filterEventList(filter, events) {
        if (filter === "geen") {
            return events;
        }
        else {
            events = events.filter(function(event) {
                return event.age_category === filter;
            });

            return events;
        }
    }

    render() {
        let eventList = this.filterEventList(this.state.filter, this.props.events);
        eventList = this.sortEventList(this.state.sortedBy, eventList);
        return (
            <div className="EventList">
                <div className="topbalk">
                    <div className="filters">
                        <p>Filter leeftijd op:</p>
                        <select name="text" className="select" defaultValue={this.props.filter}
                                onChange={this.changeFilter}>
                            <option value="geen">Geen filter</option>
                            {this.props.filterOptions.map((filterOption) =>
                                <option key={filterOption} value={filterOption}>{filterOption}</option>
                            )}
                        </select>

                        <p>Sorteer op:</p>
                        <select name="text" className="select" defaultValue={this.props.sortedBy}
                                onChange={this.changeSort}>
                            <option value="title">Alfabet</option>
                            <option value="performances.0.start">Dag</option>
                        </select>

                        <Link to="/favorites/">
                            <span>
                                <svg height="25" width="25">
                                 <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"/>
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="ListContent">
                    {eventList.map((event) =>
                        <div className="event" key={event.url}>
                            <EventItem event={event} images={event.images}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}