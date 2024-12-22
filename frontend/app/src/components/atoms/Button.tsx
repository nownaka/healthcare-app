
type Button = {
    label: string
    type:  "submit" | "reset" | "button" | undefined
    className: string | undefined
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}


const Button = (button: Button) => {
    const label = button.label
    const type = button.type
    const className = button.className
    const onClick = button.onClick

    return <button type={type} className={className} onClick={onClick}>{ label }</button>

}

export default Button