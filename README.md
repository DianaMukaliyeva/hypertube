# Hypertube - single page torrent-based streaming site

This is a team project, a part of the web branch at [Hive Helsinki](https://www.hive.fi/) coding school.

Web application allowing a user to search, watch movies and comment.
The videos are downloaded through the BitTorrent protocol. 
The web application is for education purpose only and is not meant for streaming torrent. 

- [Team](#team)
- [Tech stack](#tech-stack)
- [Functionality](#functionality)
- [App Video Preview](#app-live-preview)
- [Preview on Heroku](#preview-on-heroku)
- [Run locally](#run-locally)

## Team

|  | Tatiana | Diana | Ilja | Esa | Liisa |
| - | - |- | - | - | - |
| backend | Auth route | User routes | Github actions, tests, comments routes | Movie routes, filestream, torrent logic | oAuth routes |
| frontend | Forms (login/register/signin) components, UI/UX | Gallery, Filter components | Video player component | - | Profile components, tests, localization |
| lead in | Team lead, frontend lead | Docker / production | Backend tests lead | Backend lead | Frontend test lead |
|  | [check profile](https://github.com/T7Q) | [check profile](https://github.com/DianaMukaliyeva) | [check profile](https://github.com/iljaSL) | [check profile](https://github.com/ehalmkro) | [check profile](https://github.com/lapaset) |

## Tech Stack

- **Language:** Javascript
- **Database:** Mongo
- **[Micro]Frameworks:** NodeJs - Express - React
- **Libraries:** Material UI

- **Internal API:** REST, view documentation here
- **External API:** a Torrent API, OMDB, Open Subtitles
- **oAuth:** 42, Google


![architecture](../assets/architecture.jpg?raw=true)

## Functionality

### User

- Authentication with Omniauth stategy : username/pass, Gmail, 42
- Profile: username, firstname, lastname, avatar, email
- Settings: interface available in English (by default), German, Finnish, Russian

### Movie gallery

- Infinite scroll gallery of thumbnail and move data: title, production year, IMDb not, watched/unwatched
- Selection is created from two torrent listing
- Filter / Sort: title, genre, IMDb grade, year
- Search by title

### Video player

- Movie details: title, summary, casting, year, length, rates
- Subtitles in English, German, Finnish, Russian (if available)
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

`make -j lint` - will check linter for both frontend and backend
`make lint-front` - will check linter for frontend
`make lint-back` - will check linter for backend
