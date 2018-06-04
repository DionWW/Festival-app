import React from 'react'
import { Link } from 'react-router-dom'

import {EventItem} from './EventItem'


export class FavoriteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter,
            sortedBy: this.props.sortedBy,
        };
    }

    sortFavoriteList(prop, arr) {
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

    render() {
        let favoriteList = this.sortFavoriteList("performances.0.start", this.props.favoriteEvents);

        return (
            <div className="EventList">
                <div className="topbalk">
                    <div className="filters">
                        <Link to="/events/">
                            <span>
                                <svg height="25" width="25">
                                 <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"/>
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="ListContent">
                    {favoriteList.map((event) =>
                        <div className="event" key={event.url}>
                            <EventItem event={event} images={event.images}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}