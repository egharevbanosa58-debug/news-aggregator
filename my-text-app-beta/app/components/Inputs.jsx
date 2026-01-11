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
                className="w-65 md:w-90 h-16 rounded-2xl border border-blue-500 focus:outline-none px-11 py-1 text-xl transition-all focus:shadow-blue-400 items-center"
                required />
        </>
    )
}