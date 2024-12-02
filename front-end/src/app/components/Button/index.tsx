interface ButtonProps {
    label: string
    type: "submit" | "button",
    disable?: boolean
}

const Button = ({ label, type, disable = false }: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disable}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {label}
        </button>
    )
}

export default Button