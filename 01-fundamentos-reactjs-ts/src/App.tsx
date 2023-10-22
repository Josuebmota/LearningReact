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
    contents: [
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
          {posts.map(post => (
            <Post
              key={post.id}
              author={post.author}
              contents={post.contents.map(content => ({
                type: content.type === 'link' ? 'link' : 'paragraph',
                text: content.text
              }))}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
