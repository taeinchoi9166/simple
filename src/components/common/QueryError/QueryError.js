import React from 'react';
import './QueryError.scss';

function QueryError(){
    return (
        <div className={"query-error"}>
            <i className="far fa-flushed"></i>
            <h2>에러입니다.</h2>
        </div>
    );
}

export {QueryError};
