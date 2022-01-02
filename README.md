# Hypertube - single page torrent-based streaming site

This is a team project, a part of the web branch at [Hive Helsinki](https://www.hive.fi/) coding school.

Web application allowing a user to search, watch movies and comment.
The videos are downloaded through the BitTorrent protocol. 

The web application is for education purpose only and is not meant for streaming torrent. 

- [Team](#team)
- [Tech stack](#tech-stack)
- [API Documentation](https://app.swaggerhub.com/apis-docs/hypertubeHive/Hypertube/1.0.0)
- [Functionality](#functionality)
- Preview
  - **DISABLED FOR NOW** ~~[**Heroku** (demo username **hypertube2021@gmail.com** password **1234Aa**)](https://hypertube-demo.herokuapp.com/)~~
  - [App Preview](#app-preview)
- [Run locally](#run-locally)

## Team

|                                             | lead in                   | backend                             | frontend                                             |
| ------------------------------------------- | ---------------------------- | --------------------------------------- | --------------------------------------------------------- |
| [Tatiana](https://github.com/T7Q)           | **Team lead, Frontend lead** | Auth, subtitles routes                  | Forms components (login / register / pwd recovery), UI/UX |
| [Diana](https://github.com/DianaMukaliyeva) | **DevOps lead (Docker, production)**  | User routes                             | Gallery, Filter components                                |
| [Ilja](https://github.com/iljaSL)           | **Backend tests lead**       | Github actions, tests, comments routes  | Video player component                                    |
| [Esa](https://github.com/ehalmkro)          | **Backend lead**             | Movie routes, filestream, torrent logic | -                                                         |
| [Liisa](https://github.com/lapaset)         | **Frontend test lead**       | oAuth routes                            | Profile components, tests, localization                   |

## Tech Stack

- **Language:** Javascript
- **Database:** Mongo
- **[Micro]Frameworks:** NodeJs - Express - React
- **Libraries:** Material UI

- **Internal API:** REST, view [**API documentation**](https://app.swaggerhub.com/apis-docs/hypertubeHive/Hypertube/1.0.0)
- **External API:** a Torrent API, OMDB, Open Subtitles
- **oAuth:** 42, Google


![architecture](../assets/architecture.png?raw=true)

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

## App preview
![login](../assets/login.gif?raw=true)

![search&filter](../assets/search_and_filter.gif?raw=true)

![browse&play](../assets/browse_and_play.gif?raw=true)

## Run locally

- Requirements: **Docker 19.03.0 or higher**, accounts/API keys for [Google/Gmail](https://accounts.google.com/SignUp), 
[OMDb API](http://www.omdbapi.com), [42API](https://api.intra.42.fr/apidoc) and 
[OpenSubtitles API](https://opensubtitles.stoplight.io/docs/opensubtitles-api/ZG9jOjI3NTQ2OTAy-getting-started).

- Create `.env` file at the root of the repo and set the variables:

```
# development environment variables

BACKEND_PORT_DEV=5003
BACKEND_URL=http://localhost:5003
SECRET=[your_secret]

FRONTEND_URL_DEV=http://localhost:3001
FRONTEND_PORT_DEV=3001


# API keys / credentials

# Google/Gmail
EMAIL=[gmail_to_send_recovery_link]
EMAIL_PWD=[gmail_password_to_send_recovery_link]

GOOGLE_CLIENT_ID=[your_google_client_id]
GOOGLE_CLIENT_SECRET=[your_google_client_secret]

# OMDB / A Torrent API
OMDB_KEY=[your_omdb_key]
TORRENT_API=[your_legal_torrent_api_address]

# 42API
OMNIAUTH_PW=[your_pwd_for_omniauth]
FORTYTWO_CLIENT_ID=[your_fortytwo_client_id]
FORTYTWO_CLIENT_SECRET=[your_fortytwo_client_secret]
FORTYTWO_STATE=[fake_pwd_for_fortytwo]

# OpenSubtitles
OPENSUBTITLES_MY_USER_AGENT=[your_opensubtitles_user_agent]
OPENSUBTITLES_USERNAME=[your_opensubtitles_username]
OPENSUBTITLES_PASSWORD=[your_opensubtitles_password]

```

- **To start the app** - run command `make up`
  - Development mode running on `localhost:3001`
  - MongoDb tools `localhost:8081`
  - Swagger docs `localhost:5003/docs`


