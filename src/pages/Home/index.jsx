import style from './Home.module.css'
import savings from '../../assets/savings.svg'
import { LinkButton } from '../../components/LinkButton'


const Home = () => {
    return (
        <section className={style.containerHome}>
            <h1>Bem vindo ao <span>Pro-Jet</span></h1>
            <p>Comece a gerenciar os seus proejtos agora mesmo!</p>
            <LinkButton to='/newproject' text='Criar Projeto' />
            <img src={savings} alt="Costs" />
        </section>
    )
}

export { Home }