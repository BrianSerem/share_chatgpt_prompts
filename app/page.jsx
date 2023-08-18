import Feed from "@components/Feed"



const Home = () => {
    return (
        <section className="w-full flex-centre flex-col">
            <h1 className="head_text text-center" > Discover and Share
                <br className="max-hd:hidden" />
                <span className="orange_gradient text-center ">
                    AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center"> Promptopia is an open-source web app that allows you to find, share and create fun and functional AI prompts.</p>
         { <Feed className='text-center'/>}
        </section>
    )
}

export default Home
