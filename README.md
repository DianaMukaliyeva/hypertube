# Hypertube - streaming site

This is a team project, a part of the web branch at [Hive Helsinki](https://www.hive.fi/) coding school.

Web application allowing a user to search and watch movies.
The videos are downloaded through the BitTorrent protocol.
TBC....

- [Team](#team)
- [Tech stack](#tech-stack)
- [Functionality](#functionality)
- [App Video Preview](#app-live-preview)
- [Preview on Heroku](#preview-on-heroku)
- [Run locally](#run-locally)

## Team

**Tatiana** - _Back/Front_ - [check her profile](https://github.com/T7Q)

**Diana** - _Back/Front_ - [check her profile](https://github.com/DianaMukaliyeva)

**Ilja** - _Back/Front_ - [check his profile](https://github.com/iljaSL)

**Esa** - _Back/Front_ - [check his profile](https://github.com/ehalmkro)


## Tech Stack
- **Language:** Javascript
- **Database:** Mongo
- **[Micro]Frameworks:** NodeJs - Express - React
- **Libraries:** React Boostrap???? 

- **Internal API:** REST, view documentation here 
- **External API:** torrent 1, torrent 2, IMDB?, subtitles?

## Functionality

### User
- Authentication with Omniauth stategy : username/pass, Gmail, 42
- Profile: username, firstname, lastname, avatar, email
- Settings: interface available in English (by default), ?, ? 

### Movie gallery
- Infinite scroll gallery of thumbnail and move data: title, production year, IMDb not, watched/unwatched
- Selection is created from two torrent listing 
- Filter / Sort: title, genre, IMDb grade, year
- Search by title 

### Video player
- Movie details: title, summary, casting, year, length, rates
- Subtitles in English, ?, ?, ? (if available)
- Uninterrupted streaming
- List of comments, option of leaving a comment
- Movies unwatched for a month erased from the server

## Run locally 

You need to have `.env` file at the root of the project:

```
# development environment variables

# if change BACKEND_PORT_DEV, than also change port in BACKEND_URL
BACKEND_PORT_DEV=5003
BACKEND_URL=http://localhost:5003

FRONTEND_PORT_DEV=3001

```

- To start it - run command `make up`
  - Delelopment mode running on `localhost:3001`
  - MongoDb tools `localhost:8081`
