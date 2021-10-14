import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from "../../store/notes";

const Search = () => {
    const [term,setTerm] = useState("")
    const [clickSubmit, setClickSubmit] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if(clickSubmit){
            console.log(term)
            dispatch(getNotes(term))
        }
    })

    return(
        <div>
            <form action='/' method='get'>

            </form>
        </div>
    )
}

export default Search
