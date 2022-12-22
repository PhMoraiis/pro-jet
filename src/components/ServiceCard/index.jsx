import style from '../ProjectCard/ProjectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs'

const ServiceCard = ({ id, name, cost, description, handleRemove }) => {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={style.ProjectCard}>
          <h4>{name}</h4>
          <p>
            <span>Custo total:</span> R${cost}
          </p>
          <p>{description}</p>
          <div className={style.ProjectCardActions}>
            <button onClick={remove}>
              <BSFillTrashFill />
              Excluir
            </button>
          </div>
        </div>
    )
}

export { ServiceCard }