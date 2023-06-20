import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header2 from '../Header2/index'
import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class SearchPage extends Component {
  state = {
    searchResultMovies: [],
    searchPageStatus: status.initial,
    noMovies: false,
    searchValue: '',
  }

  moviesCaseConverter = moviesList => {
    const newMoviesList = moviesList.results.map(each => ({
      backdropPath: each.backdrop_path,
      id: each.id,
      overview: each.overview,
      posterPath: each.poster_path,
      title: each.title,
    }))

    this.setState({
      searchResultMovies: newMoviesList,
      searchPageStatus: status.success,
      noMovies: false,
    })
  }

  fetchingFilmsBasedOnSearch = async searchText => {
    this.setState({searchPageStatus: status.loading})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const searchedMovies = await response.json()
      if (searchedMovies.results.length === 0) {
        this.setState({noMovies: true, searchValue: searchText})
      } else {
        this.moviesCaseConverter(searchedMovies)
      }
    } else {
      this.setState({searchPageStatus: status.failure})
    }
  }

  loading = () => (
    <div className="loader-container load" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  success = () => {
    const {searchResultMovies} = this.state
    return (
      <div className="searchedOuter">
        <ul className="searchedMoviesDiv">
          {searchResultMovies.map(each => (
            <li key={each.id}>
              <Link to={`/movies/${each.id}`}>
                <img
                  className="searchedMovies"
                  src={each.posterPath}
                  alt={each.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  failure = () => (
    <div className="searchFailureOuter">
      <img
        alt="failure view"
        className="searchFailImage"
        src="https://res.cloudinary.com/yash9676/image/upload/v1686830047/moviesAppMiniProjectCCBP/Background-Complete_u9yl7z.png"
      />
      <h1>Something went wrong. Please try again</h1>
      <button
        onClick={this.fetchingFilmsBasedOnSearch}
        type="button"
        className="searchTryAgainButton"
      >
        Try Again
      </button>
    </div>
  )

  sampleFunc = searchText => {
    this.fetchingFilmsBasedOnSearch(searchText)
  }

  render() {
    const {searchPageStatus, noMovies, searchValue} = this.state
    return (
      <div className="searchPageOuter">
        <Header2 sampleFunc={this.sampleFunc} />
        {noMovies ? (
          <div className="noMoviesDiv">
            <img
              className="noMoviesImage"
              src="https://res.cloudinary.com/yash9676/image/upload/v1686742917/moviesAppMiniProjectCCBP/Group_7394_xegukk.png"
              alt="no movies"
            />
            <p>Your search for {searchValue} did not find any matches.</p>
          </div>
        ) : (
          (() => {
            switch (searchPageStatus) {
              case status.loading:
                return this.loading()

              case status.success:
                return this.success()

              case status.failure:
                return this.failure()
              default:
                return null
            }
          })()
        )}
      </div>
    )
  }
}

export default SearchPage
