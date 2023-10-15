import {Comment} from './Comment.jsx'
import styles from './Post.module.css'

export function Post(props){
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img className={styles.avatar} src="https://github.com/josuebmota.png"/>

          <div className={styles.authorInfo}>
            <strong>Josue</strong>
            <span>Web Developer</span>
            <time>04 Jun 2021</time>
          </div>
        </div>

        <time 
          title='15 de outubro de 2023' 
          dateTime="2023-10-13">
            Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala glr</p>
        <p> 
          <a href="">#learning reactjs</a>{' '}
          <a href="">#learning reactjs</a>{' '}
          <a href="">#learning reactjs</a>{' '}
          <a href="">#learning reactjs</a>{' '}
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder='Deixe seu comentário...'
        />

        <footer>
          <button type='submit'>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment/>
        <Comment/>
        <Comment/>
      </div>
    </article>
  )
}