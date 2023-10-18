import { format, formatDistanceToNow, set } from 'date-fns'
import { de, ptBR } from 'date-fns/locale'
import { Avatar } from './Avatar.jsx'
import { Comment } from './Comment.jsx'
import styles from './Post.module.css'
import { useState } from 'react'

export function Post({author, content, publishedAt}){
  const [comments, setComment] = useState([
    'Nice post',
    'Nice post 2'
  ])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR})
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(){
    event.preventDefault()
    setComment([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(){
    setNewCommentText(event.target.value)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          title={publishedDateFormat}
          dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((content, index) => { 
          if(content.type === 'paragraph'){
            return <p key={index}>{content.text}</p>
          }else if(content.type === 'link'){
            return <p><a href="#">{content.text}</a></p>
         }})}
      </div>

      <form 
        onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          name='comment'
          placeholder='Deixe seu comentário...'
          value={newCommentText}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type='submit'>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => <Comment content={comment}/>)}
      </div>
    </article>
  )
}