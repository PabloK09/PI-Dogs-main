import {useSelector} from "react-redux"


export default function Breeds() {
    const breeds = useSelector(state => state.breeds)
    return (
        <div>
            soy breeds
            {
                breeds.map((breed) =>{
                    return <p>{breed.name}</p>
                })
            }
        </div>
    )
}