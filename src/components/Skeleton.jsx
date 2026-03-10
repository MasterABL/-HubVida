import React from 'react';

export const Skeleton = ({ className = '', style = {} }) => {
    return (
        <div
            className={`skeleton-shimmer rounded-xl ${className}`}
            style={style}
        />
    );
};
