import React from 'react'
import Link from "next/link";
import Nav from '@/app/components/nav'
import About from '@/app/components/about'
import Footer from '@/app/components/footer'

function home() {
  return (<>
    <Nav isLoggedIn={true}/>
    <div className="hero flex shadow-inner">
      <div className="bg-gray-50 shadow-inner-gray-200 flex justify-between items-center mt-24 border-b-2 h-[60vh] 
      border-gray-100 w-3/5">
        <div className=" w-1/6 bg-blue-900 py-8">
          <h1 className="text-4xl font-bold text-white text-right">We</h1>
        </div>
        <div className="py-8 w-5/6">
          <h1 className="text-4xl font-bold text-blue-900 text-left">lcome to the Adventure</h1>
        </div>
        <p className='text-lg text-[#193948] font-bold absolute top-[47vh] left-[13%]'>
          Where planning meets intelligence.
        </p>
      </div>
      <div className='border-b-[60vh] border-b-transparent border-l-[5vh] border-l-gray-50 box-border w-2/5 bg-blue-900'>

      </div>
    </div>
    <div className="features mt-4">
      <div className="flex flex-col bg-white m-auto p-auto mt-10 animate-fade">
          {/* <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 
                font-bold text-4xl text-gray-600 text-center justify-start">
            Features
          </h1>
          <div className="flex ml-32 px-20 justify-start mb-4">
            <div className="flex mb-3 p-0 border-2 border-orange-600 w-1/4"></div>
          </div> */}
          <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl
           text-gray-600 text-center justify-center">
            Features
          </h1>
          <div className="flex justify-center" >
            <div className="flex mb-3 p-0 border-2 border-orange-600 w-1/3 "></div>
          </div>
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap lg:mx-60 md:mx-20 mx-10 ">
            <Link href="/customitineary">
                <div className="inline-block px-3 mt-5">
                  <div className="w-72 cursor-pointer h-52 max-w-sm overflow-hidden p-5 
                        rounded-2xl shadow-md bg-[#e85353] hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <p className="text-xl text-white p-2 text-center my-16">
                      Generate Itinerary
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/chatgroups">
                <div className="inline-block px-3 mt-5">
                  <div className="w-72 cursor-pointer h-52 max-w-sm overflow-hidden p-5 
                        rounded-2xl shadow-md bg-[#3664f4] hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <p className="text-xl text-white p-2 text-center my-16">
                      Group Chat
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/billsplitter">
                <div className="inline-block px-3 mt-5">
                  <div className="w-72 cursor-pointer h-52 max-w-sm overflow-hidden p-5 
                        rounded-2xl shadow-md bg-[#4ca771] hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <p className="text-xl text-white p-2 text-center my-16">
                      Bill Spiltter
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/todo">
                <div className="inline-block px-3 mt-5">
                  <div className="w-72 cursor-pointer h-52 max-w-sm overflow-hidden p-5 
                        rounded-2xl shadow-md bg-[#293855] hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <p className="text-xl text-white p-2 text-center my-16">
                      Task List
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n"
            }}/>
      </div>
    </div>
    <About/>
    <Footer/>
    </>
  )
}

export default home