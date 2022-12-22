import style from './EditProject.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { Container } from '../../components/Container'
import { ProjectForm } from '../../components/ProjectForm'
import { Service } from '../../components/Service'
import { Message } from '../../components/Message'
import { ServiceCard } from '../../components/ServiceCard'
import { parse, v4 as uuidv4 } from 'uuid'

const EditProject = () => {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch(err => console.log(err))
        }, 1000)
    }, [id])

    function editPost(project) {

        setMessage('')

        if (project.budget < project.cost) {
            setMessage('O valor total utilizado não pode ser maior que o valor total do orçamento.')
            setType('error')
            return false
        }


        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto editado com sucesso!')
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost) {
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(project.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(projectUpdated)
                setServices(servicesUpdate)
                setMessage('Serviço removido com sucesso!')
            }
            )
            .catch(err => console.log(err))
    }

    function createService(project) {
        setMessage('')
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('O valor total utilizado não pode ser maior que o valor total do orçamento.')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(data)
                setShowServiceForm(false)
                setMessage('Serviço adicionado com sucesso!')
                setType('sucess')
            }
            )
            .catch(err => console.log(err))
    }

    return (<>
        {project.name ? (
            <div className={style.ProjectDetails}>
                <Container customClass='column'>
                    {message && <Message type={type} msg={message} />}
                    <div className={style.DetailsContainer}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={style.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={style.ProjectInfo}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={style.ProjectInfo}>
                                <ProjectForm
                                    handleSubmit={editPost}
                                    btnText="Concluir Edição"
                                    projectData={project} />
                            </div>
                        )}
                    </div>
                    <div className={style.ServiceFormContainer}>
                        <h2>Adicione um Serviço:</h2>
                        <button className={style.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                        </button>
                        <div className={style.ProjectInfo}>
                            {showServiceForm && (
                                <Service
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project} />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                        {services.length > 0 && services.map(service => (
                            <ServiceCard
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService} />
                        ))
                        }
                        {services.length === 0 && <p>Não há serviços cadastrados</p>}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}

export { EditProject }