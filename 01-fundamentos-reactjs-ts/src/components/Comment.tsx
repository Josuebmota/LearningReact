import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps {
  content: string;
  onDeleteComment: (commentToDelete: string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  const handleDeleteComment = () => {
    onDeleteComment(content)
  }

  const handleLikeComment = () =>{
    setLikeCount((state)=>{
      return state + 1
    })
  }

  return(
    <div className={styles.comment}>
      <Avatar 
        hasBorder={false} 
        src="https://github.com/josuebmota.png"
      />

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

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24}/> 
            </button>            
          </header>

          <p>{content}</p>
        </div>
        
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}