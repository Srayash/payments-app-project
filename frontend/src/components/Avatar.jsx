export function Avatar(){
    const initial = localStorage.getItem("name")[0]
    return <div className="flex flex-col justify-center h-full text-xl">
        {initial.toUpperCase()}
    </div>
}