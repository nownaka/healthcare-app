type Input = {
    type: React.HTMLInputTypeAttribute | undefined
    value: string | number | readonly string[] | undefined
    placeholder: string | undefined
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}


const Input = (input: Input) => {
    const type = input.type
    const value = input.value
    const placeholder = input.placeholder
    const onChange = input.onChange
    return <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
}

export default Input