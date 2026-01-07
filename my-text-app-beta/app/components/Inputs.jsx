export default function Inputs(
    {type, 
    name, 
    placeholder,
    disabled}
) {
    //javascript function logic

    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                className="w-65 lg:w-90 md:w-90 lg:focus:w-110 lg:focus:h-18 h-15 rounded-2xl border border-blue-500 focus:outline-none px-11 py-1 text-xl transition-all focus:w-75 focus:h-20 focus:shadow-blue-400 items-center"
                required />
        </>
    )
}