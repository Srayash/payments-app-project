export function InputBox({label, placeholder, onChange}){
    return <div className="flex-col">
        <div className="text-sm font-medium text-left py-2">{label}</div>
        <input onChange={onChange} type="text" placeholder={placeholder} className="w-full px-2 py-1 border border-black rounded"></input>
    </div>
} 