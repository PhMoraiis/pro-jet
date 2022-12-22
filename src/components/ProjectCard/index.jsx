import style from './ProjectCard.module.css'
import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

const ProjectCard = ({ id, name, budget, category, handleRemove }) => {
    
    const remove = () => {
        e.preventdefault()
        handleRemove(id)
    }
    
    return (
        <div className={style.ProjectCard}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span>R${budget}
            </p>
            <p className={style.CategoryText}>
                <span className={`${style[category.toLowerCase]}`}></span> {category}
            </p>
            <div className={style.ProjectCardActions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remover
                </button>
            </div>
        </div>
    )
}

export { ProjectCard }
