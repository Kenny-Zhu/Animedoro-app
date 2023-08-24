import React from 'react'
import plus from '../components/assets/plus.png'
import garbage from '../components/assets/garbage.png'
function breakAnime(props) {
  return (
    <div>
        <div className="breakTitle"><h1>Anime List</h1></div>
        <div className="breakAnimeList">
            <ul className="breakAnimeUL">

                {props.currentWatching.map((anime) => (<li key={anime.mal_id}>
                    <a href={anime.url} target="_blank">
                    <img src={anime.images.jpg.image_url
                  } className="breakAnimeThumbnail" alt="Anime Image" />
                  </a>
                    {anime.title} <span>Episodes: {props.episodeCounts[anime.mal_id] || 0 }/{anime.episodes}</span>
                    <img src={plus} className="incrementEpisode" alt="incrementEpisode"
                    onClick={() => props.incrementEpisode(anime)}/>
                    <img src={garbage} className="removeEpisode" alt="removeEpisode"
                     onClick={() => props.removeEpisode(anime)}/>
                     </li>))}
                    
            </ul>
        </div>
    </div>
  )
}

export default breakAnime