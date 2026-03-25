import React from 'react'


export interface IDropdown {
    id: number,
    label: string
}

export interface IDropdownOption {
    option: IDropdown[],
    value?: number,
    onChange?: React.ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>
}


const Dropdown = ({ option, value, onChange } : IDropdownOption) => {
    return (
        <select 
            className="w-fit text-sm font-bold outline-none"
            onChange={(e) => {
                onChange && onChange(e)
                console.log(e.target)
            }}
            value={value}
        >
            {
                option.map(a => (
                    <option className="font-bold justify-between" value={a.id}>
                        {a.label}
                    </option>
                ))
            }
        </select>
    )
}

export default Dropdown
