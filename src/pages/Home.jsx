import React from 'react'
import Header from '../components/Header'
import PostBox from '../components/PostBox'
import Posts from '../components/Posts'
import Footer from '../components/Footer'

export default function Home() {

    return (
        <>
            <Header />
            <div className="full-page-preview pb-5">
                <div className="w-full pb-5 relative bg-gray">
                    <PostBox />
                    <Posts />
                </div>
            </div>
            <Footer />
        </>
    )
}
