

const NotFound = () => {

    return (
        <div className="text-center flex flex-col items-center">
            <img src="assets/not found.png" className="w-[290px] pt-[20px]" alt="not found" />
            <span className="font-montserrat font-semibold text-3xl text-[#B60A31] py-[30px]">Nothing found for your search</span>
            <span className="text-base text-white font-roboto pb-[50px]">Try different options, and the music will find its way to you!</span>
        </div>
    )
}

export default NotFound