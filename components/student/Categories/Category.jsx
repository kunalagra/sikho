"use client"
import { categoryInfo } from "@/app/api/Categories/categoryInfo";
const categories = categoryInfo// impprt from other folder
const Category = () => {
    const catElement = categories.map((cat, index) => (

        <div key={index}>
            <div
                className="transition basis-[45%] md:basis-[10.93%] bg-[#FCF1EB] cursor-pointer rounded mr-3 p-5 hover:opacity-75 group hover:-translate-y-2">
                <div className="bg-white rounded-full m-0 mx-auto w-20 h-20 scale-90 group-hover:scale-125" >
                    <img
                     src={cat.thumbnail}
                        alt={cat.name}
                        className="object-cover w-full h-full rounded-full"
                    />

                </div>
                <h4 className="mt-4 mb-2 font-medium">
                    {cat.name}
                </h4>
                <p className="text-gray-500 text-xs">
                    {cat.count}
                </p>
            </div>
            
        </div>
    ));




    return (

        <div>
            <section id="categories" className="mt-12">
                <div className="container mx-auto">
                    <h2 className="font-medium my-5">Browse Categories</h2>

                    <div className="flex flex-row gap-2 items-center text-center flex-wrap pl-4 md:pl-0">
                    {catElement.length > 0 ? (
                                    catElement
                                ) : (
                                    <p>No data to show</p>
                                )}




                    </div>
                </div>
            </section>

        </div>

    )
}

export default Category;
