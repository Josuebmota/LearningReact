import { format, formatDistanceToNow, set } from 'date-fns'
import { de, ptBR } from 'date-fns/locale'
import { Avatar } from './Avatar.jsx'
import { Comment } from './Comment.jsx'
import styles from './Post.module.css'
import { useState } from 'react'

export function Post({author, contents, publishedAt}){
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

  function deleteComment(commentToDelete){
    const commentsWithoutDeleted = comments.filter(comment => {
      return comment !== commentToDelete})
    setComment(commentsWithoutDeleted)
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
        {contents.map((line, index) => { 
          if(line.type === 'paragraph'){
            return <p key={line.content}>{line.text}</p>
          }else if(line.type === 'link'){
            return <p key={line.content}><a href="#">{line.text}</a></p>
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
        {comments.map(comment => 
          <Comment 
            key={comment} 
            content={comment}
            onDeleteComment ={deleteComment}/>
        )}
      </div>
    </article>
  )
}