import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../utils/token'
function AuthRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}
export default AuthRoute
