import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar } from './Avatar.jsx'
import { Comment } from './Comment.jsx'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState, } from 'react'

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

interface Content {
  type: 'paragraph' | 'link';
  text: string;
}

interface PostProps {
  author: Author;
  contents: Content[];
  publishedAt: Date;  
}

export function Post({author, contents, publishedAt} : PostProps){
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

  function handleCreateNewComment(event: FormEvent){
    event.preventDefault()
    setComment([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('O comentário não pode estar vazio')
  }

  function deleteComment(commentToDelete: string){
    const commentsWithoutDeleted = comments.filter(comment => {
      return comment !== commentToDelete})
    setComment(commentsWithoutDeleted)
  }

  const isnewCommentEmpty = newCommentText.length === 0

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
        {contents.map((line) => { 
          if(line.type === 'paragraph'){
            return <p key={line.text}>{line.text}</p>
          }else if(line.type === 'link'){
            return <p key={line.text}><a href="#">{line.text}</a></p>
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
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button 
            type='submit' 
            disabled = {isnewCommentEmpty}>
              Publicar
          </button>
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