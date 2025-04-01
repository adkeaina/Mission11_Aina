interface PaginationProps {
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    setPageNumber: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
}

const Pagination = ({ totalPages, pageNumber, pageSize, setPageNumber, setPageSize }: PaginationProps) => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                    className="btn btn-outline-primary mx-2 rounded-pill shadow-sm"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    Previous
                </button>

                {
                    [...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={`btn mx-1 rounded-pill ${pageNumber === index + 1 ? 'btn-primary text-white' : 'btn-outline-secondary'}`}
                            onClick={() => setPageNumber(index + 1)}
                            disabled={pageNumber === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))
                }

                <button
                    className="btn btn-outline-primary mx-2 rounded-pill shadow-sm"
                    disabled={pageNumber === totalPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Next
                </button>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="form-label mb-0 mx-2">
                    Results per page:
                </label>
                <select
                    className="form-select form-select-sm rounded-pill shadow-sm w-auto"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageNumber(1); // Reset to first page when changing page size
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </>
    )
}

export default Pagination;