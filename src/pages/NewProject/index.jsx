import style from './NewProject.module.css'
import { ProjectForm } from '../../components/ProjectForm'
import { useNavigate } from 'react-router-dom'

const NewProject = () => {

    const navigate = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then(data => {
            navigate('/projects', { message: 'Projeto criado com sucesso!' })
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={style.containerNewProject}>
        <h1>Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm handleSubmit={createPost} btnText='Criar Projeto' />
        </div>
    )
}

export { NewProject }