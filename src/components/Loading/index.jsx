import loading from '../../assets/loading.svg'
import style from './Loading.module.css'

const Loading = () => {
    return (
        <div className={style.LoaderContainer}>
            <img src={loading} alt="loading" className={style.Loader} />
        </div>
    )
}

export { Loading }