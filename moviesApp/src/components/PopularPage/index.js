import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Pagination from '@mui/material/Pagination'

import Header from '../Header/index'
import Footer from '../Footer'

import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class PopularPage extends Component {
  //    the bottom procedure is working through context
  state = {
    popularMoviesList: [],
    popularMoviesStatus: status.loading,
    currentPage: 1,
  }

  componentDidMount = () => {
    this.fetchPopularMovies()
  }

  clickPaginateFunc = e => {
    this.setState(
      {currentPage: parseInt(e.target.textContent)},
      //   this.fetchPopularMovies,
    )
  }

  popularMoviesCaseConverter = moviesList => {
    const pascalCasePopularMoviesList = moviesList.results.map(each => ({
      backdropPath: each.backdrop_path,
      id: each.id,
      overview: each.overview,
      posterPath: each.poster_path,
      title: each.title,
    }))

    this.setState({
      popularMoviesList: pascalCasePopularMoviesList,
      popularMoviesStatus: status.success,
    })
  }

  fetchPopularMovies = async () => {
    this.setState({popularMoviesStatus: status.loading})

    const jwtToken = Cookies.get('jwt_token')
    const popularMovieUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchResponse = await fetch(popularMovieUrl, options)

    if (fetchResponse.ok) {
      const popularMoviesList = await fetchResponse.json()

      this.popularMoviesCaseConverter(popularMoviesList)
    } else {
      this.setState({popularMoviesStatus: status.failure})
    }
  }

  onLoading = () => (
    <div className="loader-container load2" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onSuccess = () => {
    const {popularMoviesList, currentPage} = this.state
    const lastIndex = currentPage * 8
    const firstIndex = lastIndex - 8
    const slicedPascalCasePopularMoviesList = popularMoviesList.slice(
      firstIndex,
      lastIndex,
    )
    return (
      <div className="popularDiv1">
        <ul className="popularDiv2">
          {slicedPascalCasePopularMoviesList.map(each => (
            <Link key={each.id} to={`/movies/${each.id}`}>
              <li>
                <img
                  className="popularImage"
                  alt={each.title}
                  src={each.posterPath}
                />
              </li>
            </Link>
          ))}
        </ul>
        <Pagination
          className="paginationOuter"
          page={currentPage}
          onClick={this.clickPaginateFunc}
          count={Math.ceil(30 / 8)}
          shape="rounded"
        />
      </div>
    )
  }

  onFailure = () => (
    <div className="popularFailureOuter">
      <img
        alt="failure view"
        className="popularFailImage"
        src="https://res.cloudinary.com/yash9676/image/upload/v1686830047/moviesAppMiniProjectCCBP/Background-Complete_u9yl7z.png"
      />
      <p>Something went wrong. Please try again</p>
      <button
        onClick={this.fetchPopularMovies}
        type="button"
        className="popularTryAgainButton"
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {popularMoviesStatus} = this.state
    return (
      <div className="popularPageOuter">
        <Header />
        {(() => {
          switch (popularMoviesStatus) {
            case status.loading:
              return this.onLoading()

            case status.success:
              return this.onSuccess()
            case status.failure:
              return this.onFailure()
            default:
              return null
          }
        })()}

        <Footer />
      </div>
    )
  }
}
export default PopularPage
