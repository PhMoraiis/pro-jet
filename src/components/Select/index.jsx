import style from './Select.module.css'

const Select = ({ text, name, options, handleOnChange, value }) => {
    return (
        <div className={style.formControl}>
            <label htmlFor={name}>{text}:</label>
            <select name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >
                <option>Selecione uma Opção</option>
                {options.map((option) => (
                    <option
                        key={option.id}
                        value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export { Select }