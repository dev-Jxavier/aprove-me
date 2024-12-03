"use client"

import { useEffect, useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { AssignorProps, getAllAssignors } from '@/app/services/assignor'
import classNames from 'classnames'

interface SelectProps {
    label: string
    selected: string
    setSelected: (assignor: string) => void
    error?: string | undefined
    disable?: boolean
}

const SelectAssignor = ({ label, error, selected, setSelected, disable = false }: SelectProps) => {
    const [assignors, setAssignors] = useState<AssignorProps[]>([])
    const selectedAssignor = assignors.find(assignor => assignor.id === selected)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const response = await getAllAssignors()
                setAssignors(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [])

    return (
        <>
            <Listbox value={selected} onChange={setSelected} disabled={loading || disable}>
                <Label className="block text-sm/6 font-medium text-gray-900">{label}</Label>
                <div className="relative mt-2">
                    <ListboxButton className={classNames('disabled:opacity-40 grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
                        { 'outline-red-500': error },
                        { 'outline-gray-300': !error }
                    )}>
                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                            <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                {selectedAssignor ? `${selectedAssignor.name} - ${selectedAssignor.document}` : "Selecione um cedente"}
                            </span>
                        </span>
                        <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                        {assignors.map((assignor) => (
                            <ListboxOption
                                key={assignor.id}
                                value={assignor.id}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                            >
                                <div className="flex items-center">
                                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                        {assignor.name} - {assignor.document}
                                    </span>
                                </div>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox >
            {error && <span className="text-red-500 font-normal">{error}</span>
            }
        </>
    )
}

export default SelectAssignor