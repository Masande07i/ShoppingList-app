import style from './Home.module.css'
import { Text } from '../../components/Text/Text'
import { FiShoppingBag, FiUser, FiLogOut, FiSearch, FiMenu } from 'react-icons/fi'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// Mock data structure matching your image cards
const shoppingLists = [
  {
    id: 1,
    title: 'Grocery shopping',
    itemsCount: 3,
    category: 'Groceries',
    description: 'Weekly groceries for the family',
    date: '17 August 2026'
  },
  {
    id: 2,
    title: 'Household Essentials',
    itemsCount: 7,
    category: 'Household',
    description: 'Weekly groceries for the family',
    date: '02 October 2026'
  },
  {
    id: 3,
    title: 'Birthday Party',
    itemsCount: 10,
    category: 'Events',
    description: 'Items for the birthday celebration',
    date: '02 October 2026'
  }
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={style.dashboardContainer}>
    
      <aside className={style.sidebar}>
        <div className={style.logoSection}>
          <FiShoppingBag className={style.logoIcon} />
          <span className={style.logoText}>Shopping List</span>
        </div>

        <nav className={style.navLinks}>
          <button className={`${style.navButton} ${style.active}`} onClick={() => navigate('/')}>
            <FaHome className={style.navIcon} /> Home
          </button>
          <button className={style.navButton} onClick={() => navigate('/my-list')}>
            <FiShoppingBag className={style.navIcon} /> My List
          </button>
          <button className={style.navButton} onClick={() => navigate('/profile')}>
            <FiUser className={style.navIcon} /> Profile
          </button>
        </nav>

        <button className={style.logoutButton} onClick={() => navigate('/logout')}>
          <FiLogOut className={style.navIcon} /> Logout
        </button>
      </aside>

    
      <main className={style.mainContent}>
    
        <header className={style.header}>
          <div className={style.searchBar}>
            <input type="text" placeholder="search lists......" className={style.searchInput} />
            <FiSearch className={style.searchIcon} />
          </div>
        </header>

        <div className={style.contentHeading}>
         
          <button className={style.addButton}>+ Add New List</button>
        </div>

        
      </main>
    </div>
  )
}
