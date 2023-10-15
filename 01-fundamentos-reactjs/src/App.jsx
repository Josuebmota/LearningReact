import { Post } from './components/Post.jsx'
import { Header } from './components/Header.jsx'
import { SideBar } from './components/Sidebar.jsx'

import styles from './App.module.css'
import './global.css'

export function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <SideBar/>
        <Post 
          author = "Josu" 
          content = "asdhasdhasu" 
          />
      </div>
    </div>
  )
}