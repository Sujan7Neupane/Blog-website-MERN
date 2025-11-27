import React from 'react'

const Container = ({ children }) => {
    return (
        <div className='w-full mx-auto px-4 max-w-7xl flex justify-center'>
            {children}
        </div>
    )
}

export default Container