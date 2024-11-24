

const EmptyList = () => {

    return (
        <div className="text-center flex flex-col items-center">
            <img src="assets/not found.png" className="w-[290px] pt-[20px]" alt="not found" />
            <span className="font-montserrat font-semibold text-3xl text-[#B60A31] py-[30px]">Nothing here yet</span>
            <span className="text-base text-white font-roboto pb-[50px]">It's a bit quiet here... Start exploring and adding your favorites to fill this space with the magic of music!</span>
        </div>
    )
}

export default EmptyList