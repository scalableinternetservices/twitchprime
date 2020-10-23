import { ApolloProvider } from '@apollo/client'
import { Redirect, Router } from '@reach/router'
import * as React from 'react'
import { hydrate, render } from 'react-dom'
import { Provider as StyletronProvider } from 'styletron-react'
import { appContext } from '../../../common/src/context'
import { getApolloClient } from '../graphql/apolloClient'
import { Route } from './nav/route'
import { MatchDetailPage } from './page/MatchDetailPage'
import { PlayerDetailPage } from './page/PlayerDetailPage'
import { SearchPage } from './page/SearchPage'

const Styletron = require('styletron-engine-monolithic')

export function init() {
  const renderFn = appContext().serverRendered ? hydrate : render
  const engine = new Styletron.Client({
    hydrate: document.getElementsByClassName('_styletron_hydrate_'),
  })

  renderFn(
    <ApolloProvider client={getApolloClient()}>
      <StyletronProvider value={engine}>
        <App />
      </StyletronProvider>
    </ApolloProvider>,
    document.getElementById('app')
  )
}

export function App() {
  return (
    <AppBody />
  )
}

export function AppBody() {
  return (
    <>
      <Router className={bodyClass}>
        <Redirect noThrow from="app" to="index" />
        <SearchPage path={Route.SEARCH} default />
        <PlayerDetailPage path={Route.PLAYERDETAIL} />
        <MatchDetailPage path={Route.MATCHDETAIL} />
      </Router>
    </>
  )
}

const bodyClass = 'flex flex-column items-center mh2 mh3-ns mh5-l pt6 min-vh-100 sans-serif'
