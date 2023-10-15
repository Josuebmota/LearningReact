import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'

export function Comment() {
  return(
    <div className={styles.comment}>
      <img src="https://github.com/josuebmota.png"/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>

          <header>
            <div className={styles.authorAndTime}>
              <strong>Josué</strong>
              <time 
                title='15 de outubro de 2023' 
                dateTime="2023-10-13">
                  Cerca de 1h atrás
              </time>
            </div>

            <button title='Deletar comentário'>
              <Trash size={24}/> 
            </button>            
          </header>

          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>
        
        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}