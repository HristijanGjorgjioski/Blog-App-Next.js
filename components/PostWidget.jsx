import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'

import { getRecentPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        if(slug) {
            getSimilarPosts(category, slug)
                .then((res) => setRelatedPosts(res))
        } else {
            getRecentPosts()
                .then((res) => setRelatedPosts(res))
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default PostWidget
