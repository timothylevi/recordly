# Recordly App

## Features
* Create an account
* Persistent sessions
* Create, edit, and delete albums, artists, and tracks
* Favorite and unfavorite albums, artists, and tracks
* Basic search filter
* Mostly keyboard navigable
* CGI login forms
* AJAX app forms when authenticated
* Drill down into artists and albums

## Architecture
### Ruby
The server is a Rails application configured to serve React on the front end.

I would have been more clear on certain errors and status codes for the server if I were to put more time into it. I also would make it easier to manage album tracks. Right now, there's no easy way to delete tracks or change track numbers.

See `app` for application code.
### HTML/JS
The HTML/JS components are written to be composable and inherited from parent components to reduce duplicated code.

If I put more time into it, I would create more UI states (loading, empty, error) to give more immediate feedback to the user. I would also use a library to facilitate the search function.

See `client/app/bundles/js`.
### CSS
The CSS classes mirror the composition of the components themselves, encapsulating styles within top-level class names for pages.

I would improve styling for the form errors since I didn't put any work into them.

See `app/assets/stylesheets/application.css`.
### Tests
There are tests for client functions as well as server functions. The test suite is not comprehensive, but the skeleton for the tests exist.

See `client/__tests__` and `spec` for client and server tests respectively.
