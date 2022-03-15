import { Link } from 'react-router-dom'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

interface hButtonProps {
    color: string,
    text: string,
    href: string,
}

export const SubmitButton : React.FC = () => {
    return (
        <button type="button" className={`m-submit-btn`}>
            <BsArrowRight />
        </button>
    )
}

export const HomeButton : React.FC<hButtonProps> = (props: hButtonProps) => {
    const dict : { [key: string]: string } = {
        'green' : "g-border-btn",
        'pink': "p-border-btn"
    }
    return (
        <Link to={props.href}>
            <button type="button" className={`home-btn ${dict[props.color]}`}>{props.text}</button>
        </Link>
    )
}