import classNames from "classnames"
import { HTMLInputTypeAttribute } from "react"

interface InputProps {
    label: string,
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    error?: string | undefined
    disable?: boolean
}

const Input = ({ label, type = "text", placeholder = "", error, disable = false, ...props }: InputProps) => {
    return (
        <div>
            <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <div className={classNames('flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1  has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600',
                    { 'outline-red-500': error },
                    { 'outline-gray-300': !error }
                )}>
                    <input type={type} disabled={disable} name="price" id="price" className="disabled:opacity-40 block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder={placeholder} {...props} />
                </div>
                {error && <span className="text-red-500 font-normal">{error}</span>}
            </div>
        </div>
    )
}

export default Input