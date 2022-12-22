import style from './Container.module.css'

const Container = ({ children, customClass }) => {
  return (
    <div className={`${style.container} ${style[customClass]}`}>
      {children}
    </div>
  )
}

export { Container }