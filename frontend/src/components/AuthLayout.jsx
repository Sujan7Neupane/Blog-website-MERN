import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function Protected({ children, authentication = true }) {
    const [loading, setLoading] = useState(true)
    const { status: authStatus } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoading(false)

    }, [authStatus, loading, authentication])

    return loading ? <h1>Loading</h1> : <>{children}</>
}
