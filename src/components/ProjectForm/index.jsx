import { Input } from '../Input'
import { Select } from '../Select'
import { SubmitButton } from '../SubmitButton'
import style from './ProjectForm.module.css'
import { useState, useEffect } from 'react'

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setProject({ ...project, [name]: value })
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return (
        <form onSubmit={submit} className={style.form}>
            <Input type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.name ? project.name : ''} />
            <Input type='number'
                text='Orçamento do Projeto'
                name='budget'
                placeholder='Insira o orçamento total'
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''} />
            <Select name='categoryID'
                text='Selecione a Categoria'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export { ProjectForm }