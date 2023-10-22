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

export interface PostType {
  id: number;
  author: Author;
  contents: Content[];
  publishedAt: Date;  
}

interface PostProps {
  post: PostType;
}

export function Post({post} : PostProps){
  const [comments, setComment] = useState([
    'Nice post',
    'Nice post 2'
  ])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormat = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR})
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
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
          <Avatar src={post.author.avatarUrl}/>

          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time 
          title={publishedDateFormat}
          dateTime={post.publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.contents.map((line) => { 
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