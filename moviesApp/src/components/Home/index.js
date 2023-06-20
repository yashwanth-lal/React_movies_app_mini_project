import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import RandomMovieDisplayPart from '../RandomMovieDisplayPart/index'
import Header from '../Header/index'
import Footer from '../Footer'
import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Home extends Component {
  state = {
    trendingMovieList: [],
    originalsMovieList: [],
    randomMovieInfo: {},
    trendingMovieDataStatus: status.loading,
    originalAndRandomMovieDataStatus: status.loading,
  }

  componentDidMount = () => {
    this.fetchTrendingMovies()
    this.fetchOriginalsMovies()
  }

  trendingMoviesCaseConverter = moviesList => {
    const newTrendingMoviesList = moviesList.results.map(each => ({
      backdropPath: each.backdrop_path,
      id: each.id,
      overview: each.overview,
      posterPath: each.poster_path,
      name: each.title,
    }))
    this.setState({
      trendingMovieList: newTrendingMoviesList,
      trendingMovieDataStatus: status.success,
    })
  }

  originalsMoviesCaseConverter = moviesList => {
    const newOriginalsMoviesList = moviesList.results.map(each => ({
      backdropPath: each.backdrop_path,
      id: each.id,
      overview: each.overview,
      posterPath: each.poster_path,
      title: each.title,
    }))
    const noOfMovies = newOriginalsMoviesList.length
    const randomNumber = Math.floor(Math.random() * noOfMovies)
    const randomMovieDetails = newOriginalsMoviesList[randomNumber]
    this.setState({
      originalsMovieList: newOriginalsMoviesList,
      randomMovieInfo: randomMovieDetails,
      originalAndRandomMovieDataStatus: status.success,
    })
  }

  fetchTrendingMovies = async () => {
    this.setState({trendingMovieDataStatus: status.loading})
    const jwtToken = Cookies.get('jwt_token')
    const trendingMovieUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchResponse = await fetch(trendingMovieUrl, options)
    if (fetchResponse.ok) {
      const trendingMoviesList = await fetchResponse.json()

      this.trendingMoviesCaseConverter(trendingMoviesList)
    } else {
      this.setState({trendingMovieDataStatus: status.failure})
    }
  }

  fetchOriginalsMovies = async () => {
    this.setState({originalAndRandomMovieDataStatus: status.loading})
    const jwtToken = Cookies.get('jwt_token')
    const originalsMovieUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchResponse = await fetch(originalsMovieUrl, options)
    if (fetchResponse.ok) {
      const originalsMoviesList = await fetchResponse.json()
      this.originalsMoviesCaseConverter(originalsMoviesList)
    } else {
      this.setState({originalAndRandomMovieDataStatus: status.failure})
    }
  }

  onRandomLoading = () => (
    <div className="loader-container loadRandomPoster" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onTrendingLoading = () => (
    <div className="loader-container loadTrending" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onOriginalsLoading = () => (
    <div className="loader-container loadOriginals" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onRandomPosterSuccess = () => {
    const {randomMovieInfo} = this.state
    return (
      <>
        <RandomMovieDisplayPart randomMovieInfo={randomMovieInfo} />
        <div className="blurDiv2"> </div>
        <div className="blurDiv"> </div>
      </>
    )
  }

  onTrendingSuccess = (settings, trendingMovieList) => (
    <div className="slider-container">
      <Slider {...settings}>
        {trendingMovieList.map(each => (
          <Link key={each.id} to={`/movies/${each.id}`}>
            <img
              className="originalImage"
              alt={each.name}
              src={each.posterPath}
            />
          </Link>
        ))}
      </Slider>
    </div>
  )

  onOriginalsSuccess = (settings, originalsMovieList) => (
    <div className="slider-container">
      <Slider {...settings}>
        {originalsMovieList.map(each => (
          <Link
            className="originalImageLink"
            key={each.id}
            to={`/movies/${each.id}`}
          >
            <img
              className="originalImage"
              alt={each.title}
              src={each.posterPath}
            />
          </Link>
        ))}
      </Slider>
    </div>
  )

  onRandomOriginalsFailure = () => (
    <div className="homeFailureOuter">
      <img
        alt="failure view"
        className="homeFailImage"
        src="https://res.cloudinary.com/yash9676/image/upload/v1686900469/moviesAppMiniProjectCCBP/Icon_huzu3f.png"
      />
      <p>Something went wrong. Please try again</p>
      <button
        onClick={this.fetchOriginalsMovies}
        type="button"
        className="homeTryAgainButton"
      >
        Try Again
      </button>
    </div>
  )

  onTrendingFailure = () => (
    <div className="homeFailureOuter">
      <img
        alt="failure view"
        className="homeFailImage"
        src="https://res.cloudinary.com/yash9676/image/upload/v1686900469/moviesAppMiniProjectCCBP/Icon_huzu3f.png"
      />
      <p>Something went wrong. Please try again</p>
      <button
        onClick={this.fetchTrendingMovies}
        type="button"
        className="homeTryAgainButton"
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {
      trendingMovieList,
      originalsMovieList,
      originalAndRandomMovieDataStatus,
      trendingMovieDataStatus,
    } = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 575,
          settings: {
            dots: false,
            slidesToShow: 3,
          },
        },
      ],
    }

    return (
      <div className="homeOuterDiv">
        <Header />
        {(() => {
          switch (originalAndRandomMovieDataStatus) {
            case status.loading:
              return this.onRandomLoading()
            case status.success:
              return this.onRandomPosterSuccess()
            case status.failure:
              return this.onRandomOriginalsFailure()
            default:
              return null
          }
        })()}

        <div className="sliderWrap">
          <h1 className="trendingNowPara">Trending Now</h1>
          {(() => {
            switch (trendingMovieDataStatus) {
              case status.loading:
                return this.onTrendingLoading()
              case status.success:
                return this.onTrendingSuccess(settings, trendingMovieList)
              case status.failure:
                return this.onTrendingFailure()
              default:
                return null
            }
          })()}

          {/* </div> */}
          <h1 className="originalsPara">Originals</h1>
          {/* <div className="slidersOuterDiv"> */}
          {(() => {
            switch (originalAndRandomMovieDataStatus) {
              case status.loading:
                return this.onOriginalsLoading()
              case status.success:
                return this.onOriginalsSuccess(settings, originalsMovieList)
              case status.failure:
                return this.onRandomOriginalsFailure()
              default:
                return null
            }
          })()}
        </div>
        {/* </div> */}
        <Footer />
      </div>
    )
  }
}
export default Home
