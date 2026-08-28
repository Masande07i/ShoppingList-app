import { Searchbar } from './Searchbar'

export interface SearchProps{
  searchQuery : string
  onSearch : (newValue: string)=> void

}

export const Search: React.FC<SearchProps> = ({searchQuery,onSearch}) => {
  return (
    <div>
        <Searchbar searchQuery={searchQuery}  onSearch={onSearch}/>
    </div>
  )
}
