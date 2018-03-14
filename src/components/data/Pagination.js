import React from 'react';
import {Link} from 'react-router-dom';

const Pagination = ({link, pageCount = 1, current = 1}) => {
    let pages = [];
    for(let i = 1; i <= pageCount; i++){
        pages.push({
            number: i,
            active: current === i ? 'active' : '',
            to: `${link}?page=${i}`
        });
    }

    return (
        <ul className="pagination">
            {
                pages.map((page, index) => (
                    <li key={index} className={"page-item " + page.active}><Link className="page-link" to={page.to}>{page.number}</Link></li>
                ))
            }
        </ul>
    );
};

export default Pagination;