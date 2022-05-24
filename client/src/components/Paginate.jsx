import React from "react";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    };
    pageNumbers.shift()
    return (
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li className="paginate" key={number}>
                            <a onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}