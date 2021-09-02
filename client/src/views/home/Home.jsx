import Breeds from "../../components/breeds/Breeds"
import SearchBarr from "../../components/searchbar/SearchBar"
import FilterSort from "../../components/filter-sort/Filtersort"

export default function Home() {
    return (
        <div>
            <SearchBarr/>
            <FilterSort />
            <Breeds/>
        </div>
    )
}