import { Post } from './components/Post.jsx'
import { Header } from './components/Header.jsx'
import { SideBar } from './components/Sidebar.jsx'

import styles from './App.module.css'
import './global.css'

const posts = [
  {
    id:1,
    author: {
      avatarUrl: 'https://github.com/josuebmota.png',
      name: 'Josué',
      role: 'Engenheiro de Software'
    },
    content: [
      {type: 'paragraph', text: 'Fala glr'},
      {type: 'paragraph', text: 'Fala glr'},
      {type: 'paragraph', text: 'Fala glr'},
      {type: 'link', text: '#learning reactjs'},
    ],
    publishedAt: new Date('2023-10-15 12:00:00'),
  }
]

export function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <SideBar/>
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />)
          })}          
        </main>        
      </div>
    </div>
  )
}