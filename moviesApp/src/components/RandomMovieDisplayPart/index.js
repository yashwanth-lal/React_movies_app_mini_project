import {Component} from 'react'
import './index.css'

class RandomMovieDisplayPart extends Component {
  render() {
    const {randomMovieInfo} = this.props
    const {backdropPath, overview, title} = randomMovieInfo
    return (
      <div className="posterOuterDiv">
        <img alt={title} className="posterImage" src={backdropPath} />
        <div className="randomPosterTextDiv">
          <h1 className="randomPosterHeadTitle">{title}</h1>
          <p className="overViewPara">{overview}</p>
          <button type="button" className="posterPlayButton">
            Play
          </button>
        </div>
      </div>
    )
  }
}
export default RandomMovieDisplayPart
