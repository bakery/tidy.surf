import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Tab, Table, Container } from 'semantic-ui-react'
import TidePane from '../components/TidePane';
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

function renderTableTides(tides, key) {
  return (
    <React.Fragment key={key}>
    {
      _.map(tides, (t, k) => (
        <Table.Row key={k}>
          <Table.Cell>{t.prettyTimeLabel}</Table.Cell>
          <Table.Cell>{t.height}</Table.Cell>
          <Table.Cell>{t.type}</Table.Cell>
        </Table.Row>
      ))
    }
    </React.Fragment>
  )
}

function renderAllTidesPane(data) {
  const allDates = _.uniqBy(data, 'prettyDateTimeLabel');
  return (
    <Tab.Pane attached='bottom'>
      <section>
        {
          _.map(allDates, (d, k) => {
            return (
              <div key={k}>
                <p className={k === 0 ? 'firstDateTitle dateTitle' : 'dateTitle'}><b>{d.prettyDateTimeLabel}</b></p>
                <Table basic='very' columns={3} textAlign="center" unstackable striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Time</Table.HeaderCell>
                      <Table.HeaderCell>Height</Table.HeaderCell>
                      <Table.HeaderCell>Type</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      renderTableTides(_.filter(data, date => date.prettyDateTimeLabel === d.prettyDateTimeLabel), k)
                    }
                  </Table.Body>
                </Table>
              </div>
            )
          })
        }
      </section>
    </Tab.Pane>
  )
}

function renderLoadingPane() {
  return (
    <Tab.Pane loading />
  )
}

function renderPane(data, currentTide=null, currentTime=null) {
  return <TidePane data={data} currentTide={currentTide} currentTime={currentTime}/>
}

export default function Tides ({ spot }) {
  const { citySlug, stateSlug, countrySlug } = spot;
  return (
    <Query query={getTides} variables={{ spotId: `${citySlug}-${stateSlug}-${countrySlug}` }}>
      {({ loading, error, data }) => {
        if (loading) {
          const panes = [
            {
              menuItem: 'Today',
              render: () => renderLoadingPane(),
            },
            {
              menuItem: 'Tomorrow',
              render: () => renderLoadingPane(),
            },
            {
              menuItem: '10 Days',
              render: () => renderLoadingPane(),
            }
          ]
          return (
            <Container>
              <Tab 
                menu={{
                  attached: 'top',
                  secondary: true,
                  pointing: true,
                  borderless: true,
                  widths: 3,
                  fluid: true
                }}
                panes={panes}
              />
            </Container>
          )
        }
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
            render: () => renderPane(today, currentTide, currentTime)
          },
          {
            menuItem: 'Tomorrow',
            render: () => renderPane(tomorrow)
          },
          {
            menuItem: '10 Days',
            render: () => renderAllTidesPane(allTides),
          }
        ]

        return (
          <Container>
            <Tab menu={{ attached: 'top', secondary: true, pointing: true, borderless: true, widths: 3, fluid: true }} panes={panes} />
          </Container>
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
