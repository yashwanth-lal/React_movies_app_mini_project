import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Pagination from '@mui/material/Pagination'

import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import Header from '../Header/index'
import Footer from '../Footer/index'

import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class MovieDetailsPage extends Component {
  state = {selectedMovie: {}, pageStatus: status.loading, currentPage: 1}

  componentDidMount = () => {
    this.fetchMovieWithId()
  }

  clickPaginateFunc = e => {
    this.setState({currentPage: parseInt(e.target.textContent)})
  }

  popularMoviesCaseConverter = movie => {
    const movieDetails = movie.movie_details

    const pascalCaseMovie = {
      adult: movieDetails.adult,
      backdropPath: movieDetails.backdrop_path,
      budget: movieDetails.budget,
      genres: movieDetails.genres,
      id: movieDetails.id,
      overview: movieDetails.overview,
      posterPath: movieDetails.poster_path,
      releaseDate: movieDetails.release_date,
      runtime: movieDetails.runtime,
      similarMovies: movieDetails.similar_movies,
      spokenLanguages: movieDetails.spoken_languages,
      title: movieDetails.title,
      voteAverage: movieDetails.vote_average,
      voteCount: movieDetails.vote_count,
    }

    this.setState({selectedMovie: pascalCaseMovie, pageStatus: status.success})
  }

  fetchMovieWithId = async () => {
    this.setState({pageStatus: status.loading})

    const {match} = this.props

    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const popularMovieUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchResponse = await fetch(popularMovieUrl, options)

    if (fetchResponse.ok) {
      const selectedMovie = await fetchResponse.json()

      this.popularMoviesCaseConverter(selectedMovie)
    } else {
      this.setState({pageStatus: status.failure})
    }
  }

  changeRunTime = runtime => {
    const newTime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    return newTime
  }

  deriveYear = releaseDate => `${format(new Date(releaseDate), 'yyyy')}`

  releaseDateRemovingHyphen = releaseDate => {
    const formattedReleaseDate = `${format(
      new Date(releaseDate),
      'do MMMM yyyy',
    )}`

    return formattedReleaseDate
  }

  similarClick = async () => {
    const {history, location} = this.props

    const {pathname} = location
    history.push(pathname)
    this.setState({pageStatus: status.loading}, this.fetchMovieWithId)
  }

  loading = () => (
    <div className="loader-container detailsLoader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  success = selectedMovie => {
    const {currentPage} = this.state
    const {
      adult,
      backdropPath,
      budget,
      genres,

      overview,

      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = selectedMovie

    const lastIndex = currentPage * 8
    const firstIndex = lastIndex - 8
    const paginatedSimilarMovies = similarMovies.slice(firstIndex, lastIndex)

    return (
      <div className="movieDOuter">
        <img alt={title} className="movieDetailsBackDrop" src={backdropPath} />
        <div className="gradientDiv"> </div>
        <div className="gradientDiv2"> </div>

        <div className="movieDetailsTitlePart">
          <h1 className="movieDTitle">{title}</h1>
          <div className="movieDRuntimeReleaseDate">
            <p>{this.changeRunTime(runtime)}</p>
            <p className="adultSpan">{adult === 'true' ? 'A' : 'U/A'}</p>
            <span>{this.deriveYear(releaseDate)}</span>
          </div>
          <p className="movieDOverview">{overview}</p>
          <button type="button" className="movieDetailsPlayButton">
            Play
          </button>
        </div>

        <div className="movieDFadeDiv"> </div>
        <div className="makingMidDiv">
          <div className="movieDMoreDetails">
            <div className="movieDMoreDetailsInner">
              <ul className="movieDGenresDiv">
                <li>
                  <h1 className="movieDGenreHeading">genres</h1>
                </li>
                {genres.map(each => (
                  <li key={each.id}>
                    <p className="movieDEachGenre">{each.name}</p>
                  </li>
                ))}
              </ul>
              <ul className="movieDGenresDiv">
                <li>
                  {' '}
                  <h1 className="movieDGenreHeading">Audio Available</h1>
                </li>
                {spokenLanguages.map(each => (
                  <li key={each.id}>
                    <p className="movieDEachGenre">{each.english_name}</p>
                  </li>
                ))}
              </ul>
              <div className="ratingCountAvgDiv">
                <h1 className="movieDHeads">Rating Count</h1>
                <p className="movieDEachGenre">{voteCount}</p>

                <h1 className="movieDHeads">Rating Average</h1>
                <p className="movieDEachGenre">{voteAverage}</p>
              </div>
            </div>
            <div className="budgetReleaseDateDiv">
              <h1 className="movieDHeads">Budget</h1>
              <p className="movieDEachGenre">{budget}</p>

              <h1 className="movieDHeads">Release Date</h1>
              <p className="movieDEachGenre">
                {this.releaseDateRemovingHyphen(releaseDate)}
              </p>
            </div>
          </div>
          <div className="moreLikeThisDiv">
            <h1 className="moreLikeThisHead">More like this</h1>
          </div>

          <ul className="popularMoviesUlDiv">
            {paginatedSimilarMovies.map(each => (
              <Link key={each.id} to={`/movies/${each.id}`}>
                <li onClick={this.similarClick}>
                  <img
                    src={each.poster_path}
                    alt={each.title}
                    className="similarImages"
                  />
                </li>
              </Link>
            ))}
          </ul>
          <Pagination
            className="paginationOuter"
            page={currentPage}
            onClick={this.clickPaginateFunc}
            count={Math.ceil(similarMovies.length / 8)}
            shape="rounded"
          />
        </div>
      </div>
    )
  }

  failure = () => (
    <div className="moreDFailureOuter">
      <img
        alt="failure view"
        className="moreDFailImage"
        src="https://res.cloudinary.com/yash9676/image/upload/v1686900469/moviesAppMiniProjectCCBP/Icon_huzu3f.png"
      />
      <p>Something went wrong. Please try again</p>
      <button
        onClick={this.fetchMovieWithId}
        type="button"
        className="moreDAgainButton"
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {selectedMovie, pageStatus} = this.state
    return (
      <div className="dOuter">
        <Header />

        {(() => {
          switch (pageStatus) {
            case status.success:
              return this.success(selectedMovie)

            case status.failure:
              return this.failure()

            case status.loading:
              return this.loading()

            default:
              return null
          }
        })()}
        <Footer />
      </div>
    )
  }
}

export default MovieDetailsPage
