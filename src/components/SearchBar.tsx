interface ISearchBarProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;

}

export function SearchBar ({searchTerm, setSearchTerm}: ISearchBarProps) {
    return<div className="flex flex-col items-center justify-center py-2">
        <h3 className="text-2xl font-bold mb-5">Search Products</h3>
        <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="mb-5"
        />
    </div>
}