import React from 'react'
import plus from '../components/assets/plus.png'
import search from '../components/assets/search.png'
function ToDo(props) {
  return (
    <main>
        <div className="addTask">
            <form
              className = "add-box"
              onSubmit={props.handleSubmit}
              >
                
              
              
              <input 
                    className="addBoxInput"
                    type="text"
                    placeholder="Search for an anime..."
                    value={props.input}
                    onChange={props.handleChange}
                    />
            </form>
            

        </div>
        <div className = "tasks">
        <ul className="animeResultsList">
              {props.animeList.map((anime) => (
                //onClick={() => props.handleAnimeListClick(anime)}
                <li key={anime.mal_id} >
                  <img src={anime.images.jpg.small_image_url
                  } className="animeThumbnail" alt="Anime Image" />
                  <span>{anime.title}</span>
                 <img src={plus} className="addAnime" alt="add anime" onClick={() => props.handleAddAnime(anime)}/></li>
              ))} </ul>
        </div>
    </main>
  )
}

export default ToDo