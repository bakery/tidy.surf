import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Tab, Grid } from 'semantic-ui-react'
import _ from 'lodash';

export const getTides = gql`
  query($spotId: ID!) {
    tides(spotId: $spotId){
      spot {
        id
      }
      currentTime {
        timezone
        hours
        minutes
        prettyTimeLabel
      }
      tides {
        currentTide {
          type
          dt
        }
        tomorrow {
          dt
          date
          prettyTimeLabel
          prettyDateTimeLabel
          day
          month
          year
          height
          type
        }
        today {
          dt
          date
          prettyTimeLabel
          prettyDateTimeLabel
          day
          month
          year
          height
          type
        }
        allTides {
          dt
          date
          prettyTimeLabel
          prettyDateTimeLabel
          day
          month
          year
          height
          type
        }
      }
    }
  }
`;

function renderPane(data, currentTide=null, currentTime=null) {
  return (
    <Tab.Pane attached='bottom'>
      <style jsx>{`
        .highTide, .lowTide {
          text-align: center;
        }
        .highTide {
         padding-top: 50px;
        }

        .lowTide {
          padding-top: 100px
        }
      `}</style>
      <section>
        <p><b>{data[0].prettyDateTimeLabel} {currentTime ? currentTime.prettyTimeLabel : null}</b></p>
        <p>
        {
          currentTide ? 
            currentTide.type === 'Rising' ? 
              `${currentTide.type} ↑` :
              `${currentTide.type} ↓`
            : null
        }
        </p>
        <Grid columns={data.length}>
          <Grid.Row>
            {data.map(({ dt, prettyTimeLabel, height, type }) => (
              <Grid.Column key={dt}>
                <div className={type === 'High' ? 'highTide' : 'lowTide'}>
                  {prettyTimeLabel}
                  <hr/>
                  {height}m
                </div>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </section>
    </Tab.Pane>
  )
}

function renderTableTides(tides, key) {
  return (
    <React.Fragment key={key}>
    {
      _.map(tides, (t, k) => (
        <tr key={k}>
          <td>{t.prettyTimeLabel}</td>
          <td>{t.height}</td>
          <td>{t.type}</td>
        </tr>
      ))
    }
    </React.Fragment>
  )
}

function renderAllTidesPane(data) {
  const allDates = _.uniqBy(data, 'prettyDateTimeLabel');
  return (
    <Tab.Pane attached='bottom'>
      <style jsx>{`
        dateTitle: {
          margin-top: 40px!important;
        }
      `}</style>
      <section>
        {
          _.map(allDates, (d, k) => {
            return (
              <div key={k}>
                <h2 style={{marginTop: 40}} className="dateTitle">{d.prettyDateTimeLabel}</h2>
                <table className="ui celled table unstackable">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Height</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      renderTableTides(_.filter(data, date => date.prettyDateTimeLabel === d.prettyDateTimeLabel), k)
                    }
                  </tbody>
                </table>
              </div>
            )
          })
        }
      </section>
    </Tab.Pane>
  )
}

export default function Tides ({ spot }) {
  const { citySlug, stateSlug, countrySlug } = spot;
  return (
    <Query query={getTides} variables={{ spotId: `${citySlug}-${stateSlug}-${countrySlug}` }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const {
          today,
          tomorrow,
          allTides,
          currentTide,
        } = data.tides.tides;

        const { currentTime } = data.tides;

        const panes = [
          {
            menuItem: 'Today',
            render: () => renderPane(today, currentTide, currentTime),
          },
          {
            menuItem: 'Tomorrow',
            render: () => renderPane(tomorrow),
          },
          {
            menuItem: '10 Days',
            render: () => renderAllTidesPane(allTides),
          }
        ]

        return (
          <Tab menu={{ borderless: true, attached: 'top' }} panes={panes} />
        );
      }}
    </Query>
  );
}

Tides.propTypes = {
  spot: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    timezone: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    error: PropTypes.object,
    tides: PropTypes.array,
  }),
};
