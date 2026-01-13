export default function Inputs(
    {type, 
    name, 
    placeholder,
    minLength,
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
                className="w-65 md:w-90 h-16 rounded-2xl border dark:text-white border-blue-500 focus:outline-none px-11 py-1 text-md transition-all focus:shadow-blue-400 items-center placeholder:text-gray-400 placeholder:dark:text-stone-200 dark:bg-blue-950"
                minLength={minLength}
                required />
        </>
    )
}