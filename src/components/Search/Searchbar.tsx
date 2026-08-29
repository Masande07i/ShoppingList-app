
import { FaSearch } from 'react-icons/fa'
import { Text } from '../Text/Text'
import style from './Search.module.css'

export interface SearchBarProps{
  searchQuery : string
  onSearch : (newValue: string)=> void

}

export const Searchbar: React.FC<SearchBarProps> = ({searchQuery, onSearch}) => {
  
  return (

     <div className={style.searchContainer}>


    <div className={style.inputContainer}>

      <FaSearch className={style.icon} />

      <input
        type="text"
        className={style.input}
        placeholder="Search ..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />

    </div>

  </div>
    
  )
}
